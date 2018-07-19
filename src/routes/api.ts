
import * as express from 'express';
import { Api } from '../models/api';

const apiModel = new Api();

const router = express.Router();

router.get('/', (req,res,next) => {
  res.send({title: 'Express'});
});

router.get('/kpi/list', (req, res, next) => {
  
  let db = req.db;
  let thYear = req.query.year;

  let level = req.query.level === '0' ? 'ประเทศ' : req.query.level === '1' ? 'เขต' : req.query.level === '2' ? 'จังหวัด' : 'กรม';

  apiModel.getKpiList(db, thYear, level)
    .then(result => {
      res.send({ ok: true, rows: result });
    })
    .catch(error => {
      res.send({ ok: false, message: error.message });
    });

});

export default router;