const express = require('express');
const router = express.Router();

const { getUser } = require("../Controller/userController"); 

router.post('/',getUser);

module.exports = router;
