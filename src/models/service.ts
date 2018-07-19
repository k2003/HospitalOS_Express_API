import Knex = require('knex');
import * as moment from 'moment';

export class serviceModel {

  public tableName  = 't_visit';
  public primaryKey = 'employee_login';

  // rawQuery(knex: Knex,id: number) {
  //   let sql:string = `select employee_login from b_employee where employee_login = ?`;
  //   // let sql:string = `select * from b_employee where id = ?`;
  //   return knex.raw(sql,[id]);
  // }

  list(knex: Knex, limit: number = 100, offset: number = 0) {
    return knex(this.tableName)
      .limit(limit)
      .offset(offset);
  }


  detail(knex: Knex, id: string, limit: number = 50 , offset: number = 0) {
    return knex(this.tableName)
    .column('t_visit.t_visit_id','t_visit.visit_vn','t_visit.visit_dx','d.diag_icd10_number','t_visit.f_visit_type_id'
            ,'doc.employee_firstname as fname', 'doc.employee_lastname as lname'
          ,	't_visit_primary_symptom.visit_primary_symptom_main_symptom as mainsymp',
          't_visit_primary_symptom.visit_primary_symptom_current_illness as cc')
            .column(knex.raw('substring(t_visit.visit_begin_visit_time,1,10) as visit_begin_visit_time '))
    .innerJoin('t_patient as tp','t_visit.visit_hn','=','tp.patient_hn')
    .innerJoin('t_person as p','tp.patient_pid','=','p.person_pid')
    .innerJoin('b_employee_bs as b','b.t_person_id','=','p.t_person_id')
    .leftJoin('t_diag_icd10 as d','d.diag_icd10_vn','=','t_visit.t_visit_id')
    .leftJoin('b_employee as doc','d.diag_icd10_staff_doctor','=','doc.b_employee_id')
    .leftJoin('t_visit_primary_symptom','t_visit_primary_symptom.t_visit_id','=','t_visit.t_visit_id')
    .where('t_visit.f_visit_status_id','3')
    // .whereNot('t_visit.f_visit_status_id','1')
    .where('d.diag_icd10_active','1')
    .where('d.f_diag_icd10_type_id','1')
    .whereNot('t_visit_primary_symptom.visit_primary_symptom_main_symptom','')
      .where('b.employee_login', id)
      .orderBy('t_visit.visit_begin_visit_time', 'DESC')
      .limit(limit)
      .offset(offset);
  }

 


}