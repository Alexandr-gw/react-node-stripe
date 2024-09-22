const User = require('../models/user');

async function getUsers() {
    const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'role'],
        raw: true
    });

    if (users.length === 0) {
        console.log('No users found');
        return [];
    }

    return users;
}

async function updateUser(id, updatedUserInfo) {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }

    await user.update(updatedUserInfo);
    return user;
}

async function deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }

    await user.destroy();
}

module.exports = {
    getUsers,
    updateUser,
    deleteUser
};
