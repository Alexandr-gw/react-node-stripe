import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout as logoutAction, tokenVerified } from '../../src/store/actions/actionsAuth';
import authService from '../../src/store/services/authService';


const useRole = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [role, setRole] = useState(null);

    useEffect(() => {
        const tokenCookie = Cookies.get('token');
        if (tokenCookie) {
            authService.verifyToken(tokenCookie).then((newToken) => {
                dispatch(tokenVerified(newToken));
            }).catch(() => {
                console.error('Invalid token');
                handleLogout();
            });
            setRole(jwtDecode(tokenCookie).role);
        }
    }, []);
    const handleLogout = () => {
        dispatch(logoutAction());
        Cookies.remove('token');
        setRole('');
        navigate('/');
    };
    return role;
};

export default useRole;
