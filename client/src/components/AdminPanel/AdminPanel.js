import React, { useState, useEffect } from 'react';
// import UserList from './UserList';
// import UserForm from './UserForm';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from server
        // setUsers(fetchedUsers);
    }, []);

    const addUser = (user) => {
        setUsers([...users, user]);
    };

    return (
        <div>
            <h2>Admin Panel</h2>
            {/* <UserForm onSubmit={addUser} />
            <UserList users={users} /> */}
        </div>
    );
};

export default AdminPanel;
