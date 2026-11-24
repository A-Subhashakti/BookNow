import { useEffect, useState } from 'react'; import { api } from '../services/api';
export default function Bookings() {
  const [list, setList] = useState([]);
  const load = () => api('/bookings').then(setList); useEffect(() => { load(); }, []);
  const cancel = async id => { if (confirm('Cancel this booking?')) { await api('/bookings/' + id, 'DELETE'); load(); } };
  return (<><h1>My Tickets</h1>
    {!list.length && <p className="muted">No bookings yet.</p>}
    {list.map(b => b.movie && (
      <div key={b._id} className={'card ticket ' + b.status}>
        <img src={b.movie.poster} alt="" />
        <div><h3>{b.movie.title}</h3><p className="muted">{b.show.replaceAll(' | ', ' · ')}</p>
          <p>Seats: <b>{b.seats.join(', ')}</b> · Total ₹{b.total}</p><p className="muted">Booking ID: {b._id.slice(-8).toUpperCase()}</p></div>
        {b.status === 'booked' ? <button className="btn ghost" onClick={() => cancel(b._id)}>Cancel</button> : <span className="error">Cancelled</span>}
      </div>))}</>);
}
