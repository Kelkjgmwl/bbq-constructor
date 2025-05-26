import { useEffect, useRef, useState } from "react";

const modules = [
  { id: "mangal_550", name: "Мангал 550", width: 570 },
  { id: "mangal_700", name: "Мангал 700", width: 720 },
  { id: "mangal_1000", name: "Мангал 1000", width: 1020 },
  { id: "pech_480", name: "Печь 480", width: 500 },
  { id: "pech_680", name: "Печь 680", width: 700 },
  { id: "pech_1000", name: "Печь 1000", width: 1020 },
  { id: "koktal_600", name: "Коктал 600", width: 620 },
  { id: "koktal_800", name: "Коктал 800", width: 820 },
  { id: "koktal_1000", name: "Коктал 1000", width: 1020 },
  { id: "table_600", name: "Стол 600", width: 600 },
  { id: "table_800", name: "Стол 800", width: 800 },
  { id: "table_1000", name: "Стол 1000", width: 1000 },
  { id: "table_1200", name: "Стол 1200", width: 1200 },
  { id: "table_1500", name: "Стол 1500", width: 1500 },
  { id: "table_2000", name: "Стол 2000", width: 2000 },
  { id: "gas_2burner_500", name: "Газ 500", width: 500 },
  { id: "sink_500", name: "Мойка 500", width: 500 },
];

