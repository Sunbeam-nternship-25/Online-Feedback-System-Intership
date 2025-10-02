const express = require("express");
const db = require("../database");
const utils = require("../utils");

const router = express.Router();

router.post("/groupbycourse/course_id", (request, response) => {

     const {course_id} = request.body
      const groupstatement = `select group_name,group_id from course_group where course_id =?`;
      db.pool.execute(groupstatement, [course_id], (error, result) => {
        response.send(utils.createResult(error, result));
      });
    })
  

router.get("/allCourseGroup", (request, response) => {
  const statement = `
    SELECT g.group_id, g.group_name, c.course_name 
    FROM course_group g
    INNER JOIN course c ON c.course_id = g.course_id
  `;
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});



router.post("/insertCourse", (request, response) => {
  const { group_name, course_name } = request.body;

  const selectStatement = `select course_id from course where course_name=?`;

  db.pool.execute(selectStatement, [course_name], (error, result) => {
    if (error) {
      response.send(utils.createError(error));
    } else {
      const course_id = result[0].course_id;
      const statement = `insert into course_group(group_name,course_id)values (?,?) `;

      db.pool.execute(statement, [group_name, course_id], (error, result) => {
        response.send(utils.createResult(error, result));
      });
    }
  });
});

router.put("/updateCourseGroup", (request, response) => {
  const { group_name, group_id } = request.body;

  const statement = `update course_group set group_name = ? where group_id = ?
    `;

  db.pool.execute(statement, [group_name, group_id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.delete("/deleteCourseGroup", (request, response) => {
  const { group_id } = request.body;
  const statement = `delete from course_group where group_id = ?`;

  db.pool.execute(statement, [group_id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

module.exports = router;
