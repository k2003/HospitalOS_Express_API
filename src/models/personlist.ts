import Knex = require('knex');
import * as moment from 'moment';
export class personlistModel {

  public tableName  = 't_patient';
  public primaryKey = 'patient_hn';

  list(knex: Knex, limit: number = 20, offset: number = 0) {
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

  hn(knex: Knex, id: string ,limit: number = 1 ,offset: number = 0) {
   
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
  .where('t_patient.patient_hn', id)
  .limit(limit)
  .offset(offset);
 

  }

}