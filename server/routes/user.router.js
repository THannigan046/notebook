const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// TODO: add router.post for tasks
router.post('/tasks/:id',(req, res) => {
  const taskName = req.body.taskName;
  const daysPerWeek = req.body.daysPerWeek;

  const userId = req.params.id;

  const queryText = `INSERT INTO "tasks" (name, days_per_week, user_id) VALUES ($1, $2, $3) RETURNING *`;

  pool.query(queryText, [taskName, daysPerWeek, userId])
  .then((result) => {
    res.send(result.rows[0]);
  })
  .catch((err) => {
    console.log('Tasks post request failed', err);
    res.sendStatus(500);
  })
})

router.put(`/tasks/:id`, (req, res) => {
  const id = req.params.id;
  const queryText = `UPDATE "tasks" SET "selected_day" = $1 WHERE "user_id" = $2 RETURNING *`;
  pool
    .query(queryText, [req.body.selectedDay, id])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.log('Tasks put request failed', err);
      res.sendStatus(500);
    });
})

router.get('/tasks/:id', (req, res) => {
  const id = req.params.id;

  const queryText = `SELECT * FROM "tasks" WHERE "user_id" = $1`;
  pool
    .query(queryText, [id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Tasks get request failed', err);
      res.sendStatus(500);
    });
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
