import Knex = require('knex');
import * as moment from 'moment';

export class labNcdModel {

  public tableName  = 't_result_lab';
  public primaryKey = 't_patient_id';



  list(knex: Knex, limit: number = 50, offset: number = 0) {
    return knex(this.tableName)
      .limit(limit)
      .offset(offset);
  }


  detail(knex: Knex, id: string, limit: number = 150 , offset: number = 0) {
    return knex(this.tableName)
    .column(knex.raw('substring(t_visit.visit_begin_visit_time,1,10) as datevisit'))
    .column('b_item_lab_ncd_std.b_item_lab_ncd_std_id as ncdid'
        ,'t_visit.visit_vn'
        ,'t_result_lab.result_lab_name as tlname'
        ,'t_result_lab.result_lab_value as labresult'
        ,'t_result_lab.result_lab_unit as unit'
        ,'t_visit.visit_dx')
    .innerJoin('t_visit' , 't_visit.t_visit_id' ,'=' ,'t_result_lab.t_visit_id' ) 
    .innerJoin('b_item_map_lab_ncd','t_result_lab.b_item_id','=','b_item_map_lab_ncd.b_item_id')
    .innerJoin('b_item_lab_ncd_std','b_item_map_lab_ncd.b_item_lab_ncd_std_id','=','b_item_lab_ncd_std.b_item_lab_ncd_std_id')
    .where({'t_result_lab.result_lab_active':'1','t_visit.f_visit_status_id':'3',
     'b_item_map_lab_ncd.active':'1','b_item_lab_ncd_std.active':'1'})
    .whereIn('b_item_lab_ncd_std.b_item_lab_ncd_std_id', ['ncd201000000000004' 
     ,'ncd201000000000002','ncd201000000000003','ncd201000000000006','ncd201000000000008'
     ,'ncd201000000000007','ncd201000000000009','ncd201000000000010','ncd201000000000030'])
  //  .whereRaw(`t_result_lab.result_lab_'value ~'^([0-9]+\.?[0-9]*|\.[0-9]+)$'`)
    .where('t_result_lab.result_lab_value', '~',`^([0-9]+\.?[0-9]*|\.[0-9]+)$`)
    .where('t_visit.t_patient_id',id)
      .orderBy('t_visit.visit_begin_visit_time','DESC')
      .limit(limit)
      .offset(offset);
  }

}