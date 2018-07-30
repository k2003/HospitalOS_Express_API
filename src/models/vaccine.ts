import Knex = require('knex');
import * as moment from 'moment';

export class vaccineModel {

  public tableName  = 't_health_epi_detail';
  public primaryKey = 't_patient_id';



  list(knex: Knex, limit: number = 100, offset: number = 0) {
    return knex(this.tableName)
      .limit(limit)
      .offset(offset);
  }


  detail(knex: Knex, id: string, limit: number = 50 , offset: number = 0) {
    return knex(this.tableName)
    .column(           
    `t_health_epi_detail.t_patient_id`
    ,`b_health_epi_group.health_epi_group_description as vacc,`
    ,`doc.employee_firstname` , `doc.employee_lastname `)
    .column(knex.raw('substr(t_health_epi_detail.record_date_time,1,10) as recdate'))
   
    .leftJoin('b_health_epi_group','t_health_epi_detail.b_health_epi_set_id','=','b_health_epi_group.b_health_epi_group_id')
    .leftJoin('b_employee as doc','t_health_epi_detail.health_epi_detail_staff_record','=','doc.b_employee_id')
    
    .where('t_health_epi_detail.health_epi_detail_active','1')
       .where('t_health_epi_detail.t_patient_id',id)
      .orderBy('t_health_epi_detail.record_date_time', 'asc')
      .limit(limit)
      .offset(offset);
  }

 


}