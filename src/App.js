import { useState } from "react";

const modules = [
  { id: "mangal_550", name: "Мангал 550", width: 580 },
  { id: "mangal_700", name: "Мангал 700", width: 720 },
  { id: "mangal_1000", name: "Мангал 1000", width: 1020 },
  { id: "pech_480", name: "Печь 480", width: 500 },
  { id: "pech_680", name: "Печь 680", width: 700 },
  { id: "pech_1000", name: "Печь 1000", width: 1020 },
  { id: "koktal_600", name: "Коктал 600", width: 620 },
  { id: "koktal_800", name: "Коктал 800", width: 820 },
  { id: "koktal_1000", name: "Коктал 1000", width: 1020 },
  { id: "table_600", name: "Стол 600", width: 620 },
  { id: "table_800", name: "Стол 800", width: 820 },
  { id: "table_1000", name: "Стол 1000", width: 1020 },
  { id: "table_1200", name: "Стол 1200", width: 1220 },
  { id: "table_1500", name: "Стол 1500", width: 1520 },
  { id: "table_2000", name: "Стол 2000", width: 2020 },
  { id: "gas_2burner_500", name: "Газ 500", width: 520 },
  { id: "sink_500", name: "Мойка 500", width: 520 },
];

export default function BBQConstructor() {
  const [selected, setSelected] = useState([]);
  const scale = 0.4;

  const addModule = (mod) => setSelected([...selected, mod]);
  const removeModule = (indexToRemove) => {
    setSelected(selected.filter((_, i) => i !== indexToRemove));
  };
  const reset = () => setSelected([]);

  const totalLength = selected.reduce(
    (sum, m, i) => sum + m.width + (i > 0 ? -40 : 0),
    0
  );
  const pricePerMeter = 235000;
  const priceTotal = (totalLength / 1000) * pricePerMeter;

  const categorized = {
    Мангалы: modules.filter((m) => m.id.includes("mangal")),
    Печи: modules.filter((m) => m.id.includes("pech")),
    Кокталы: modules.filter((m) => m.id.includes("koktal")),
    Столы: modules.filter((m) => m.id.includes("table")),
    Прочее: modules.filter((m) => m.id.includes("gas") || m.id.includes("sink")),
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
        Конфигуратор комплекса
      </h1>

      {/* Визуализация */}
      <div
        style={{
          overflowX: 'auto',
          padding: '24px',
          borderRadius: '16px',
          background: '#f7f7f7',
          border: '1px solid #ddd',
          position: 'relative',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', position: 'relative' }}>
          {selected.map((mod, index) => (
            <div
              key={index}
              style={{
                marginLeft: index > 0 ? `${-40 * scale}px` : '0px',
                zIndex: index,
                height: '500px',
                width: `${mod.width * scale}px`,
                position: 'relative',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={`modules/${mod.id}.png`}
                alt={mod.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  background: 'transparent',
                }}
              />
              <button
                onClick={() => removeModule(index)}
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
              <div style={{ textAlign: 'center', fontSize: '16px', fontWeight: '500', marginTop: '8px' }}>
                {mod.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопки */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '20px',
          marginBottom: '24px',
        }}
      >
        {Object.entries(categorized).map(([group, mods]) => (
          <div key={group} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {mods.map((mod) => (
              <button
                key={mod.id}
                onClick={() => addModule(mod)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: '#fff',
                  border: '2px solid #ccc',
                  cursor: 'pointer',
                  fontSize: '14px',
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
              padding: '12px 18px',
              borderRadius: '8px',
              background: 'red',
              color: 'white',
              border: 'none',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '4px'
            }}
          >
            Сбросить всё
          </button>
        </div>
      </div>

      <div style={{ marginTop: '32px', fontWeight: 'bold', fontSize: '24px' }}>
        Общая длина: {totalLength} мм<br />
        Стоимость комплекса: {Math.round(priceTotal).toLocaleString()} ₸
      </div>
    </div>
  );
}
