import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import BooksList from '../components/BooksList/BooksList';
import LoadingPage from '../components/LoadingPage/LoadingPage';
import Book from '../components/Book/Book';
import BookDescription from '../components/BookDescription/BookDescription';
import CancelPage from '../components/CancelPage/CancelPage';
import SuccessPage from '../components/SuccessPage/SuccessPage';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import Login from '../components/Auth/Login/Login';
import Registration from '../components/Auth/Registration/Registration';
import AdminPanel from '../components/AdminPanel/AdminPanel';
import AccessControl from '../components/AccessControl/AccessControl';
import CartPage from '../components/Cart/CartPage';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="BooksList" element={<BooksList />}>
                <Route path=":bookId" element={<Book />}>
                    <Route path="description" element={<BookDescription />} />
                </Route>
            </Route>
            <Route path="LoadingPage" element={<LoadingPage />} />
            <Route path="SuccessPage" element={<SuccessPage />} />
            <Route path="CancelPage" element={<CancelPage />} />
            <Route path="Login" element={<Login />} />
            <Route path="Registration" element={<Registration />} />
            <Route path="AdminPanel" element={
                <AccessControl allowedRoles={['admin']}><AdminPanel /></AccessControl>} />
            <Route path="Cart" element={<CartPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default AppRoutes;
