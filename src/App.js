import { useState } from "react";

const modules = [
  { id: "mangal_700", name: "Мангал 700", width: 720 },
  { id: "pech_480", name: "Печь под казан", width: 500 },
  { id: "koktal_600", name: "Коктал 600", width: 620 },
  { id: "gas_2burner_500", name: "Газ 500", width: 520 },
  { id: "table_800", name: "Стол 800", width: 820 },
  { id: "table_1000", name: "Стол 1000", width: 1020 },
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
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
        Конфигуратор комплекса
      </h1>

      <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => addModule(mod)}
            style={{
              padding: '12px 18px',
              borderRadius: '8px',
              background: '#fff',
              border: '2px solid #ccc',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            {mod.name}
          </button>
        ))}
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
            cursor: 'pointer'
          }}
        >
          Сбросить
        </button>
      </div>

      <div
        style={{
          overflowX: 'auto',
          padding: '24px',
          borderRadius: '16px',
          background: '#f7f7f7',
          border: '1px solid #ddd',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', position: 'relative' }}>
          {selected.map((mod, index) => (
            <div
              key={index}
              style={{
                marginLeft: index > 0 ? '-40px' : '0px',
                zIndex: index,
                height: '500px',
                width: `${(mod.width / 2)}px`,
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
                  position: 'relative',
                }}
              />
              <div style={{ textAlign: 'center', fontSize: '16px', fontWeight: '500', marginTop: '8px' }}>
                {mod.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '32px', fontWeight: 'bold', fontSize: '24px' }}>
        Общая длина: {totalLength} мм<br />
        Стоимость комплекса: {Math.round(priceTotal).toLocaleString()} ₸
      </div>
    </div>
  );
}
