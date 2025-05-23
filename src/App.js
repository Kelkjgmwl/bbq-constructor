import React, { useState } from "react";

const modules = [
  { id: "mangal550", name: "Мангал 550", width: 570 },
  { id: "mangal700", name: "Мангал 700", width: 720 },
  { id: "mangal900", name: "Мангал 900", width: 920 },
  { id: "mangal1000", name: "Мангал 1000", width: 1020 },
  { id: "pech480", name: "Печь 480", width: 500 },
  { id: "pech680", name: "Печь 680", width: 700 },
  { id: "pech1000", name: "Печь 1000", width: 1020 },
  { id: "koktal600", name: "Коктал 600", width: 620 },
  { id: "koktal700", name: "Коктал 700", width: 720 },
  { id: "koktal800", name: "Коктал 800", width: 820 },
  { id: "koktal900", name: "Коктал 900", width: 920 },
  { id: "koktal1000", name: "Коктал 1000", width: 1020 },
  { id: "sink", name: "Мойка", width: 500 },
  { id: "gas", name: "Газ 2-конф.", width: 500 },
  { id: "table400", name: "Стол 400", width: 400 },
  { id: "table600", name: "Стол 600", width: 600 },
  { id: "table800", name: "Стол 800", width: 800 },
  { id: "table1000", name: "Стол 1000", width: 1000 },
  { id: "table1200", name: "Стол 1200", width: 1200 },
  { id: "table1500", name: "Стол 1500", width: 1500 },
  { id: "table2000", name: "Стол 2000", width: 2000 },
];


const TUBE_WIDTH = 40;

export default function BBQConstructor() {
  const [selectedModules, setSelectedModules] = useState([]);

  const addModule = (mod) => setSelectedModules([...selectedModules, mod]);
  const resetModules = () => setSelectedModules([]);

  const totalWidth = () => {
    if (selectedModules.length === 0) return 0;
    const width = selectedModules.reduce((sum, m) => sum + m.width, 0);
    const tubes = TUBE_WIDTH * (selectedModules.length);
    return width + tubes;
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {modules.map((mod) => (
          <button key={mod.id} onClick={() => addModule(mod)}>
            {mod.name}
          </button>
        ))}
        <button onClick={resetModules} style={{ background: "red", color: "white" }}>
          Сбросить
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          {selectedModules.map((mod, i) => (
            <React.Fragment key={i}>
              <div style={{
                width: 40,
                height: 50,
                background: "gray",
                textAlign: "center",
                lineHeight: "50px"
              }}>Труба</div>
              <div style={{
                width: mod.width / 10,
                height: 50,
                background: "lightblue",
                textAlign: "center",
                lineHeight: "50px"
              }}>{mod.name}</div>
            </React.Fragment>
          ))}
        </div>
        {selectedModules.length > 0 && (
          <div style={{
            width: 40,
            height: 50,
            background: "gray",
            textAlign: "center",
            lineHeight: "50px"
          }}>Труба</div>
        )}
        <div style={{ marginTop: 20, fontWeight: "bold" }}>
          Общая длина: {totalWidth()} мм
        </div>
      </div>
    </div>
  );
}
