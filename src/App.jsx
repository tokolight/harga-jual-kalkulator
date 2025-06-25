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

  const biayaPlatform = mode === "online"
    ? hpp * 0.08 + hpp * 0.05 + hpp * 0.02 +
      (asuransi ? 350 : 0) +
      (proses ? 1250 : 0) +
      (biayaLain ? hpp * 0.05 : 0)
    : 0;

  const hargaJual = hpp + biayaPacking + biayaPlatform + hpp * (margin / 100);

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2>Kalkulator Harga Jual</h2>
      <div>
        <button onClick={() => setMode('offline')} disabled={mode === 'offline'}>Offline</button>
        <button onClick={() => setMode('online')} disabled={mode === 'online'} style={{ marginLeft: 10 }}>Online</button>
      </div>

      <div style={{ marginTop: 15 }}>
        <label>HPP (modal): </label><br />
        <input type="number" value={hpp} onChange={e => setHpp(Number(e.target.value))} />
      </div>

      <div style={{ marginTop: 15 }}>
        <label>Margin (%): </label><br />
        <button onClick={() => setMargin(10)}>10%</button>
        <button onClick={() => setMargin(15)} style={{ marginLeft: 5 }}>15%</button><br />
        <input type="number" value={margin} onChange={e => setMargin(Number(e.target.value))} style={{ width: 80, marginTop: 5 }} />
      </div>

      {mode === 'online' && (
        <div style={{ marginTop: 15 }}>
          <label><input type="checkbox" checked={asuransi} onChange={() => setAsuransi(!asuransi)} /> Asuransi (350)</label><br />
          <label><input type="checkbox" checked={proses} onChange={() => setProses(!proses)} /> Proses Pesanan (1250)</label><br />
          <label><input type="checkbox" checked={biayaLain} onChange={() => setBiayaLain(!biayaLain)} /> Biaya Lain (5%)</label>
        </div>
      )}

      <div style={{ marginTop: 20, fontWeight: 'bold', fontSize: 18 }}>
        Harga Jual: Rp {Math.ceil(hargaJual).toLocaleString('id-ID')}
      </div>
    </div>
  );
}

export default App;
