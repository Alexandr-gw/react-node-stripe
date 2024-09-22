const userService = require('../services/userService');
const { StatusCodes } = require('http-status-codes');

async function getUsers(req, res) {
  try {
    const users = await userService.getUsers();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Could not fetch users' });
  }
}

async function editUser(req, res) {
  const { id } = req.params;
  const updatedUserInfo = req.body;
  try {
    const updatedUser = await userService.updateUser(id, updatedUserInfo);
    res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Could not update user' });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    await userService.deleteUser(id);
    res.status(StatusCodes.NO_CONTENT).end(); 
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Could not delete user' });
  }
}

module.exports = {
  getUsers,
  editUser,
  deleteUser
};
