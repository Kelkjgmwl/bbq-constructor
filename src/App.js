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

  const [hasApron, setHasApron] = useState(false);
  const [apronLength, setApronLength] = useState("");
  const [apronPrice, setApronPrice] = useState("");

  const [hasRoof, setHasRoof] = useState(false);
  const [roofPrice, setRoofPrice] = useState("");

  const [hoodLength, setHoodLength] = useState("");
  const [hoodPrice, setHoodPrice] = useState("");

  const [color, setColor] = useState("");

  const [glassDoor, setGlassDoor] = useState(false);
  const [skewers, setSkewers] = useState(false);
  const [tools, setTools] = useState(false);
  const [cauldrons, setCauldrons] = useState({
    "12": false,
    "18": false,
    "22": false,
    "50": false,
    "80": false,
  });

  const containerRef = useRef(null);
  const baseScale = 0.4;
  const pipeWidth = 40;

  const addModule = (mod) => setSelected([...selected, mod]);
  const removeModule = (i) => setSelected(selected.filter((_, index) => index !== i));
  const reset = () => setSelected([]);

  const totalLength =
    (selected.length > 0 ? pipeWidth : 0) +
    selected.reduce((sum, m, i) => sum + m.width + (i > 0 ? pipeWidth : 0), 0) +
    (selected.length > 0 ? pipeWidth : 0);

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
  const apron =
    hasApron && apronLength && apronPrice
      ? (parseInt(apronLength) / 1000) * parseInt(apronPrice)
      : 0;
  const roof = hasRoof && roofPrice ? parseInt(roofPrice) : 0;
  const hood =
    hoodLength && hoodPrice
      ? (parseInt(hoodLength) / 1000) * parseInt(hoodPrice)
      : 0;

  const accessories = [
    glassDoor && { name: "Дверца со стеклом", price: 42000 },
    skewers && { name: "Шампуры", price: 10000 },
    tools && { name: "Совок/Кочерга", price: 14000 },
    ...Object.entries(cauldrons)
      .filter(([_, val]) => val)
      .map(([size]) => {
        const prices = { "12": 22000, "18": 28000, "22": 35000, "50": 65000, "80": 85000 };
        return { name: Казан на ${size} л, price: prices[size] };
      }),
  ].filter(Boolean);

  const accessoriesTotal = accessories.reduce((sum, acc) => sum + acc.price, 0);
  const totalPrice = Math.round(basePrice + apron + roof + hood + accessoriesTotal);

  return (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap", padding: 24 }}>
      <div style={{ flex: 1, minWidth: 300 }}>
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
            marginBottom: 24,
            minHeight: 300,
          }}
        >
          <div
            style={{
              transform: scale(${scale}),
              transformOrigin: "left bottom",
              display: "flex",
              alignItems: "flex-end",
              height: 500,
            }}
          >
            {selected.map((mod, index) => (
              <div
                key={index}
                style={{
                  marginLeft: index > 0 ? ${-pipeWidth * baseScale}px : "0px",
                  zIndex: index,
                  width: ${mod.width * baseScale}px,
                  height: "500px",
                  position: "relative",
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={modules/${mod.id}.png}
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

        {/* Кнопки модулей */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
          {Object.entries(categorized).map(([group, mods]) => (
            <div key={group} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <strong>{group}</strong>
              {mods.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => addModule(mod)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "6px",
                    background: "#fff",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                    fontSize: "13px",
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
                padding: "10px 16px",
                borderRadius: "6px",
                background: "red",
                color: "white",
                border: "none",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
                marginTop: 18,
              }}
            >
              Сбросить всё
            </button>
          </div>
        </div>
        {/* Опции и параметры */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label>
            <input type="checkbox" checked={hasApron} onChange={(e) => setHasApron(e.target.checked)} />
            <span style={{ marginLeft: 8, fontWeight: "bold" }}>Фартук</span>
          </label>
          {hasApron && (
            <div style={{ display: "flex", gap: "12px" }}>
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
              style={{ width: 120 }}
            />
          )}

          <label style={{ fontWeight: "bold", marginTop: 8 }}>Вытяжной зонт:</label>
          <div style={{ display: "flex", gap: "12px" }}>
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

          {/* Цвет / покрытие */}
          <div style={{ marginTop: 16 }}>
            <strong>Цвет / покрытие:</strong>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="radio"
                  name="color"
                  value="Антрацит"
                  checked={color === "Антрацит"}
                  onChange={(e) => setColor(e.target.value)}
                />
                <img src="/colors/anthracite.png" alt="Антрацит" style={{ width: 24, height: 24, border: "1px solid #ccc", borderRadius: 4 }} />
                Антрацит
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="radio"
                  name="color"
                  value="Черная Шагрень"
                  checked={color === "Черная Шагрень"}
                  onChange={(e) => setColor(e.target.value)}
                />
                <img src="/colors/black-texture.png" alt="Черная Шагрень" style={{ width: 24, height: 24, border: "1px solid #ccc", borderRadius: 4 }} />
                Черная Шагрень (Полимерная покраска)
              </label>
            </div>
          </div>

          {/* Комплектующие */}
          <div style={{ marginTop: 24 }}>
            <strong>Комплектующие:</strong>
            <label><input type="checkbox" checked={glassDoor} onChange={(e) => setGlassDoor(e.target.checked)} /> Дверца со стеклом (42 000 ₸)</label>
            <label><input type="checkbox" checked={skewers} onChange={(e) => setSkewers(e.target.checked)} /> Шампуры (10 000 ₸)</label>
            <label><input type="checkbox" checked={tools} onChange={(e) => setTools(e.target.checked)} /> Совок / Кочерга (14 000 ₸)</label>
            <div style={{ marginTop: 8 }}>
              <strong>Казаны:</strong><br />
              {["12", "18", "22", "50", "80"].map((size) => (
                <label key={size} style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    checked={cauldrons[size]}
                    onChange={(e) => setCauldrons({ ...cauldrons, [size]: e.target.checked })}
                  /> Казан {size} л
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Итог и отчёт */}
      <div style={{ flexBasis: "100%", marginTop: 32, fontSize: 18 }}>
        <div style={{ fontWeight: "bold", fontSize: 20 }}>
          Общая длина: {totalLength} мм<br />
          Общая стоимость: {totalPrice.toLocaleString()} ₸<br />
        </div>
        {color && <div>Цвет покрытия: <strong>{color}</strong></div>}

        <div style={{ marginTop: 12 }}>
          <strong>Разбивка стоимости:</strong>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>Модули: {basePrice.toLocaleString()} ₸</li>
            {hasApron && apron > 0 && <li>Фартук: {Math.round(apron).toLocaleString()} ₸</li>}
            {hasRoof && roof > 0 && <li>Навес: {roof.toLocaleString()} ₸</li>}
            {hood > 0 && <li>Вытяжной зонт: {Math.round(hood).toLocaleString()} ₸</li>}
            {accessories.map((a, i) => (
              <li key={i}>{a.name}: {a.price.toLocaleString()} ₸</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
