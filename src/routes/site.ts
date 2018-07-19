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

export default router;