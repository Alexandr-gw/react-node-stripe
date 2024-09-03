import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NODE_API_URL || 'http://localhost:8080/api/auth';

const authService = {
    login: async (email, password) => {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        const token = response.data.token;
        Cookies.set('token', token, { expires: 2 }); // 2 days
        return token;
    },

    register: async (name, email, password) => {
        await axios.post(`${API_URL}/register`, { name, email, password });
    },

    verifyToken: async (token) => {
        const response = await axios.post(`${API_URL}/verify-token`, { token });
        const newToken = response.data.newToken;
        if (newToken) {
            Cookies.set('token', newToken, { expires: 2 });
            return newToken;
        } else {
            throw new Error('Token invalid');
        }
    },

    logout: () => {
        Cookies.remove('token');
    }
};

export default authService;
