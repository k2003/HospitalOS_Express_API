import Knex = require('knex');
import * as moment from 'moment';
import * as multiline from 'multiline'

export class bpModel {

  public tableName  = 't_visit_vital_sign';
  public primaryKey = 't_patient_id';



  list(knex: Knex, limit: number = 20, offset: number = 0) {
    return knex(this.tableName)
      .limit(limit)
      .offset(offset);
  }


  detail(knex: Knex, id: string, limit: number = 30 , offset: number = 0) {
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
  chart(knex: Knex, id: string, limit: number = 30 , offset: number = 0) {

      var query = multiline.stripIndent(function () {/*
SELECT
r.t_patient_id,
 json_agg(r.record_date) as record_date,
 json_agg(r.s) as s,
json_agg(r.d) as d
FROM (
select
t_visit_vital_sign.t_patient_id
,t_visit_vital_sign.record_date
 ,substring(visit_vital_sign_blood_presure,1,(position('/' in visit_vital_sign_blood_presure)) -1) as s--ค่าความดันช่วงบน
, substring(visit_vital_sign_blood_presure,(position('/' in visit_vital_sign_blood_presure)) +1)as d --ค่าความดันช่วงล่าง

FROM t_visit_vital_sign
     where t_visit_vital_sign.visit_vital_sign_active ='1'
    and t_visit_vital_sign.visit_vital_sign_blood_presure<>''
    --and t_visit_vital_sign.t_patient_id ='206108597153171662'
      order By t_visit_vital_sign.record_date
) AS r
where r.t_patient_id ='206108597153171662'
GROUP BY r.t_patient_id
        */});
      
      query = query.replace(/\n/g, '').replace(/\t/g, ' ');
      
      return knex.raw(query, [])
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