export default function BBQConstructor() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Тестовая линия модулей</h1>

      <div className="overflow-x-auto bg-gray-100 p-4 rounded border">
        <div className="flex items-end gap-0">

          {/* Первый модуль */}
          <div className="relative w-[160px] h-[170px] flex-shrink-0">
            <img
              src="modules/mangal_700.png"
              className="w-full h-[140px] object-contain"
              alt="Мангал 700"
            />
            <div className="text-center text-sm mt-1">Мангал 700</div>
          </div>

          {/* Труба */}
          <div className="w-[30px] bg-gray-400 text-white flex items-center justify-center text-xs h-[140px]">
            Труба
          </div>

          {/* Второй модуль (перекрывает трубу) */}
          <div className="relative -ml-[30px] w-[160px] h-[170px] flex-shrink-0 z-10">
            <img
              src="modules/koktal_800.png"
              className="w-full h-[140px] object-contain"
              alt="Коктал 800"
            />
            <div className="text-center text-sm mt-1">Коктал 800</div>
          </div>
        </div>
      </div>
    </div>
  );
}
