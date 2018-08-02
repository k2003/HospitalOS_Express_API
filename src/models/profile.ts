import Knex = require('knex');
import * as moment from 'moment';
//tscimport {Base64} from '@ionic-native/base64';


export class ProfileModel {
  getProfile(db: Knex, employee_login: string) {
    return db('b_employee_bs')
  //     .innerJoin('f_provider_type','b_employee.f_provider_type_id','=','f_provider_type.f_provider_type_id')
  //     .innerJoin('t_person as p','b_employee.t_person_id','=','p.t_person_id')
  //     .leftJoin('t_patient as tp','p.person_pid','=','tp.patient_pid')
  //     .select('provider', 'employee_login','employee_firstname' 
  //   ,'employee_lastname','description','person_pid')
  //  // .select(db.raw(base64url.encode('picture_profile')))
  //  // .columns(db.raw("encode(tp.picture_profile,'base64')) as picture_profile"))
  //  //.select(db.raw(base64url.encode"(picture_profile) as picture_profile"))
  // .columns(db.raw("tp.picture_profile" )) 
  // // .columns(db.raw("CONCAT('Hello, ', name) as greeting_message"))
  //  //.columns(db.raw("employee_lastname as name")) 
  //   .where('employee_active', '1')

  //    .orderBy('start_date', 'ASC')
     .limit(1);

  //  return db.raw('SELECT b_site.b_visit_office_id as pcucode,         b_employee.employee_login AS username,   b_employee.employee_password as password,    b_employee.f_employee_authentication_id AS grouplevel,   t_person.person_firstname  ,      t_person.person_firstname ,    t_person.person_lastname AS lname, t_person.person_pid ,    b_employee.provider,       f_employee_authentication.employee_authentication_description as alevel    FROM b_employee     INNER JOIN f_provider_type ON b_employee.f_provider_type_id = f_provider_type.f_provider_type_id     INNER JOIN  t_person ON b_employee.t_person_id=t_person.t_person_id    LEFT JOIN t_patient ON t_person.person_pid=t_patient.patient_pid    LEFT JOIN f_employee_authentication ON b_employee.f_employee_authentication_id=f_employee_authentication.f_employee_authentication_id , b_site')  ;
//  return db.raw('select provider, employee_login, employee_firstname, employee_lastname, description, person_pid, base64url.decode(picture_profile) from b_employee innerjoin f_provider_type on b_employee.f_provider_type_id = f_provider_type.f_provider_type_id inner join t_person on b_employee.t_person_id = t_person.t_person_id left join t_patient on t_person.person_pid = t_patient.patient_pid  order by start_date ASC');
  
//.where('employee_login', 'employee_login')


  }
}
