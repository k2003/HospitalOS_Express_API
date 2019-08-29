'use strict';
import * as express from 'express';
import * as moment from 'moment';
import { personlistModel } from "../models/personlist";
const router = express.Router();
const model = new personlistModel();
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

router.get('/hn/:id', (req, res, next) => {
  let id = req.params.id;
  let db = req.db;

  model.hn(db, id)
    .then((results: any) => {

      res.send({ ok: true, detail: results });
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    })
    .finally(() => {
      db.destroy();
    });
});

export default router;