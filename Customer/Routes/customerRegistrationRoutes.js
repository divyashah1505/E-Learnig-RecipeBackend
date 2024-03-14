const bodyParser = require("body-parser");
const { registerCustomer } = require("../Controllers/customerRegistrationController");
const db = require("../../config/db");
const authMiddleware = require("../../middleware/Auth");

module.exports = {
  bind_Url: function (app) {
    // Use bodyParser middleware if needed
    // app.use(bodyParser.json());

    // Define your register route
    app.post("/register", async (req, res) => {
      registerCustomer(req, res);
    });
  },
};
