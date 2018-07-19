import Knex = require('knex');
import * as moment from 'moment';

export class LoginModel {
  doLogin(knex: Knex, username: string, password: string) {
    return knex('b_employee')
      .where({
        employee_login: username,
        employee_password: password
      })
      .limit(1);
  }
}