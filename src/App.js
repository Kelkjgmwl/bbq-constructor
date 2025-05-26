// Полный финальный конфигуратор BEL BBQ с экспортом, печатью, формой клиента и адаптивом
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
  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem("bbq_selected_modules");
    return saved ? JSON.parse(saved) : [];
  });

  const [fio, setFio] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [signature, setSignature] = useState("");
  const [clientDate, setClientDate] = useState("");

  const [scale, setScale] = useState(1);
  const [activeTab, setActiveTab] = useState("Мангалы");
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
  const [cauldrons, setCauldrons] = useState({ "12": false, "18": false, "22": false, "50": false, "80": false });

  const fullPageRef = useRef(null);
  const containerRef = useRef(null);
  const baseScale = 0.4;
  const pipeWidth = 40;

  useEffect(() => {
    localStorage.setItem("bbq_selected_modules", JSON.stringify(selected));
  }, [selected]);

  const addModule = (mod) => setSelected([...selected, mod]);
  const removeModule = (i) => setSelected(selected.filter((_, index) => index !== i));
  const reset = () => {
    setSelected([]);
    localStorage.removeItem("bbq_selected_modules");
  };

  const totalLength = (selected.length > 0 ? pipeWidth : 0) + selected.reduce((sum, m, i) => sum + m.width + (i > 0 ? pipeWidth : 0), 0) + (selected.length > 0 ? pipeWidth : 0);

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

  const exportFullPage = async () => {
    if (!fullPageRef.current) return;
    const canvas = await html2canvas(fullPageRef.current);
    const link = document.createElement("a");
    link.download = `bbq-order-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const printForProduction = async () => {
    if (!fullPageRef.current) return;
    const priceSections = document.querySelectorAll(".price-section");
    priceSections.forEach((el) => (el.style.display = "none"));
    await new Promise((res) => setTimeout(res, 300));
    window.print();
    priceSections.forEach((el) => (el.style.display = "block"));
  };

  const categorized = {
    Мангалы: modules.filter((m) => m.id.includes("mangal")),
    Печи: modules.filter((m) => m.id.includes("pech")),
    Кокталы: modules.filter((m) => m.id.includes("koktal")),
    Столы: modules.filter((m) => m.id.includes("table")),
    Прочее: modules.filter((m) => m.id.includes("gas") || m.id.includes("sink")),
  };

  const basePrice = (totalLength / 1000) * 235000;
  const apron = hasApron && apronLength && apronPrice ? (parseInt(apronLength) / 1000) * parseInt(apronPrice) : 0;
  const roof = hasRoof && roofPrice ? parseInt(roofPrice) : 0;
  const hood = hoodLength && hoodPrice ? (parseInt(hoodLength) / 1000) * parseInt(hoodPrice) : 0;

  const accessories = [
    glassDoor && { name: "Дверца со стеклом", price: 42000 },
    skewers && { name: "Шампуры", price: 10000 },
    tools && { name: "Совок/Кочерга", price: 14000 },
    ...Object.entries(cauldrons).filter(([_, val]) => val).map(([size]) => {
      const prices = { "12": 22000, "18": 28000, "22": 35000, "50": 65000, "80": 85000 };
      return { name: `Казан на ${size} л`, price: prices[size] };
    })
  ].filter(Boolean);

  const accessoriesTotal = accessories.reduce((sum, acc) => sum + acc.price, 0);
  const totalPrice = Math.round(basePrice + apron + roof + hood + accessoriesTotal);

  return (
    <div ref={fullPageRef} style={{ padding: 24, fontFamily: "sans-serif", maxWidth: 1200, margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>Конфигуратор комплекса BEL BBQ</h1>

      <div style={{ marginBottom: 24 }}>
        <h3>Данные клиента:</h3>
        <input placeholder="ФИО" value={fio} onChange={(e) => setFio(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />
        <input placeholder="Город" value={city} onChange={(e) => setCity(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />
        <input placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />
        <input placeholder="Подпись" value={signature} onChange={(e) => setSignature(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />
        <input type="datetime-local" value={clientDate} onChange={(e) => setClientDate(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />
      </div>

      <div style={{ marginBottom: 16 }}>
        {Object.keys(categorized).map((cat) => (
          <button key={cat} onClick={() => setActiveTab(cat)} style={{ marginRight: 8, padding: 6, border: activeTab === cat ? '2px solid black' : '1px solid #ccc' }}>{cat}</button>
        ))}
        <button onClick={reset} style={{ marginLeft: 16, background: "red", color: "white", padding: 6 }}>Сбросить всё</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        {categorized[activeTab].map((mod) => (
          <button key={mod.id} onClick={() => addModule(mod)} style={{ padding: 6, border: "1px solid #ccc" }}>{mod.name}</button>
        ))}
      </div>

      <div ref={containerRef} style={{ padding: 16, background: "#f0f0f0", border: "1px solid #ccc", borderRadius: 8, marginBottom: 24 }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: "left bottom", display: "flex", alignItems: "flex-end", height: 500 }}>
          {selected.map((mod, index) => (
            <div key={index} style={{ marginLeft: index > 0 ? `${-pipeWidth * baseScale}px` : "0px", width: `${mod.width * baseScale}px`, height: "500px" }}>
              <img src={`modules/${mod.id}.png`} alt={mod.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
        <div>
          <label><input type="checkbox" checked={hasApron} onChange={(e) => setHasApron(e.target.checked)} /> Фартук</label><br />
          {hasApron && (
            <div>
              <input placeholder="Длина (мм)" value={apronLength} onChange={(e) => setApronLength(e.target.value)} />
              <input placeholder="Цена (₸/м)" value={apronPrice} onChange={(e) => setApronPrice(e.target.value)} />
            </div>
          )}
          <label><input type="checkbox" checked={hasRoof} onChange={(e) => setHasRoof(e.target.checked)} /> Навес</label><br />
          {hasRoof && <input placeholder="Цена (₸)" value={roofPrice} onChange={(e) => setRoofPrice(e.target.value)} />}
          <div>
            <strong>Зонт:</strong><br />
            <input placeholder="Длина (мм)" value={hoodLength} onChange={(e) => setHoodLength(e.target.value)} />
            <input placeholder="Цена (₸/м)" value={hoodPrice} onChange={(e) => setHoodPrice(e.target.value)} />
          </div>
          <div>
            <strong>Цвет:</strong><br />
            <label><input type="radio" value="Антрацит" checked={color === "Антрацит"} onChange={(e) => setColor(e.target.value)} /> Антрацит</label><br />
            <label><input type="radio" value="Черная Шагрень" checked={color === "Черная Шагрень"} onChange={(e) => setColor(e.target.value)} /> Черная Шагрень</label>
          </div>
        </div>

        <div>
          <strong>Комплектующие:</strong><br />
          <label><input type="checkbox" checked={glassDoor} onChange={(e) => setGlassDoor(e.target.checked)} /> Дверца со стеклом</label><br />
          <label><input type="checkbox" checked={skewers} onChange={(e) => setSkewers(e.target.checked)} /> Шампуры</label><br />
          <label><input type="checkbox" checked={tools} onChange={(e) => setTools(e.target.checked)} /> Совок / Кочерга</label><br />
          <strong>Казаны:</strong><br />
          {Object.keys(cauldrons).map((size) => (
            <label key={size}><input type="checkbox" checked={cauldrons[size]} onChange={(e) => setCauldrons({ ...cauldrons, [size]: e.target.checked })} /> {size} л</label>
          ))}
        </div>
      </div>

      <div className="price-section" style={{ marginTop: 32 }}>
        <h3>Итоговая информация:</h3>
        <p>Общая длина: {totalLength} мм</p>
        <p>Итого: {totalPrice.toLocaleString()} ₸</p>
        <p>Цвет покрытия: {color}</p>
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button onClick={exportFullPage} style={{ background: "#007bff", color: "white", padding: "8px 16px" }}>Сохранить как PNG</button>
        <button onClick={printForProduction} style={{ background: "green", color: "white", padding: "8px 16px" }}>Печать на производство (без цен)</button>
      </div>
    </div>
  );
}
