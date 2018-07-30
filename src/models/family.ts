import Knex = require('knex');
import * as moment from 'moment';

export class familyModel {

  public tableName  = 't_patient';
  public primaryKey = 't_patient_id';

  // rawQuery(knex: Knex,id: number) {
  //   let sql:string = `select employee_login from b_employee where employee_login = ?`;
  //   // let sql:string = `select * from b_employee where id = ?`;
  //   return knex.raw(sql,[id]);
  // }

  list(knex: Knex, limit: number = 20, offset: number = 0) {
    return knex(this.tableName)
      .limit(limit)
      .offset(offset);
  }


  detail(knex: Knex, id: string, limit: number = 3 , offset: number = 0) {
    return knex(this.tableName)
    .column('t_patient.patient_father_firstname','t_patient.patient_father_lastname','t_patient.patient_father_pid'
            ,'t_patient.patient_mother_firstname','t_patient.patient_mother_lastname','t_patient.patient_mather_pid'
            ,'t_patient.patient_couple_firstname','t_patient.patient_couple_lastname','t_patient.patient_couple_pid')

            .where(this.primaryKey, id)

      .limit(limit)
      .offset(offset);
  }

 


}