'use strict';

import * as express from 'express';
import * as moment from 'moment';

import { ProfileModel } from "../models/profile";

const router = express.Router();

const model = new ProfileModel();

// router.get('/profile', (req, res, next) => {
//   let db = req.db;
//   let employee_login = req.query.employee_login;
//   model.getProfile(db,employee_login)
//     .then((results: any) => {
//       res.send({ ok: true, rows: results[0] });
//     })
//     .catch(error => {
//       res.send({ ok: false, error: error })
//     });
// });

router.get('/', (req, res, next) => {

  let db = req.db;
  let employee_login = req.query.employee_login;
  model.getProfile(db,employee_login)
    .then((results: any) => {
      res.send({ ok: true, rows: results });
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    });
});

router.get('/:id', (req, res, next) => {
  let db = req.db;
  let employee_login = req.query.employee_login;

  model.getProfile(db, employee_login)
    .then((results: any) => {
      res.send({ ok: true, detail: results[0] })
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    })
    .finally(() => {
      db.destroy();
    });
});

export default router;