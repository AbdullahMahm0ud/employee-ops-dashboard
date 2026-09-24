const express = require("express");
const router = express.Router();
const employeesCtonroller = require("../../controllers/employeesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(employeesCtonroller.getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesCtonroller.createNewEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesCtonroller.updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), employeesCtonroller.deleteEmployee);

router.route("/:id").get(employeesCtonroller.getEmployee);

module.exports = router;
