import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, editUser, deleteUser } from '../../store/actions/actionsUser';
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
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);//take a look into user.slice -> looks like need a bit of time to get this info otherwise getting 

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
            <div className="p-8 -my-16 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-bold mb-6 text-gray-800 my-16">Admin Panel - Users</h3>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 border-b font-semibold text-left text-gray-700">Name</th>
                                <th className="px-4 py-2 border-b font-semibold text-left text-gray-700">Email</th>
                                <th className="px-4 py-2 border-b font-semibold text-left text-gray-700">Role</th>
                                <th className="px-4 py-2 border-b font-semibold text-left text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user) => (
                                <tr key={user.id} className="bg-white hover:bg-gray-100 transition duration-200">
                                    <td className="px-4 py-2 border-b">
                                        {editingUserId === user.id ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={editFormData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                            />
                                        ) : (
                                            user.name
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {editingUserId === user.id ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={editFormData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                            />
                                        ) : (
                                            user.email
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {editingUserId === user.id ? (
                                            <input
                                                type="text"
                                                name="role"
                                                value={editFormData.role}
                                                onChange={handleInputChange}
                                                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                            />
                                        ) : (
                                            user.role
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {editingUserId === user.id ? (
                                            <div className="flex space-x-4">
                                                <button onClick={handleSaveClick} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200">Save</button>
                                                <button onClick={handleCancelClick} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200">Cancel</button>
                                            </div>
                                        ) : (
                                            <div className="flex space-x-4">
                                                <button onClick={() => handleEditClick(user)} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200">Edit</button>
                                                <button onClick={() => handleDeleteClick(user.id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200">Delete</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination flex justify-center mt-6">
                    {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className="mx-1 px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-yellow-400 hover:text-white transition duration-200"
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

        );
    }
};

export default UserList;
