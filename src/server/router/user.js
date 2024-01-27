const { getAllUsers, deleteUser, updateUser } = require("../controllers/users");

// TODO: create the middleware de authetificacion
module.exports = function (router) {
  router.get("/users", getAllUsers);
  router.delete("/user/delete", deleteUser);
  router.patch("/user/update", updateUser);
};
