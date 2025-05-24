import { useState } from "react";

const modules = [
  { id: "mangal_700", name: "Мангал 700", width: 720 },
  { id: "pech_480", name: "Печь под казан", width: 500 },
  { id: "koktal_1000", name: "Коктал 1000", width: 1020 },
];

export default function BBQConstructor() {
  const [selected, setSelected] = useState([]);

  const addModule = (mod) => setSelected([...selected, mod]);
  const reset = () => setSelected([]);

  const totalLength = selected.reduce(
    (sum, m, i) => sum + m.width + (i > 0 ? -40 : 0),
    0
  );
  const pricePerMeter = 235000;
  const priceTotal = (totalLength / 1000) * pricePerMeter;

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
        Конфигуратор комплекса (CSS)
      </h1>

      <div style={{ marginBottom: '16px' }}>
        {modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => addModule(mod)}
            style={{
              padding: '8px 12px',
              marginRight: '8px',
              marginBottom: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              background: '#fff',
            }}
          >
            {mod.name}
          </button>
        ))}
        <button
          onClick={reset}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            background: 'red',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Сбросить
        </button>
      </div>

      <div
        style={{
          overflowX: 'auto',
          background: '#f3f3f3',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #ccc',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          {selected.map((mod, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                marginLeft: index === 0 ? '0px' : '-40px',
                zIndex: 10 + index,
                width: '160px',
                height: '170px',
                flexShrink: 0,
                background: '#fff',
              }}
            >
              <img
                src={`modules/${mod.id}.png`}
                style={{ width: '100%', height: '140px', objectFit: 'contain' }}
                alt={mod.name}
              />
              <div style={{ textAlign: 'center', fontSize: '14px', marginTop: '4px' }}>{mod.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '18px' }}>
        Общая длина: {totalLength} мм<br />
        Стоимость комплекса: {Math.round(priceTotal).toLocaleString()} ₸
      </div>
    </div>
  );
}
