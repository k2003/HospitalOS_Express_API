import Knex = require('knex');
import * as moment from 'moment';

export class ContactModel {

  public tableName  = 'b_employee';
  public primaryKey = 'employee_login';

  // rawQuery(knex: Knex,id: number) {
  //   let sql:string = `select employee_login from b_employee where employee_login = ?`;
  //   // let sql:string = `select * from b_employee where id = ?`;
  //   return knex.raw(sql,[id]);
  // }

  list(knex: Knex, limit: number = 20, offset: number = 0) {
    return knex(this.tableName)
    .where('b_employee.employee_active','=','1')
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

  detail(knex: Knex, id: string) {
    return knex(this.tableName)

    .column('b_employee.b_employee_id'
    ,'t_patient.t_patient_id'
    ,'t_person.t_person_id'
    ,'t_patient.patient_hn'
    ,'b_employee.employee_login'
    ,'b_employee.employee_password'
    ,'f_provider_type.description'
    ,'t_person.person_firstname'
    ,'t_person.person_lastname'
    ,'t_person.person_birthday'
    ,'t_person.person_pid'
    ,'t_patient.patient_patient_email as email'
    ,'t_patient.patient_patient_mobile_phone as m_phone'
    ,'pat_address.address'
    ,'b_employee.provider'
    ,'t_patient.latitude'
    ,'t_patient.longitude')
  .column(knex.raw('case when t_patient.picture_profile  IS NOT NULL then	regexp_replace(encode(t_patient.picture_profile,\'base64\'),\'\r|\n\',\'\',\'g\') else null end 	as picture_profile'))
  .innerJoin('t_person','b_employee.t_person_id','=','t_person.t_person_id')
  .leftJoin('f_provider_type','b_employee.f_provider_type_id','=','f_provider_type.f_provider_type_id')
  .leftJoin('f_employee_authentication','b_employee.f_employee_authentication_id','=','f_employee_authentication.f_employee_authentication_id')
  .leftJoin('t_patient','t_person.person_pid','=','t_patient.patient_pid')
  .leftJoin('pat_address','t_patient.t_patient_id','=','pat_address.t_patient_id')
  .where('t_patient.patient_active','=','1')
  .where('b_employee.employee_active','=','1')
   .where('b_employee.employee_login', id)
   .limit(1);
  }

  // remove(knex: Knex, id: string) {
  //   return knex(this.tableName)
  //     .where(this.primaryKey, id)
  //     .del();
  // }

}