const express = require("express");
const db = require("../database");
const utils = require("../utils");
const config = require("../config");
const jwt = require('jsonwebtoken')

const router = express.Router();

// get all groups

router.get("/allGroup", (request, response) => {
  const statemet = `select group_name from course_group`;

  db.pool.execute(statemet, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});


// routes/group.js
router.post("/groupbycourse", (request, response) => {
  const { course_id } = request.body;

  if (!course_id) {
    return response.send(utils.createError("Course ID is required"));
  }

  const groupStatement = `SELECT group_id, group_name FROM course_group WHERE course_id = ?`;

  db.pool.execute(groupStatement, [course_id], (error, groups) => {
    if (error) {
      return response.send(utils.createError(error));
    }
    response.send(utils.createResult(null, groups));
  });
});





module.exports = router