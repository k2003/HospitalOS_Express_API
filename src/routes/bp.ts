'use strict';

import * as express from 'express';
import * as moment from 'moment';

import { bpModel } from "../models/bp";

const router = express.Router();

const model = new bpModel();




router.get('/', (req, res, next) => {

  let db = req.db;

  model.list(db)
    .then((results: any) => {
      res.send({ ok: true, rows: results });
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    });
});




router.get('/bmi/:id', (req, res, next) => {
  let id = req.params.id;
  let db = req.db;

  model.bmi(db, id)
    .then((results: any) => {
    //  res.send({ ok: true, detail: results })
     // res.send({ ok: true, detail: results })
      res.send({ ok: true, bmi: results });
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    })
    .finally(() => {
      db.destroy();
    });
});
router.get('/detail/:id', (req, res, next) => {
  let id = req.params.id;
  let db = req.db;

  model.detail(db, id)
    .then((results: any) => {
    //  res.send({ ok: true, detail: results })
     // res.send({ ok: true, detail: results })
      res.send({ ok: true, detail: results });
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    })
    .finally(() => {
      db.destroy();
    });
});
router.get('/chart/:id', (req, res, next) => {
  let id = req.params.id;
  let db = req.db;

  model.chart(db, id)
    .then((results: any) => {

      res.send({ ok: true, chart: results });
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    })
    .finally(() => {
      db.destroy();
    });
});



export default router;