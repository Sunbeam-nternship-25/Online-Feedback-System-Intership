const express = require("express");
const db = require("../database");
const utils = require("../utils");
const config = require("../config");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post('/login', (request, response) => {
  const { email, password } = request.body;

  const statement = `select teacher_id
    from teacher where email = ? and password = ?`;

  db.pool.query(
    statement,
    [email, utils.encryptPassword(password)],
    (error, teachers) => {
      if (error) {
        response.send(utils.createError(error));
      } else {
        if (teachers.length == 0) {
          response.send(utils.createError("User does not exist"));
        } else {
          console.log(teachers);
          const { teacher_id } = teachers[0];

          const payload = {
            teacher_id,
          };

          try {
            const token = jwt.sign(payload, config.secret);
            response.send(
              utils.createSucess({
                token,
                teacher_id,
              })
            );
          } catch (ex) {
            response.send(utils.createError(ex));
          }
        }
      }
    }
  );
});

router.post('/register', (request, response) => {
  const { first_name, last_name, email, password } = request.body;
 

  const statement = `insert into teacher
    (first_name,last_name,email,password)
    values(?,?,?,?)`;

  db.pool.execute(
    statement,
    [first_name, last_name, email, utils.encryptPassword(password)],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

module.exports = router;
