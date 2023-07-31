const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// This route *should* return the logged in users pets
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('/pet GET route');
    // Is the user logged in?
    console.log('is authenticated?', req.isAuthenticated());
    // Who is the user?
    console.log('user', req.user);

    // if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "pets" WHERE "user_id" = $1`;
        pool.query(queryText, [req.user.id]).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    // }
    // else {
        // res.sendStatus(403);
    // }
});

// This route *should* add a pet for the logged in user
router.post('/', rejectUnauthenticated, (req, res) => {

    const sqlText = `
     INSERT INTO "pets" (name, user_id)
     VALUES ($1, $2)`;

     pool.query(sqlText, [req.body.name, req.user.id])
     .then(result => {
        res.sendStatus(201)
     }).catch(err => {
        res.sendStatus(500)
     })
    // console.log('/pet POST route');
    // console.log(req.body);
    // console.log('is authenticated?', req.isAuthenticated());
    // console.log('user', req.user);
    // res.sendStatus(200);

});

module.exports = router;