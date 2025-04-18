import { useState } from 'react';
import { registerUser, loginUser } from '../api';
import { useNavigate } from 'react-router-dom';

export const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const { data } = await loginUser({ email, password });
            console.log(data);
            setIsLoggedIn(true);
            navigate('/home');
        } catch (error) {
            console.error(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export const Register = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const { data } = await registerUser({ name, email, password });
            console.log(data);
            setIsLoggedIn(true);
            navigate('/home');
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};