const { register, login } =require("../controllers/authetication"); 


module.exports = function(router) {
    router.post("/auth/register", register);
    router.post("/auth/login", login);

}