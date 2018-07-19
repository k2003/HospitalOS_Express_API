import Knex = require('knex');
import * as moment from 'moment';

export class bpModel {

  public tableName  = 't_visit_vital_sign';
  public primaryKey = 't_patient_id';



  list(knex: Knex, limit: number = 20, offset: number = 0) {
    return knex(this.tableName)
      .limit(limit)
      .offset(offset);
  }


  detail(knex: Knex, id: string, limit: number = 20 , offset: number = 0) {
    return knex(this.tableName)
    .column(           
    't_visit_vital_sign.t_patient_id' 
    ,'t_visit_vital_sign.record_date' 
    ,'t_visit_vital_sign.visit_vital_sign_blood_presure as bp','t_visit_vital_sign.visit_vital_sign_temperature as temp','t_visit_vital_sign.visit_vital_sign_heart_rate as pulse'
    ,'t_visit_vital_sign.visit_vital_sign_respiratory_rate as res')
    .select(knex.raw(`substring(visit_vital_sign_blood_presure,1,(position('/' in visit_vital_sign_blood_presure)) -1) as s`))
    .select(knex.raw(`substring(visit_vital_sign_blood_presure,(position('/' in visit_vital_sign_blood_presure)) +1) as  d`))
     .where('t_visit_vital_sign.visit_vital_sign_active','1')
    .whereNot('t_visit_vital_sign.visit_vital_sign_blood_presure','')
    .where('t_visit_vital_sign.t_patient_id',id)
      .orderBy('t_visit_vital_sign.record_date','DESC')
      .limit(limit)
      .offset(offset);
  }

 


}