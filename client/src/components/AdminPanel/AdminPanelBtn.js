import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction, tokenVerified } from "../../store/actions/actionsAuth";
import authService from "../../store/services/authService";
import { jwtDecode } from "jwt-decode";
import './AdminPanelBtn.css';


const AdminPanelBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState('');
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const tokenCookie = Cookies.get('token');
        if (tokenCookie) {
            authService.verifyToken(tokenCookie).then((newToken) => {
                dispatch(tokenVerified(newToken));
            }).catch(() => {
                handleLogout();
            });
            setUserRole(jwtDecode(tokenCookie).role);
        }
    }, [token, dispatch]);
    const handleAdminPanel = () => {
        navigate('/AdminPanel');
    };

    const handleLogout = () => {
        dispatch(logoutAction());
        Cookies.remove('token');
        setUserRole('');
        navigate('/');
    };

    return (
        <div>
            {userRole === 'admin' ? (
                <>
                    <button onClick={handleAdminPanel} className="admin-panel-btn">Admin Panel</button>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default AdminPanelBtn;