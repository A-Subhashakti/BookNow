import { useState } from 'react'; import { api } from '../services/api'; import { useAuth } from '../context/AuthContext';
export default function Profile() {
  const { user, setUser } = useAuth(), [f, setF] = useState({ name: user.name, phone: user.phone || '' }), [msg, setMsg] = useState('');
  const save = async e => { e.preventDefault(); setUser(await api('/auth/me', 'PUT', f)); setMsg('Profile updated ✔'); };
  return (<form className="card auth" onSubmit={save}>
    <div className="avatar">{user.name[0].toUpperCase()}</div><h2>My Profile</h2>
    {msg && <p className="ok">{msg}</p>}
    <input value={user.email} disabled />
    <input value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder="Name" required />
    <input value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} placeholder="Phone" />
    <button className="btn wide">Save changes</button></form>);
}
