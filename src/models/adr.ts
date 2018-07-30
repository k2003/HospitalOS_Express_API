import Knex = require('knex');
import * as moment from 'moment';

export class adrModel {

  public tableName  = 't_patient_drug_allergy';
  public primaryKey = 't_patient_id';



  list(knex: Knex, limit: number = 20, offset: number = 0) {
    return knex(this.tableName)
      .limit(limit)
      .offset(offset);
  }


  detail(knex: Knex, id: string, limit: number = 50 , offset: number = 0) {
    return knex(this.tableName)
    .column(           
    `b_item_drug_standard.item_drug_standard_description AS drug,`
    ,`t_patient_drug_allergy.drug_allergy_symtom  AS adr,`
    ,`doc.employee_firstname` , `doc.employee_lastname `)
    .column(knex.raw('substring(t_patient_drug_allergy.record_date_time,1,10) AS recdate'))
    .innerJoin('b_item_drug_standard','t_patient_drug_allergy.b_item_drug_standard_id','=','b_item_drug_standard.b_item_drug_standard_id')

    .leftJoin('b_employee as doc','t_patient_drug_allergy.pharma_assess_id','=','doc.b_employee_id')
    .where('t_patient_drug_allergy.active','1')
       .where('t_patient_drug_allergy.t_patient_id',id)
      .orderBy('t_patient_drug_allergy.record_date_time', 'asc')
      .limit(limit)
      .offset(offset);
  }

 


}