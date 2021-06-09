const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');

//set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

//set up GET one, DELETE, and PUT at /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .delete(deleteUser)
  .put(updateUser);

// api routes for /api/users/:userId/friends/:friendsId
router
  .route('/:userId/friends/:friendsId')
  .post(addFriend)
  .delete(removeFriend);


module.exports = router;