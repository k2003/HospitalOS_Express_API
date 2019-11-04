'use strict';
import * as express from 'express';
import { SiteModel } from "../models/site";
const router = express.Router();
const model = new SiteModel();

router.get('/', (req, res, next) => {

  let db = req.db;

  model.getSite(db)
    .then((results: any) => {
      res.send({ Connectdb: true, HospitalOS: results });
    })
    .catch(error => {
      res.send({ ErrorConnection: false, PleaseCheck_env: error })
    });
});
router.post('/status', (req, res, next) => {
  res.send({ 
      ok: true, 
      status: 'OK', 
      vesrion: '0.3' 
  });
});
router.get('/nrd', (req, res, next) => {
  let db = req.db;
  model.nrd(db)
    .then((results: any) => {
      res.send({ ok: true, rows: results });
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    });
});

export default router;