// Конфигуратор BEL BBQ — экспорт в PNG в формате A4, без PDF, с перетаскиванием и ФИО
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";

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
  const [dragIndex, setDragIndex] = useState(null);
  const [fio, setFio] = useState("");
  const [clientDate, setClientDate] = useState("");

  const baseScale = 0.4;
  const pipeWidth = 40;
  const containerRef = useRef(null);
  const fullRef = useRef(null);

  const addModule = (mod) => setSelected([...selected, mod]);
  const removeModule = (i) => setSelected(selected.filter((_, index) => index !== i));

  const moveModule = (from, to) => {
    const copy = [...selected];
    const [moved] = copy.splice(from, 1);
    copy.splice(to, 0, moved);
    setSelected(copy);
  };

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

  const exportAsImage = async () => {
    if (!fullRef.current) return;
    const canvas = await html2canvas(fullRef.current, {
      scale: 2,
      useCORS: true,
      windowWidth: 1123, // A4 width in px @ 96dpi
      windowHeight: 794,
    });
    const link = document.createElement("a");
    link.download = `bbq-order-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div ref={fullRef} style={{ padding: 24, fontFamily: "sans-serif", maxWidth: "100vw", background: "white" }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>Конфигуратор комплекса BEL BBQ</h1>

      <div
        ref={containerRef}
        style={{ resize: "both", overflow: "auto", padding: 16, borderRadius: 12, background: "#f5f5f5", border: "1px solid #ccc", minHeight: 300, marginBottom: 24 }}
      >
        <div
          style={{ transform: `scale(${scale})`, transformOrigin: "left bottom", display: "flex", alignItems: "flex-end", height: 500 }}
        >
          {selected.map((mod, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => dragIndex !== null && moveModule(dragIndex, index)}
              style={{
                marginLeft: index > 0 ? `${-pipeWidth * baseScale}px` : 0,
                width: `${mod.width * baseScale}px`,
                height: "500px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={`modules/${mod.id}.png`} alt={mod.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              <button
                onClick={() => removeModule(index)}
                style={{ position: "absolute", top: 4, right: 4, background: "red", color: "white", border: "none", borderRadius: "50%", width: 24, height: 24, cursor: "pointer" }}
              >✕</button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        {modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => addModule(mod)}
            style={{ padding: 6, borderRadius: 6, border: "1px solid #ccc", cursor: "pointer" }}
          >
            {mod.name}
          </button>
        ))}
        <button
          onClick={() => setSelected([])}
          style={{ background: "red", color: "white", padding: "6px 12px", border: "none", borderRadius: 6 }}
        >
          Сбросить всё
        </button>
      </div>

      <div style={{ marginTop: 32 }}>
        <h3>Итог:</h3>
        <p>Общая длина: {totalLength} мм</p>
      </div>

      <div style={{ marginTop: 32, borderTop: "1px solid #ccc", paddingTop: 16 }}>
        <label style={{ display: "block", marginBottom: 12 }}>
          ФИО клиента:
          <input type="text" value={fio} onChange={(e) => setFio(e.target.value)} style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </label>
        <label style={{ display: "block", marginBottom: 12 }}>
          Дата оформления:
          <input type="datetime-local" value={clientDate} onChange={(e) => setClientDate(e.target.value)} style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </label>
        <button onClick={exportAsImage} style={{ background: "#007bff", color: "white", padding: "10px 16px", border: "none", borderRadius: 6 }}>
          Сохранить страницу A4 (PNG)
        </button>
      </div>
    </div>
  );
}
