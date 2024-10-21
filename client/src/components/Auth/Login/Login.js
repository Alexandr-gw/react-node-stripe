import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoadingPage from '../../LoadingPage/LoadingPage';
import { login } from '../../../store/actions/actionsAuth';

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
            setResponse(false);
        }
    }, [token, response, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        setResponse(true);
    };

    if (loading) {
        return <LoadingPage />;
    } else {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Login
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <Link to="/Registration" className="text-green-600 hover:underline">
                            Don't have an account? Register here
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
};

export default Login;
