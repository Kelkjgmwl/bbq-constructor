import { useState } from "react";

const categories = {
  Мангал: [
    { id: "mangal_550", name: "Мангал 550", width: 570 },
    { id: "mangal_700", name: "Мангал 700", width: 720 },
    { id: "mangal_1000", name: "Мангал 1000", width: 1020 },
  ],
  Печь: [
    { id: "pech_480", name: "Печь 480", width: 500 },
    { id: "pech_680", name: "Печь 680", width: 700 },
    { id: "pech_1000", name: "Печь 1000", width: 1020 },
  ],
  Коктал: [
    { id: "koktal_600", name: "Коктал 600", width: 620 },
    { id: "koktal_800", name: "Коктал 800", width: 820 },
    { id: "koktal_1000", name: "Коктал 1000", width: 1020 },
  ],
  Прочее: [
    { id: "sink_500", name: "Мойка", width: 520 },
    { id: "gas_2burner_500", name: "Газ 500", width: 520 },
  ],
  Стол: [
    { id: "table_600", name: "Стол 600", width: 620 },
    { id: "table_800", name: "Стол 800", width: 820 },
    { id: "table_1000", name: "Стол 1000", width: 1020 },
    { id: "table_1200", name: "Стол 1200", width: 1220 },
    { id: "table_1500", name: "Стол 1500", width: 1520 },
    { id: "table_2000", name: "Стол 2000", width: 2020 },
  ],
};

export default function BBQConstructor() {
  const [selected, setSelected] = useState([]);
  const [scale, setScale] = useState(1);

  const addModule = (mod) => setSelected([...selected, mod]);
  const reset = () => setSelected([]);

  const totalLength = selected.reduce(
    (sum, m, i) => sum + m.width + (i > 0 ? -40 : 0),
    0
  );
  const pricePerMeter = 235000;
  const priceTotal = (totalLength / 1000) * pricePerMeter;

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-wrap gap-4">
        {Object.entries(categories).map(([group, mods]) => (
          <div className="relative group" key={group}>
            <button className="px-4 py-2 border rounded shadow bg-white hover:bg-gray-100">
              {group}
            </button>
            <div className="absolute hidden group-hover:block bg-white border rounded shadow mt-1 z-10">
              {mods.map((mod) => (
                <div
                  key={mod.id}
                  onClick={() => addModule(mod)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {mod.name}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={reset}
          className="bg-red-600 text-white px-4 py-2 rounded shadow"
        >
          Сбросить
        </button>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm">Масштаб:</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
        />
        <span className="text-sm font-medium">{Math.round(scale * 100)}%</span>
      </div>

      <div
        className="overflow-x-auto border p-6 bg-gray-50 rounded-xl shadow-inner"
        style={{ transform: `scale(${scale})`, transformOrigin: "left top" }}
      >
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
        Общая длина: {totalLength} мм<br />
        Стоимость комплекса: {Math.round(priceTotal).toLocaleString()} ₸
      </div>
    </div>
  );
}
