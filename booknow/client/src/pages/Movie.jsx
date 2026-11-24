import { useEffect, useState } from 'react'; import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api'; import { useAuth } from '../context/AuthContext';
const ROWS = 'ABCDEF'.split(''), COLS = [1, 2, 3, 4, 5, 6, 7, 8];
export default function Movie() {
  const { id } = useParams(), { user } = useAuth(), nav = useNavigate();
  const [m, setM] = useState(null), [show, setShow] = useState(''), [taken, setTaken] = useState([]);
  const [sel, setSel] = useState([]), [err, setErr] = useState(''), [pay, setPay] = useState(false);
  useEffect(() => { api('/movies/' + id).then(setM); }, [id]);
  useEffect(() => { if (show) { setSel([]); api(`/movies/${id}/seats?show=${encodeURIComponent(show)}`).then(setTaken); } }, [show]);
  const toggle = s => setSel(sel.includes(s) ? sel.filter(x => x !== s) : [...sel, s]);
  const book = async () => {
    if (!user) return nav('/login');
    try { await api('/bookings', 'POST', { movie: id, show, seats: sel }); nav('/bookings'); }
    catch (e) { setErr(e.message); setPay(false); api(`/movies/${id}/seats?show=${encodeURIComponent(show)}`).then(setTaken); setSel([]); }
  };
  if (!m) return <div className="center">Loading…</div>;
  const dates = [...new Set(m.shows.map(s => s.split(' | ')[1]))];
  return (<>
    <div className="detail card">
      <img src={m.poster} alt="" />
      <div><h1>{m.title}</h1><p className="muted">{m.genre} · {m.language} · {m.duration} min · ⭐ {m.rating}</p>
        <p>{m.description}</p><h3>₹{m.price} <small className="muted">per seat</small></h3></div>
    </div>
    <h2>Select showtime</h2>
    {dates.map(d => <div key={d} className="row"><b>{d}</b>
      {m.shows.filter(s => s.includes(d)).map(s => <button key={s} className={'chip ' + (s === show ? 'on' : '')} onClick={() => setShow(s)}>{s.split(' | ')[2]}</button>)}</div>)}
    {show && <div className="card seats">
      <div className="screen">SCREEN</div>
      {ROWS.map(r => <div className="seatrow" key={r}>{COLS.map(c => { const s = r + c, t = taken.includes(s);
        return <button key={s} disabled={t} className={'seat ' + (t ? 'taken' : sel.includes(s) ? 'sel' : '')} onClick={() => toggle(s)}>{s}</button>; })}</div>)}
      <div className="legend"><span><i className="seat" /> Free</span><span><i className="seat sel" /> Selected</span><span><i className="seat taken" /> Booked</span></div>
      {err && <p className="error">{err}</p>}
      <div className="bar"><span>{sel.join(', ') || 'No seats selected'} — <b>₹{sel.length * m.price}</b></span>
        <button className="btn" disabled={!sel.length} onClick={() => setPay(true)}>Proceed to Pay</button></div>
    </div>}
    {pay && <div className="modal"><div className="card">
      <h2>Confirm payment</h2><p>{m.title} · {show}</p><p>Seats: {sel.join(', ')}</p><h3>Total ₹{sel.length * m.price}</h3>
      <p className="muted">Demo payment – no real charge.</p>
      <div className="row"><button className="btn" onClick={book}>Pay & Book</button><button className="btn ghost" onClick={() => setPay(false)}>Cancel</button></div>
    </div></div>}
  </>);
}
