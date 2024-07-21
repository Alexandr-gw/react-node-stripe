import "./assets/css/App.css";

import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    Link,
    Outlet,
    RouterProvider
} from 'react-router-dom'


//pages
import ErrorPage from './components/ErrorPage'
import Home from './components/Home'
import BooksList from './components/BooksList'
import LoadingPage from './components/LoadingPage'
import Book from './components/Book'
import BookDescription from './components/BookDescription'


//===

import { Provider } from "react-redux";
import configureStore from "./store/store/configureStore";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Root />}>
                <Route index element={<Home />} />
                <Route id="BooksList" path="BooksList" element={<Outlet />}>
                    <Route index element={<BooksList />} />
                    <Route id="book" path=":bookId" element={<Book />} >
                        <Route path="description" element={<BookDescription />} />
                    </Route>
                </Route>
                <Route path="LoadingPage" element={<LoadingPage />} />
                <Route path="/*" element={<ErrorPage />} />
            </Route>
        )
    )

    return (
        <div className="wrapper">
            <RouterProvider router={router} />
        </div>
    )
}

const Root = () => {
    const store = configureStore();

    return (
        <>
            <div>
                <Link to="/">Home</Link>
                <Link to="/BooksList">Books</Link>
            </div>
            <div>
                <Provider store={store}>
                    <Outlet />
                </Provider>
            </div>
        </>
    )
}


export default App