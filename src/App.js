import React, { useState } from "react";

const modules = [
  { id: "mangal1000", name: "Мангал 1000", width: 1020 },
  { id: "sink", name: "Мойка", width: 520 },
  { id: "kazan", name: "Казан", width: 700 },
  { id: "koktal", name: "Коктал", width: 1020 },
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
