import Knex = require('knex');
import * as moment from 'moment';

export class ContactModel {

  public tableName  = 'b_employee_bs';
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
      .where(this.primaryKey, id);
  }

  remove(knex: Knex, id: string) {
    return knex(this.tableName)
      .where(this.primaryKey, id)
      .del();
  }

}