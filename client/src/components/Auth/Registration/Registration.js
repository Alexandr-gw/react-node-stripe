import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register as registerAction } from '../../../store/actions/actionsAuth';
import { Link, useNavigate } from 'react-router-dom';
import LoadingPage from '../../LoadingPage/LoadingPage';
import './Registration.css';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); 
        dispatch(registerAction(name, email, password));
        navigate('/Login');
    };

    if (loading) {
        return <LoadingPage />;
    } else {
        return (
            <div className="registration-wrapper">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <button type="submit">Register</button>
                </form>
                <Link to="/Login">Login</Link>
            </div>
        );
    }
};

export default Register;
