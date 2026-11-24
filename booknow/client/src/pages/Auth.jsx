import { useState } from 'react'; import { Link } from 'react-router-dom';
import { api } from '../services/api'; import { useAuth } from '../context/AuthContext';
export default function Auth({ mode }) {
  const { login } = useAuth(), signup = mode === 'signup';
  const [f, setF] = useState({ name: '', email: '', phone: '', password: '' }), [err, setErr] = useState('');
  const set = k => e => setF({ ...f, [k]: e.target.value });
  const submit = async e => {
    e.preventDefault(); setErr('');
    try { login(await api(`/auth/${mode}`, 'POST', f)); } catch (x) { setErr(x.message); }
  };
  return (
    <form className="card auth" onSubmit={submit}>
      <h2>{signup ? 'Create account' : 'Welcome back'}</h2>
      {err && <p className="error">{err}</p>}
      {signup && <><input placeholder="Full name" value={f.name} onChange={set('name')} required />
        <input placeholder="Phone" value={f.phone} onChange={set('phone')} /></>}
      <input type="email" placeholder="Email" value={f.email} onChange={set('email')} required />
      <input type="password" placeholder="Password (min 6)" value={f.password} onChange={set('password')} required />
      <button className="btn wide">{signup ? 'Sign Up' : 'Login'}</button>
      <p className="muted">{signup ? <>Have an account? <Link to="/login">Login</Link></> : <>New here? <Link to="/signup">Sign up</Link></>}</p>
    </form>
  );
}