export default function BBQConstructor() {
  const [selected, setSelected] = useState([]);
  const [scale, setScale] = useState(1);
  const [hoodLength, setHoodLength] = useState("");
  const [hoodPrice, setHoodPrice] = useState("");
  const [apronLength, setApronLength] = useState("");
  const [apronPrice, setApronPrice] = useState("");
  const [roofPrice, setRoofPrice] = useState("");
  const [hasApron, setHasApron] = useState(false);
  const [hasRoof, setHasRoof] = useState(false);
  const [color, setColor] = useState("");

  const baseScale = 0.4;
  const containerRef = useRef(null);

  const addModule = (mod) => setSelected([...selected, mod]);
  const removeModule = (i) => setSelected(selected.filter((_, index) => index !== i));
  const reset = () => setSelected([]);

  const totalLength =
    (selected.length > 0 ? 40 : 0) +
    selected.reduce((sum, m, i) => sum + m.width + (i > 0 ? 40 : 0), 0) +
    (selected.length > 0 ? 40 : 0);

  useEffect(() => {
    if (!containerRef.current || selected.length === 0) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const containerWidth = entries[0].contentRect.width;
      const neededWidth = totalLength * baseScale;
      const newScale = Math.min(1, Math.max(0.25, containerWidth / neededWidth));
      setScale(newScale);
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [selected, totalLength]);

  const categorized = {
    Мангалы: modules.filter((m) => m.id.includes("mangal")),
    Печи: modules.filter((m) => m.id.includes("pech")),
    Кокталы: modules.filter((m) => m.id.includes("koktal")),
    Столы: modules.filter((m) => m.id.includes("table")),
    Прочее: modules.filter((m) => m.id.includes("gas") || m.id.includes("sink")),
  };

  const basePrice = (totalLength / 1000) * 235000;
  const roof = hasRoof && roofPrice ? parseInt(roofPrice) : 0;
  const apron =
    hasApron && apronLength && apronPrice
      ? (parseInt(apronLength) / 1000) * parseInt(apronPrice)
      : 0;
  const hood =
    hoodLength && hoodPrice
      ? (parseInt(hoodLength) / 1000) * parseInt(hoodPrice)
      : 0;

  const totalPrice = Math.round(basePrice + roof + apron + hood);

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif", maxWidth: "100vw", overflowX: "hidden" }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 24 }}>
        Конфигуратор комплекса
      </h1>

      {/* Визуализация */}
      <div
        ref={containerRef}
        style={{
          resize: "both",
          overflow: "auto",
          padding: 16,
          borderRadius: 16,
          background: "#f7f7f7",
          border: "1px solid #ddd",
          marginBottom: 12,
          minWidth: "300px",
          minHeight: "300px",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "left bottom",
            display: "flex",
            alignItems: "flex-end",
            height: "500px",
          }}
        >
          {selected.map((mod, index) => (
            <div
              key={index}
              style={{
                marginLeft: index > 0 ? `${-40 * baseScale}px` : "0px",
                zIndex: index,
                width: `${mod.width * baseScale}px`,
                height: "500px",
                position: "relative",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={`modules/${mod.id}.png`}
                alt={mod.name}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
              <button
                onClick={() => removeModule(index)}
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: 24,
                  height: 24,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопки */}
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "24px" }}>
        {Object.entries(categorized).map(([group, mods]) => (
          <div key={group} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {mods.map((mod) => (
              <button
                key={mod.id}
                onClick={() => addModule(mod)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  background: "#fff",
                  border: "2px solid #ccc",
                  cursor: "pointer",
                  fontSize: "14px",
                  width: "100%",
                  maxWidth: "120px",
                }}
              >
                {mod.name}
              </button>
            ))}
          </div>
        ))}
        <div>
          <button
            onClick={reset}
            style={{
              padding: "12px 18px",
              borderRadius: "8px",
              background: "red",
              color: "white",
              border: "none",
              fontWeight: "600",
              fontSize: "16px",
              cursor: "pointer",
              width: "100%",
              maxWidth: "120px",
            }}
          >
            Сбросить всё
          </button>
        </div>
      </div>

      {/* Опции */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: 32 }}>
        <label>
          <input type="checkbox" checked={hasApron} onChange={(e) => setHasApron(e.target.checked)} />
          <span style={{ marginLeft: 8, fontWeight: "bold" }}>Фартук</span>
        </label>
        {hasApron && (
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <input
              type="number"
              placeholder="Длина (мм)"
              value={apronLength}
              onChange={(e) => setApronLength(e.target.value)}
            />
            <input
              type="number"
              placeholder="Цена (₸/м)"
              value={apronPrice}
              onChange={(e) => setApronPrice(e.target.value)}
            />
          </div>
        )}

        <label>
          <input type="checkbox" checked={hasRoof} onChange={(e) => setHasRoof(e.target.checked)} />
          <span style={{ marginLeft: 8, fontWeight: "bold" }}>Навес</span>
        </label>
        {hasRoof && (
          <input
            type="number"
            placeholder="Цена (₸)"
            value={roofPrice}
            onChange={(e) => setRoofPrice(e.target.value)}
          />
        )}

        <label style={{ fontWeight: "bold" }}>Длина вытяжного зонта и цена:</label>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <input
            type="number"
            placeholder="Длина (мм)"
            value={hoodLength}
            onChange={(e) => setHoodLength(e.target.value)}
          />
          <input
            type="number"
            placeholder="Цена (₸/м)"
            value={hoodPrice}
            onChange={(e) => setHoodPrice(e.target.value)}
          />
        </div>

        {/* Цвет */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: 16 }}>
          <strong>Цвет / покрытие:</strong>
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="radio"
              name="color"
              value="Антрацит"
              checked={color === "Антрацит"}
              onChange={(e) => setColor(e.target.value)}
            />
            <img src="/colors/anthracite.png" alt="Антрацит" style={{ width: 24, height: 24, borderRadius: 4, border: "1px solid #ccc" }} />
            Антрацит
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="radio"
              name="color"
              value="Черная Шагрень"
              checked={color === "Черная Шагрень"}
              onChange={(e) => setColor(e.target.value)}
            />
            <img src="/colors/black-texture.png" alt="Черная Шагрень" style={{ width: 24, height: 24, borderRadius: 4, border: "1px solid #ccc" }} />
            Черная Шагрень (Полимерная покраска)
          </label>
        </div>
      </div>

      {/* Итог */}
      <div style={{ marginTop: 32, fontWeight: "bold", fontSize: 20 }}>
        Общая длина: {totalLength} мм<br />
        Стоимость комплекса: {totalPrice.toLocaleString()} ₸<br />
        {color && <>Цвет покрытия: {color}</>}
      </div>
    </div>
  );
}
