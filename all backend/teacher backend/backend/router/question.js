const express = require("express");
const db = require("../database");
const utils = require("../utils");

const router = express.Router();

router.get("/q1", (request, response) => {
  const teacher_id = request.userInfo.teacher_id;

  const statement = `SELECT 
    SUM(CASE WHEN q.q1 = 1 THEN 1 ELSE 0 END) AS q1_Excellent,
    SUM(CASE WHEN q.q1 = 2 THEN 1 ELSE 0 END) AS q1_Good,
    SUM(CASE WHEN q.q1 = 3 THEN 1 ELSE 0 END) AS q1_Satisfactory,
    SUM(CASE WHEN q.q1 = 4 THEN 1 ELSE 0 END) AS q1_unsatisfactory
FROM feedback f
INNER JOIN question q
    ON f.question_id = q.question_id  where f.feedback_schedule_id = (
select feedback_schedule_id from feedback_schedule where teacher_id=?)`;

  db.pool.execute(statement, [teacher_id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/q2", (request, response) => {
  const teacher_id = request.userInfo.teacher_id;

  const statement = `SELECT 
    SUM(CASE WHEN q.q2 = 1 THEN 1 ELSE 0 END) AS q2_Excellent,
    SUM(CASE WHEN q.q2 = 2 THEN 1 ELSE 0 END) AS q2_Good,
    SUM(CASE WHEN q.q2 = 3 THEN 1 ELSE 0 END) AS q2_Satisfactory,
    SUM(CASE WHEN q.q2 = 4 THEN 1 ELSE 0 END) AS q2_unsatisfactory
FROM feedback f
INNER JOIN question q
    ON f.question_id = q.question_id  where f.feedback_schedule_id = (
select feedback_schedule_id from feedback_schedule where teacher_id=?)`;

  db.pool.execute(statement, [teacher_id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});


router.get("/q3", (request, response) => {
  const teacher_id = request.userInfo.teacher_id;

  const statement = `SELECT 
    SUM(CASE WHEN q.q3 = 1 THEN 1 ELSE 0 END) AS q3_Excellent,
    SUM(CASE WHEN q.q3 = 2 THEN 1 ELSE 0 END) AS q3_Good,
    SUM(CASE WHEN q.q3 = 3 THEN 1 ELSE 0 END) AS q3_Satisfactory,
    SUM(CASE WHEN q.q3 = 4 THEN 1 ELSE 0 END) AS q3_unsatisfactory
FROM feedback f
INNER JOIN question q
    ON f.question_id = q.question_id  where f.feedback_schedule_id = (
select feedback_schedule_id from feedback_schedule where teacher_id=?)`;

  db.pool.execute(statement, [teacher_id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/q4", (request, response) => {
  const teacher_id = request.userInfo.teacher_id;

  const statement = `SELECT 
    SUM(CASE WHEN q.q4 = 1 THEN 1 ELSE 0 END) AS q4_Excellent,
    SUM(CASE WHEN q.q4 = 2 THEN 1 ELSE 0 END) AS q4_Good,
    SUM(CASE WHEN q.q4 = 3 THEN 1 ELSE 0 END) AS q4_Satisfactory,
    SUM(CASE WHEN q.q4 = 4 THEN 1 ELSE 0 END) AS q4_unsatisfactory
FROM feedback f
INNER JOIN question q
    ON f.question_id = q.question_id  where f.feedback_schedule_id = (
select feedback_schedule_id from feedback_schedule where teacher_id=?)`;

  db.pool.execute(statement, [teacher_id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/q5", (request, response) => {
  const teacher_id = request.userInfo.teacher_id;

  const statement = `SELECT 
    SUM(CASE WHEN q.q5 = 1 THEN 1 ELSE 0 END) AS q5_Excellent,
    SUM(CASE WHEN q.q5 = 2 THEN 1 ELSE 0 END) AS q5_Good,
    SUM(CASE WHEN q.q5 = 3 THEN 1 ELSE 0 END) AS q5_Satisfactory,
    SUM(CASE WHEN q.q5 = 4 THEN 1 ELSE 0 END) AS q5_unsatisfactory
FROM feedback f
INNER JOIN question q
    ON f.question_id = q.question_id  where f.feedback_schedule_id = (
select feedback_schedule_id from feedback_schedule where teacher_id=?)`;

  db.pool.execute(statement, [teacher_id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});


module.exports = router;
