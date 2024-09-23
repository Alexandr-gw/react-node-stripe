import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoadingPage from '../../LoadingPage/LoadingPage';
import { login } from '../../../store/actions/actionsAuth';
import './Login.css';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, token } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (token && response) {
            navigate('/');
            setResponse(false)
        }
    }, [token, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        setResponse(true)
    };

    if (loading) {
        return <LoadingPage />;
    } else {
        return (
            <div className="login-wrapper">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <Link to="/Registration">Registration</Link>
            </div>
        );
    }
};

export default Login;
