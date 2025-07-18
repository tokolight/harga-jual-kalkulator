import { useState } from "react";

function App() {
  const [hpp, setHpp] = useState(0);
  const [margin, setMargin] = useState(15);
  const [mode, setMode] = useState("offline");
  const [asuransi, setAsuransi] = useState(false);
  const [proses, setProses] = useState(false);
  const [biayaLain, setBiayaLain] = useState(false);

  const biayaPacking = mode === "offline"
    ? 1000
    : hpp < 50000
      ? hpp * 0.015
      : 1000;

  const admin = hpp * 0.08;
  const ongkir = hpp * 0.05;
  const promo = hpp * 0.02;
  const tambahanLain = biayaLain ? hpp * 0.05 : 0;

  const biayaPlatform = mode === "online"
    ? admin + ongkir + promo +
      (asuransi ? 350 : 0) +
      (proses ? 1250 : 0) +
      tambahanLain
    : 0;

  const totalMargin = hpp * (margin / 100);
  const hargaJual = hpp + biayaPacking + biayaPlatform + totalMargin;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #fdfbfb, #ebedee)',
      padding: '40px 20px',
      fontFamily: "'Inter', sans-serif",
      color: '#2c3e50',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '700px',
        background: '#fff',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 20px 30px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', fontWeight: 700, fontSize: '2rem', marginBottom: '30px' }}>
          💰 Kalkulator Harga Jual
        </h2>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
          <button
            onClick={() => setMode('offline')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              background: mode === 'offline' ? '#22c55e' : '#e2e8f0',
              color: mode === 'offline' ? 'white' : '#475569',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Offline
          </button>
          <button
            onClick={() => setMode('online')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              background: mode === 'online' ? '#3b82f6' : '#e2e8f0',
              color: mode === 'online' ? 'white' : '#475569',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Online
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Harga Modal (HPP)</label>
          <input
            type="number"
            value={hpp}
            onChange={e => setHpp(Number(e.target.value))}
            placeholder="Contoh: 35000"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Margin (%)</label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button onClick={() => setMargin(10)} style={buttonSmall}>10%</button>
            <button onClick={() => setMargin(15)} style={buttonSmall}>15%</button>
            <input
              type="number"
              value={margin}
              onChange={e => setMargin(Number(e.target.value))}
              style={{ ...inputStyle, flex: 1 }}
            />
          </div>
        </div>

        {mode === 'online' && (
          <div style={{ marginBottom: '25px' }}>
            <label>Biaya Tambahan:</label>
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label><input type="checkbox" checked={asuransi} onChange={() => setAsuransi(!asuransi)} /> Asuransi (Rp350)</label>
              <label><input type="checkbox" checked={proses} onChange={() => setProses(!proses)} /> Proses Pesanan (Rp1250)</label>
              <label><input type="checkbox" checked={biayaLain} onChange={() => setBiayaLain(!biayaLain)} /> Biaya Lain (5%)</label>
            </div>
          </div>
        )}

        <div style={{
          marginTop: '30px',
          padding: '25px',
          background: '#facc15',
          color: '#1e293b',
          borderRadius: '15px',
          textAlign: 'center',
          fontSize: '1.6rem',
          fontWeight: 700
        }}>
          Harga Jual: Rp {Math.ceil(hargaJual).toLocaleString('id-ID')}
        </div>

        <div style={{
          marginTop: '25px',
          fontSize: '0.95rem',
          lineHeight: '1.6',
          background: '#f1f5f9',
          borderRadius: '12px',
          padding: '20px',
          color: '#334155'
        }}>
          <strong>Rincian Biaya:</strong><br />
          - HPP: Rp {hpp.toLocaleString('id-ID')}<br />
          - Biaya Packing: Rp {Math.ceil(biayaPacking).toLocaleString('id-ID')}<br />
          - Margin ({margin}%): Rp {totalMargin.toLocaleString('id-ID')}<br />
          {mode === "online" && (
            <>
              - Admin (8%): Rp {admin.toLocaleString('id-ID')}<br />
              - Gratis Ongkir XTRA (5%): Rp {ongkir.toLocaleString('id-ID')}<br />
              - Promo XTRA (2%): Rp {promo.toLocaleString('id-ID')}<br />
              {asuransi && <>- Asuransi: Rp 350<br /></>}
              {proses && <>- Proses Pesanan: Rp 1.250<br /></>}
              {biayaLain && <>- Biaya Lain (5%): Rp {tambahanLain.toLocaleString('id-ID')}<br /></>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginTop: '8px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};

const buttonSmall = {
  padding: '10px 16px',
  borderRadius: '10px',
  border: 'none',
  background: '#e2e8f0',
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer'
};

export default App;
