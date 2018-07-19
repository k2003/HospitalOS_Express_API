import * as Knex from 'knex';

export class Api {
  getKpiList(db: Knex, thYear:string, level: string) {
    return db('b_employee')
      .select('provider', 'employee_login','employee_firstname' )
    //  .where('kpi_year', thYear)
     // .where('kpi_level', level)
      .orderBy('start_date', 'ASC');
  }
}