import { useState } from "react";

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
  { id: "sink_500", name: "Мойка", width: 520 },
  { id: "gas_2burner_500", name: "Газ 500", width: 520 },
  { id: "table_600", name: "Стол 600", width: 620 },
  { id: "table_800", name: "Стол 800", width: 820 },
  { id: "table_1000", name: "Стол 1000", width: 1020 },
  { id: "table_1200", name: "Стол 1200", width: 1220 },
  { id: "table_1500", name: "Стол 1500", width: 1520 },
  { id: "table_2000", name: "Стол 2000", width: 2020 }
];

export default function BBQConstructor() {
  const [selected, setSelected] = useState([]);

  const addModule = (mod) => {
    setSelected([...selected, mod]);
  };

  const reset = () => setSelected([]);

  const totalLength = selected.reduce(
    (sum, m, i) => sum + m.width + (i > 0 ? -40 : 0),
    0
  );

  return (
    <div className="p-4 space-y-4 max-w-screen overflow-x-auto">
      <div className="flex flex-wrap gap-2">
        {modules.map((m) => (
          <button
            key={m.id}
            onClick={() => addModule(m)}
            className="border px-4 py-2 rounded hover:bg-gray-100 shadow text-sm"
          >
            {m.name}
          </button>
        ))}
        <button onClick={reset} className="bg-red-600 text-white px-4 py-2 rounded shadow">
          Сбросить
        </button>
      </div>

      <div className="overflow-x-auto border p-6 bg-gray-50 rounded-xl shadow-inner">
        <div className="flex items-end gap-0">
          {selected.map((mod, index) => (
            <div key={index} className="relative">
              {index > 0 && (
                <div
                  style={{ width: 30 }}
                  className="flex justify-center items-center bg-gray-400 text-[10px] text-white h-full px-1"
                >
                  Труба
                </div>
              )}
              <div className="w-[160px] flex flex-col items-center text-xs">
                <img
                  src={`modules/${mod.id}.png`}
                  alt={mod.name}
                  className="w-full h-[140px] object-contain border border-gray-300 rounded-md bg-white"
                />
                <div className="text-center mt-1 font-medium text-xs">
                  {mod.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="font-bold text-lg pt-2 border-t">
        Общая длина: {totalLength} мм
      </div>
    </div>
  );
}
