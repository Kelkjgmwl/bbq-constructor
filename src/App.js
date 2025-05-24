export default function BBQConstructor() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Тестовая линия модулей</h1>

      <div className="overflow-x-auto bg-gray-100 p-4 rounded border">
        <div className="flex flex-row items-end space-x-0">

          {/* Первый модуль */}
          <div className="relative w-40 h-44 flex-shrink-0">
            <img
              src="modules/mangal_700.png"
              className="w-full h-36 object-contain"
              alt="Мангал 700"
            />
            <div className="text-center text-sm mt-1">Мангал 700</div>
          </div>

          {/* Труба */}
          <div className="w-8 bg-gray-400 text-white flex items-center justify-center text-xs h-36 flex-shrink-0">
            Труба
          </div>

          {/* Второй модуль */}
          <div className="relative -ml-8 w-40 h-44 flex-shrink-0 z-10">
            <img
              src="modules/koktal_800.png"
              className="w-full h-36 object-contain"
              alt="Коктал 800"
            />
            <div className="text-center text-sm mt-1">Коктал 800</div>
          </div>

        </div>
      </div>
    </div>
  );
}
