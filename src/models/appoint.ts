import Knex = require('knex');
import * as moment from 'moment';

export class appointModel {

  public tableName  = 't_patient_appointment';
  public primaryKey = 't_patient_id';



  list(knex: Knex, limit: number = 20, offset: number = 0) {
    return knex(this.tableName)
      .limit(limit)
      .offset(offset);
  }


  detail(knex: Knex, id: string, limit: number = 50 , offset: number = 0) {
    return knex(this.tableName)
    .column(           
    't_patient_appointment.patient_appointment_date' 
    ,'t_patient_appointment.patient_appointment_time' 
    ,'d.service_point_description as service_point'
    ,'doc.employee_firstname' ,'doc.employee_lastname' 
    ,'t_patient_appointment.patient_appointment','t_patient_appointment.patient_appointment_status' )    
    .innerJoin('t_patient as tp','t_patient_appointment.t_patient_id','=','tp.t_patient_id')
    .leftJoin('b_service_point as d','d.b_service_point_id','=','t_patient_appointment.patient_appointment_servicepoint')
    .leftJoin('b_employee as doc','t_patient_appointment.patient_appointment_doctor','=','doc.b_employee_id')
    .where('t_patient_appointment.patient_appointment_active','1')
       .where('t_patient_appointment.t_patient_id',id)
      .orderBy('t_patient_appointment.patient_appointment_date', 'asc')
      .limit(limit)
      .offset(offset);
  }

 


}