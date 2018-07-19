import Knex = require('knex');
import * as moment from 'moment';

export class OrderItemModel {

  public tableName  = 't_order';
  public primaryKey = 't_visit_id';



  list(knex: Knex, limit: number = 20, offset: number = 0) {
    return knex(this.tableName)
      .limit(limit)
      .offset(offset);
  }


  detail(knex: Knex, id: string, limit: number = 50 , offset: number = 0) {
    return knex(this.tableName)
    .column(           
        't_order.f_item_group_id as gid',
        't_order.order_common_name as dname')
    .select(knex.raw(`sum(cast(t_order.order_qty as decimal(8,2))) AS amount`))
    .innerJoin('t_visit','t_visit.t_visit_id','=','t_order.t_visit_id')
    .whereNotIn('t_order.f_order_status_id',[0,3])  
    .where('t_order.t_visit_id',id)
      .orderBy('t_order.f_item_group_id','ASC')
      .groupBy('t_order.order_common_name','t_order.f_item_group_id')
      .limit(limit)
      .offset(offset);
  }

 


}