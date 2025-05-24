export default function BBQConstructor() {
  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
        Тестовая линия модулей (CSS)
      </h1>

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

          {/* Первый модуль */}
          <div style={{ width: '160px', height: '170px', marginRight: '0px', flexShrink: 0 }}>
            <img
              src="modules/mangal_700.png"
              style={{ width: '100%', height: '140px', objectFit: 'contain' }}
              alt="Мангал 700"
            />
            <div style={{ textAlign: 'center', fontSize: '14px', marginTop: '4px' }}>Мангал 700</div>
          </div>

          {/* Труба */}
          <div
            style={{
              width: '30px',
              background: '#999',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              height: '140px',
              flexShrink: 0,
              zIndex: 0,
            }}
          >
            Труба
          </div>

          {/* Второй модуль, перекрывающий трубу */}
          <div
            style={{
              width: '160px',
              height: '170px',
              marginLeft: '-30px',
              zIndex: 1,
              position: 'relative',
              background: 'white',
              flexShrink: 0,
            }}
          >
            <img
              src="modules/koktal_800.png"
              style={{ width: '100%', height: '140px', objectFit: 'contain' }}
              alt="Коктал 800"
            />
            <div style={{ textAlign: 'center', fontSize: '14px', marginTop: '4px' }}>Коктал 800</div>
          </div>
        </div>
      </div>
    </div>
  );
}
