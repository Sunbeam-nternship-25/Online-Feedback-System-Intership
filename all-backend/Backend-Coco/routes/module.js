const express = require("express");
const db = require("../database");
const utils = require("../utils");
const config = require("../config")
const jwt = require('jsonwebtoken')

const router = express.Router();
// get all modules

router.get("/modules", (request,response) => {
    const statement = "SELECT module_id, module_name FROM module";
    db.pool.query(statement, (error, result) => {

      response.send(utils.createResult(error,result)) 

    })
})


router.post("/allModulesbyCourse/course_id", (req, res) => {
  const { course_id } = req.body;
  const statement = `
    SELECT module.module_id, module.module_name, course.course_name, course.course_id
    FROM module
    LEFT JOIN course ON module.course_id = course.course_id
    WHERE course.course_id = ?
  `;
  db.pool.execute(statement, [course_id], (error, results) => {
    res.send(utils.createResult(error, results));
  });
});



module.exports = router;