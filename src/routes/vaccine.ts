'use strict';
import * as express from 'express';
import * as moment from 'moment';
import { vaccineModel } from "../models/vaccine";
const router = express.Router();
const model = new vaccineModel();
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
router.get('/detail/:id', (req, res, next) => {
  let id = req.params.id;
  let db = req.db;
  model.detail(db, id)
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