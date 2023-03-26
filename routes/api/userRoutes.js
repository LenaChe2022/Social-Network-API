const router = require('express').Router();
const {
  getUsers,
  createUser,
  updateUser,
  getSingleUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);
//post body example:
//  {
//    "username": "lernantino",
//    "email": "lernantino@gmail.com"
//   }

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);


// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;