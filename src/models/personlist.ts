import Knex = require('knex');
import * as moment from 'moment';
export class personlistModel {

  public tableName  = 't_patient';
  public primaryKey = 'patient_hn';

  list(knex: Knex, limit: number = 5, offset: number = 0) {
    return knex(this.tableName)
    .column(
      't_patient.patient_hn'
      ,'t_patient.patient_pid'
      ,'t_patient.patient_firstname'
      ,'t_patient.patient_lastname'
      ,'t_patient.patient_birthday'
      ,'t_patient.f_sex_id'
      ,'t_patient.f_patient_nation_id'
  )
    .column(knex.raw('case when t_patient.picture_profile  IS NOT NULL then	regexp_replace(encode(t_patient.picture_profile,\'base64\'),\'\r|\n\',\'\',\'g\') else null end 	as picture_profile'))
      .where('t_patient.patient_active','=','1')
      .limit(limit)
      .offset(offset);
  }
  save(knex: Knex, datas: any) {
    return knex(this.tableName)
      .insert(datas);
  }


  update(knex: Knex, id: string, datas: any) {
    return knex(this.tableName)
      .where(this.primaryKey, id)
      .update(datas);
  }

  hnx(knex: Knex, hn: string ,limit: number = 10 ,offset: number = 0) {
   
 return knex(this.tableName)
 .column(
    't_patient.patient_hn'
    ,'t_patient.patient_pid'
    ,'t_patient.patient_firstname'
    ,'t_patient.patient_lastname'
    ,'t_patient.patient_birthday'
    ,'t_patient.f_sex_id'
)
  .column(knex.raw('case when t_patient.picture_profile  IS NOT NULL then	regexp_replace(encode(t_patient.picture_profile,\'base64\'),\'\r|\n\',\'\',\'g\') else null end 	as picture_profile'))
   .where('t_patient.patient_active','=','1')
  // .where('t_patient.patient_hn','ilike',id)
  .where('t_patient.patient_hn', 'ilike', `%${hn || ''}%`)
 // .where('t_patient.patient_hn', 'like', `%${id}%`)
  //.whereRaw('t_patient.patient_hn ilike \'%??%\'', [id])
  
  .limit(limit)
  .offset(offset);
 

  }
  saveImage(knex: Knex, picture_profile:any,patient_hn: any) {
 //   return knex(this.tableName)
  //   .update('picture_profile',picture_profile)
     //knex.raw(`select decode(`[picture_profile]`,'base64')`))  //decode('picture_profile', 'base64');
     // update  t_patient set picture_profile =  decode('picture_profile', 'base64') where t_patient.patient_hn= patient_hn
 //   .where('patient_hn', patient_hn);
    // return (knex.raw(`update  t_patient set picture_profile = (select decode('picture_profile',\'base64\')) where t_patient.patient_hn= patient_hn`))
  
    // update =
    // @knex("actions")
    // .where(action: action)
    // .update({weight: weight})
    // .toString()  
    //firstName: raw("'Jenni' || 'fer'"),
   return knex.raw(`update t_patient set picture_profile = (select decode( ?,'base64')) where patient_hn = ?`, [ patient_hn,picture_profile]);
   //28192562 pass post save-image 
   
   //knex.raw('update posts set hits = (hits + ?) where id = ?', [1, postId]);
  //  return knex.raw(`select decode('picture_profile','base64') = ?`, [ picture_profile]);
  }

  ipd(knex: Knex, limit: number = 40, offset: number = 0) {
    return knex(this.tableName)
    .column('t_patient.patient_hn'
    ,'t_visit.visit_vn'
    ,'t_patient.patient_firstname'
    ,'t_patient.patient_lastname'
    ,'t_visit.visit_patient_age'
    ,'t_visit.visit_dx'
    ,'t_visit.visit_bed'
    ,'b_employee.employee_firstname'
    ,'b_employee.employee_lastname'
  )
  .column(knex.raw('case when t_patient.picture_profile  IS NOT NULL then	regexp_replace(encode(t_patient.picture_profile,\'base64\'),\'\r|\n\',\'\',\'g\') else null end 	as picture_profile'))
  .innerJoin('t_visit','t_visit.t_patient_id','=','t_patient.t_patient_id')
  .leftJoin('b_visit_ward ','b_visit_ward.b_visit_ward_id','=','t_visit.b_visit_ward_id')
  .leftJoin('b_employee','b_employee.b_employee_id','=','t_visit.visit_patient_self_doctor')
  .where('t_visit.f_visit_type_id','=','1')
  .where('t_visit.visit_financial_discharge_time','=','') 
  .where('t_visit.visit_ipd_discharge_date_time','=','') 
  .orderBy ('b_visit_ward.visit_ward_description','t_visit.visit_bed')   
  .limit(limit)
  .offset(offset);
  }
  // nrd(knex: Knex) {
  //   let sql = `SELECT json_build_array(thai,nrd,nopic) FROM nation_pic`;
  //   return knex.raw(sql)
  // }
 


  
}