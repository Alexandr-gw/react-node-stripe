import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, editUser, deleteUser } from '../../store/actions/actionsUser';
import './AdminPanel.css'; 
import LoadingPage from '../LoadingPage/LoadingPage';

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const loading = useSelector((state) => state.users.loading);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(2);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser) ;//take a look into user.slice -> looks like need a bit of time to get this info otherwise getting 

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleEditClick = (user) => {
        setEditingUserId(user.id);
        setEditFormData({ name: user.name, email: user.email, role: user.role });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleSaveClick = async () => {
        await dispatch(editUser(editingUserId, editFormData));
        setEditingUserId(null);
    };

    const handleCancelClick = () => {
        setEditingUserId(null);
        setEditFormData({});
    };

    const handleDeleteClick = async (id) => {
        await dispatch(deleteUser(id));
    };

    if (loading) {
        return <div><LoadingPage /></div>;
    } else {
        return (
            <div className="user-list-container">
                <h3>Admin Panel - Users</h3>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    {editingUserId === user.id ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={editFormData.name}
                                            onChange={handleInputChange}
                                            className="input-field"
                                        />
                                    ) : (
                                        user.name
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user.id ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={editFormData.email}
                                            onChange={handleInputChange}
                                            className="input-field"
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user.id ? (
                                        <input
                                            type="text"
                                            name="role"
                                            value={editFormData.role}
                                            onChange={handleInputChange}
                                            className="input-field"
                                        />
                                    ) : (
                                        user.role
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user.id ? (
                                        <>
                                            <button onClick={handleSaveClick} className="save-btn">Save</button>
                                            <button onClick={handleCancelClick} className="cancel-btn">Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditClick(user)} className="edit-btn">Edit</button>
                                            <button onClick={() => handleDeleteClick(user.id)} className="delete-btn">Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
                        <button key={index + 1} onClick={() => paginate(index + 1)} className="pagination-btn">
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
};

export default UserList;
