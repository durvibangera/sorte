import { useState } from 'react';
import { registerUser, loginUser } from '../api';

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const { data } = await loginUser({ email, password });
            console.log(data);
            setIsLoggedIn(true);
        } catch (error) {
            console.error(error.response.data.message);
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

export default Login;