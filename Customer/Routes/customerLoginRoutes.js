const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { customerLogin } = require("../Controllers/customerLoginController");

router.use(bodyParser.json());

router.post("/clogin", async (req, res) => {
  customerLogin(req, res);
});

module.exports = {
  bind_Url: function (app) {
    app.use('/', router);
  }
};
