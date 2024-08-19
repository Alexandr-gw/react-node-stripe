import React from "react";
import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    RouterProvider,
    Outlet
} from "react-router-dom";
import NavBar from "../components/NavBar";
import Home from "../components/Home";
import BooksList from "../components/BooksList";
import LoadingPage from "../components/LoadingPage";
import Book from "../components/Book";
import BookDescription from "../components/BookDescription";
import CancelPage from "../components/CancelPage";
import SuccessPage from "../components/SuccessPage";
import ErrorPage from "../components/ErrorPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="BooksList" element={<BooksListLayout />}>
                <Route index element={<BooksList />} />
                <Route path=":bookId" element={<Book />}>
                    <Route path="description" element={<BookDescription />} />
                </Route>
            </Route>
            <Route path="LoadingPage" element={<LoadingPage />} />
            <Route path="SuccessPage" element={<SuccessPage />} />
            <Route path="CancelPage" element={<CancelPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Route>
    )
);

function AppRoutes() {
    return <RouterProvider router={router} />;
}

function RootLayout() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}

function BooksListLayout() {
    return (
        <>
            <Outlet />
        </>
    );
}

export default AppRoutes;
