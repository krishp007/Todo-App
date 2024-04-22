const {Router} = require('express');
// const { User } = require('../models/user.js');
const { registerUser, login, getMyProfile, logout} = require("../controllers/user.js");
const { isAuthenticated } = require('../middlewares/auth.js');

const router = Router();

// router.get("/all", getAllUsers);

router.post("/new", registerUser);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isAuthenticated, getMyProfile);

module.exports = router;