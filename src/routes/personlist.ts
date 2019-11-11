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
      res.send({ rows: results });
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    });
});

router.get('/hnx', (req, res, next) => {
  //let id = req.params.id;
  let hn = req.query.id;
  let db = req.db;
  model.ipd(db, hn)
  //  .then((results: any) => {
    .then((results: Array<any>) => {
      res.send( results );
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    })
    .finally(() => {
      db.destroy();
    });
});
router.get('/hn', async (req, res) => {  // ใช้ async function
  try {
    let db = req.db
   // let rows = await db('t_person') // ใช้ await เพื่อรอผลรับ
   let rows
   if(req.query.hn){
     rows = await db('t_patient')
     .column(
      't_patient.patient_hn'
      ,'t_patient.patient_pid'
      ,'t_patient.patient_firstname'
      ,'t_patient.patient_lastname'
      ,'t_patient.patient_birthday'
      ,'t_patient.f_sex_id'
      ,'t_patient.f_patient_nation_id'
  )
  .column(db.raw('case when t_patient.picture_profile  IS NOT NULL then	regexp_replace(encode(t_patient.picture_profile,\'base64\'),\'\r|\n\',\'\',\'g\') else null end 	as picture_profile'))
  .where('t_patient.patient_active','=','1')
     .whereFRaw(`t_patient.picture_profile IS NULL`)
     .where('patient_hn', 'ilike', `%${req.query.hn || ''}%`)
     //.where('person_hcis','like',req.query.hn)
   } else {
    // rows = await db('t_patient')
    res.send({ false:'ไม่พบข้อมูลที่ค้นหา <_>' })
   }
    //console.log(item);
    res.send( rows)
     // ok: true,       // ส่ง status 
      // patient_hn: rows,  // ส่งค่ากลับ
    
  } catch (e) {
      res.send({ ok: false, error: e.message })
  }
});
// router.put()(knex: Knex, userId: any, password: any) {
//   return knex('user')
//     .where('id', userId)
//     .update({
//       password: password
//     });
// }
router.post('/hn/save', async (req, res) => {
  let db = req.db
  // UPDATE student SET fname=?, lname=? WHERE id = 1
  await db('t_patient').where({patient_hn: req.body.patient_hn}).update({
    picture_profile: req.body.picture_profile
  })
  res.send({ok: true})
})

router.post('/hn/save-image', async (req, res, next) => {
  let db = req.db;
  let patient_hn = req.body.patient_hn;
  let picture_profile = req.body.picture_profile;
  model.saveImage(db, patient_hn, picture_profile)
    .then((rows: any) => {
      res.send({ ok: true });
    })
    .catch((error: any) => {
      console.log(error);
      res.send({ ok: false, error: error.message });
    });
});

router.post('/hn/saveimage', async (req, res, next) => {
  let db = req.db;
  let patient_hn = req.body.patient_hn;
  let picture_profile = req.body.picture_profile;
  model.saveImage(db, patient_hn, picture_profile)
  .then((rows: any) => {
    res.send({ ok: true });
  })
    

});
router.get('/ipd', (req, res, next) => {
  let db = req.db;
  model.ipd(db)
    .then((results: any) => {
      res.send({ ok: true, rows: results });
   //   res.send({ rows: results });
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    });
});


export default router;
