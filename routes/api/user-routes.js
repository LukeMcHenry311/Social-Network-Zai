const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUsers).post(createUser);

router
  .route("/:id")
  .get(getUsersById)
  .put(updateUserById)
  .delete(deleteUserById);

router.route("/:id/friends/friendId").put(addFriend).delete(deleteFriend);

module.exports = router;
