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

  detail(knex: Knex, id: string, limit: number = 25 , offset: number = 0) {
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
  chart(knex: Knex, id: string, limit: number = 10 , offset: number = 0) {
    return knex(this.tableName)
    .column(knex.raw('distinct t_visit_vital_sign.record_date'))
    .column(knex.raw(`substring(visit_vital_sign_blood_presure,1,(position(\'/\' in visit_vital_sign_blood_presure)) -1)::int as s`))
    .column(knex.raw(`substring(visit_vital_sign_blood_presure,(position(\'/\' in visit_vital_sign_blood_presure)) +1)::int as d `))
    .column(knex.raw(`(t_visit_vital_sign.visit_vital_sign_respiratory_rate)::int as res`))
    .column(knex.raw(`(t_visit_vital_sign.visit_vital_sign_heart_rate)::int as pulse`))
    .where ('t_visit_vital_sign.visit_vital_sign_active','1') 
    .whereNot('t_visit_vital_sign.visit_vital_sign_blood_presure','')
    .whereNot('t_visit_vital_sign.visit_vital_sign_respiratory_rate','')
    .whereNot('t_visit_vital_sign.visit_vital_sign_heart_rate','')
    .where('t_visit_vital_sign.t_patient_id',id)    
    .orderBy('t_visit_vital_sign.record_date','DESC')
      .limit(limit)      
      .offset(offset);

    


     
  //   .column(`g.t_patient_id`  )
  // .column(knex.raw('json_agg(g.record_date) as record_date'))
  // .column(knex.raw('json_agg(g.s) as s'))
  // .column(knex.raw('json_agg(g.d) as d')) 
  // .innerJoin(knex.raw(`(select t_visit_vital_sign.t_patient_id  ,t_visit_vital_sign.record_date   ,substring(visit_vital_sign_blood_presure,1,(position( \'/\' in visit_vital_sign_blood_presure)) -1)::int as s  , substring(visit_vital_sign_blood_presure,(position(   \'/\' in visit_vital_sign_blood_presure)) +1)::int as d   FROM t_visit_vital_sign   where t_visit_vital_sign.visit_vital_sign_blood_presure is not null   order By t_visit_vital_sign.record_date desc ) as g`) , function() {
  //       this.on('t_visit_vital_sign.t_patient_id', '=', 'g.t_patient_id').andOn('t_visit_vital_sign.record_date', '=', 'g.record_date')
  //  })
     
  //   .where ('t_visit_vital_sign.visit_vital_sign_active','1') 
  //   .where('t_visit_vital_sign.t_patient_id',id)    
  //    .groupBy('g.t_patient_id')
  //     .limit(limit)      
  //     .offset(offset);
     
     // query = query.replace(/\n/g, '').replace(/\t/g, ' ');
     //knex.raw("/")

   
  }


  bmi(knex: Knex, id: string, limit: number = 1 , offset: number = 0) {
    return knex(this.tableName)
    .column(           
    't_visit_vital_sign.visit_vital_sign_weight as weight' 
    ,'t_visit_vital_sign.visit_vital_sign_height as height' 
    ,'t_visit_vital_sign.visit_vital_sign_bmi as bmi'
    ,'t_visit_vital_sign.record_date')
  .innerJoin(knex.raw(`(select Max(t_visit_vital_sign.record_date) as record_date ,t_visit_vital_sign.t_patient_id FROM t_visit_vital_sign  WHERE t_visit_vital_sign.visit_vital_sign_bmi is not null group by t_visit_vital_sign.t_patient_id) as bmi`) , function() {
      this.on('t_visit_vital_sign.record_date', '=', 'bmi.record_date').andOn('t_visit_vital_sign.t_patient_id', '=', 'bmi.t_patient_id')
          })
    .where('t_visit_vital_sign.t_patient_id',id)     
      .limit(limit)
      .offset(offset);
  }
}