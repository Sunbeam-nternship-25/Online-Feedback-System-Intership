const express = require("express");
const db = require("../database");
const utils = require("../utils");

const router = express.Router();

router.get("/allFeedback", (request, response) => {
  const statement = `select * from feedback`;

  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/feedbackinfo", (request, response) => {
  const teacher_id = request.userInfo.teacher_id;

  const statement = `select 
    module_type.module_type_name,
    module.module_name,
    course.course_name,
    course_group.group_name,
    teacher.first_name,
    teacher.last_name,
    fs.start_time,
    fs.end_time
from feedback_schedule fs
INNER JOIN module ON fs.module_id = module.module_id
INNER JOIN module_type ON fs.module_type_id = module_type.module_type_id
INNER JOIN course_group ON fs.group_id = course_group.group_id
INNER JOIN teacher ON fs.teacher_id = teacher.teacher_id
INNER JOIN course ON fs.course_id = course.course_id 
where fs.teacher_id = ? 
and fs.is_active = 1`;

  db.pool.execute(statement, [teacher_id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/countfeedbacksubmitted", (request, response) => {
  const teacher_id = request.userInfo.teacher_id;

 
  const statement = `
    SELECT COUNT(f.student_id) AS count
    FROM feedback f
    JOIN feedback_schedule fs ON f.feedback_schedule_id = fs.feedback_schedule_id
    WHERE fs.teacher_id = ?
  `;

  db.pool.execute(statement, [teacher_id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});


router.get("/countfeedbackRemaing",(request,response)=>{
  const teacher_id = request.userInfo.teacher_id

  const statement = `select distinct course_id ,
  group_id from feedback_schedule 
  where teacher_id =?`


   db.pool.execute(statement, [teacher_id], (error, result) => {
    if(error){
      response.send(utils.createError(error))
    }
    else{
      const course_id = result[0].course_id
      const group_id = result[0].group_id

      const allStudentstatement=`select count(student_id) as total
       from student where course_id=? and group_id=?;`

          db.pool.execute(allStudentstatement, [course_id,group_id], (error, result) => {
          if(error){
      response.send(utils.createError(error))
    }
    else{
    
      const total = result[0].total
 
  const submittedstatement = `
    SELECT COUNT(f.student_id) AS count
    FROM feedback f
    JOIN feedback_schedule fs ON f.feedback_schedule_id = fs.feedback_schedule_id
    WHERE fs.teacher_id = ?
  `;

       db.pool.execute(submittedstatement, [teacher_id], (error, result) => {
          if(error){
      response.send(utils.createError(error))
    }
    else{
         const remainingStudent = total - result[0].count
         response.send(utils.createSucess(remainingStudent))

    }
    })

    }})

  }
  });
})







module.exports = router;
