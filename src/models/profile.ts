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



// SELECT b_employee.b_employee_id,
// t_patient.t_patient_id,
// t_person.t_person_id,
// t_patient.patient_hn,
// 			 b_employee.employee_login ,
// 			 b_employee.employee_password ,

// 			f_provider_type.description  ,

// 			t_person.person_firstname ,
// 			t_person.person_lastname,
// 			t_person.person_birthday,
// 		--	substr(t_patient.patient_birthday,9,11)||'/'||substr(t_patient.patient_birthday,6,2)||'/'||substr(t_patient.patient_birthday,1,4)as person_birthday,
// 			t_person.person_pid ,
// 			t_patient.patient_patient_email as email,
// 			t_patient.patient_patient_mobile_phone as m_phone,
// 			pat_address.address,
//       b_employee.provider,
// 			case when t_patient.picture_profile  IS NOT NULL then
// 			regexp_replace(encode(t_patient.picture_profile,'base64'),'\r|\n','','g')
// else '/9j/4AAQSkZJRgABAQAAAQABAAD/4QA2RXhpZgAASUkqAAgAAAABADIBAgAUAAAAGgAAAAAAAAAyMDEyOjA3OjE0IDA5OjM1OjE5AP/iA6BJQ0NfUFJPRklMRQABAQAAA5BBREJFAhAAAHBydHJHUkFZWFlaIAfPAAYAAwAAAAAAAGFjc3BBUFBMAAAAAG5vbmUAAAAAAAAAAAAAAAAAAAABAAD21gABAAAAANMtQURCRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABWNwcnQAAADAAAAAMmRlc2MAAAD0AAAAZ3d0cHQAAAFcAAAAFGJrcHQAAAFwAAAAFGtUUkMAAAGEAAACDHRleHQAAAAAQ29weXJpZ2h0IDE5OTkgQWRvYmUgU3lzdGVtcyBJbmNvcnBvcmF0ZWQAAABkZXNjAAAAAAAAAA1Eb3QgR2FpbiAyMCUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAAD21gABAAAAANMtWFlaIAAAAAAAAAAAAAAAAAAAAABjdXJ2AAAAAAAAAQAAAAAQACAAMABAAFAAYQB/AKAAxQDsARcBRAF1AagB3gIWAlICkALQAxMDWQOhA+wEOQSIBNoFLgWFBd4GOQaWBvYHVwe7CCIIigj0CWEJ0ApBCrQLKQugDBoMlQ0SDZIOEw6WDxwPoxAsELgRRRHUEmUS+BONFCQUvRVXFfQWkhcyF9QYeBkeGcYabxsbG8gcdh0nHdoejh9EH/wgtSFxIi4i7SOtJHAlNCX5JsEniihVKSIp8CrAK5IsZS06LhEu6i/EMKAxfTJcMz00HzUDNek20De5OKQ5kDp+O208Xj1RPkU/O0AzQSxCJkMiRCBFH0YgRyNIJ0ktSjRLPExHTVNOYE9vUH9RkVKlU7pU0VXpVwJYHlk6WlhbeFyZXbxe4GAGYS1iVmOAZKxl2WcIaDhpaWqda9FtB24/b3hwsnHucyt0anWqdux4L3l0erp8AX1KfpV/4YEugnyDzYUehnGHxYkbinKLy40ljoGP3ZE8kpuT/ZVflsOYKJmPmvecYJ3LnzegpaIUo4Wk9qZpp96pVKrLrEStvq85sLayNLO0tTS2t7g6ub+7RbzNvla/4MFswvnEh8YXx6jJO8rOzGPN+s+S0SvSxdRh1f7XnNk82t3cf94j38jhbuMW5L/maegU6cHrb+0f7tDwgvI18+r1oPdX+RD6yvyF/kH////bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/CAAsIAOwA7AEBEQD/xAAaAAEBAQEBAQEAAAAAAAAAAAAABQQDAgEG/9oACAEBAAAAAf2gAAAAAADpo6YPgAAANu3szSAAAA91+wZpXkAAB6t+wOMUAABtpgEfOAABQoAEvGAABR3gErIAABvogErIAABtpgEjMAABa7AGOWAABX0gGCcAABQoAEnKAAB9vgPEIAAAsaAMUwAAA01wInIAAA+3weYIAAA6XAfIAAAAoUAJWQAAAudAM0gAADvv1AGPDxAAfde7sABnxZAB03bPQAAeMWLwH2juAAAHyfgFPaAAABOwPV4AAAB5hfNVYAAAAj56W4AAAAnYLGgAAAAySrXYAAAAwzf/xAAlEAACAQMDBQEAAwAAAAAAAAABAgMABEARIDAQEjEyMyETQVD/2gAIAQEAAQUC/wAwKzUIGr+AAHzkJATSxqvWdSyY6KXMcYTdLEHpgVOIB3FFCDfKneuJa+/DONJcO14rr6Ydr44br6Ydr54bn6Ydr7cNx9cOH58Nzp2YdudY+G68Yds3FcNq+GDoeBzouLA3dHvuW0TFgftbfI3e2Y3rjR++4+Ma3jGm+eMLjRjtTfcDWLDSJmpIVXiaAGmjZecAmlgJpI1XmeJWpoGHGiM9LbigAMJlDU9vTKV3f3HBjka1JBtt00GTcp1UatlMNR0txrJlzjSSrUfmXdDpb/LLufnUPzy7o/lf/8QAJhAAAQIEBQUBAQAAAAAAAAAAASFAAAIRMBAiUWGBEiAxQXFQkf/aAAgBAQAGPwL8xAYVIzTQnhzmSPGKOKCE86928ULUARQWN2ptHdpNa4aTWuGk1rhoXwpa3afLUrTp92k9NAdLJLYWKatqejYq9LeX6+E5sVHtsBYLTT7GptZUhRfRYzJCC9pCLbyiMxrCMlEZDxGYd9Z12brFZP529R8l11jnEB2Rj8eHAl5KcA85wleAYf/EACYQAQABAgUEAwEBAQAAAAAAAAERACEwMUBRYRAgQYFxkaGxUPD/2gAIAQEAAT8h/wAzPNTy4/VTzZKhKU+GoCWDOrs4bGdZcZ3esazjMb1lnp4a/LtQX2LuuOW+oQw6V81NCcAGL0ays2dIJRMjC++NIbL4wsnSMpzhZOkfkwsvSPz4TlcBpAEKJMI3UzW0kTyjCdrmdIcK5HOEUamEe9JzYnBkzwUZaXMFyzgRG9pr22ffesEuVS/jkfGmMyO/87pxJd4yjcrK2mUhL4wGSeFlpcq4TMCyCUvpLmEN6OC2vLhX5T/K2u3L46MFXFZ89b1u5u3xrtEtytr/AKaZGER2cLyAb+KJf4hajYAHGiGgmvN7FJwh/O4FAErRHkfSggtpgEATmou1etDg1ULD/wA89eSGjLVC5klJCjmdL5snWcOb9Pdo1n8joI5L6w2cdH4tYm0np//aAAgBAQAAABD/AP8A/wD/AP8A8/8A/wD/AD//AP8A/wD/AP8A/wCf3/8A/v8A/wD/AP8A/v8A/wDv/wD/AP8Av/8A/wD/AP8A/wD/APv/AP8A/wDv/wD+/wD/AP8A/wD/AP8Av/8A/wD/AP8A/wD/AOf/AP8A35//AP8Afn//AP8A/wD/AP8A7/8A/wD+v+f7+/8A9/8Af/8A86P/AP8A8/8A/wD/AO7/AP8A/wDf/wD/AP8AX/8A/wD/AH//AP8A9f8A/wD/AN//xAAqEAEAAQIDBgcBAQEAAAAAAAABEQAxIUBRMEFhcZGhECCBscHR4fBQ8f/aAAgBAQABPxD/ADHo4hEHVqdcP/FKKASoAB61gjSYkhTMIQqrAStMHqO6rFDEwY3GedR4TVUEPb80ikCJgyRl/VQLDj9Vg5KIuHzHRYzCN+DrS1Z9+JlYqJ4OHGiLwLrddXYMXAMdJ+qRSCDCO5yghi4LpLspgWh/emU9bDZdj93KM1EHZLp/dyiwt8HvsrzfA7uUWDw++yMdkHPJlylsICwRLsoADCLea5SN6nz+dkWpV0H7lCrQnlN+yHwExOLHKIPcKDJJsBbQI0IGu/KJN6xnI8bU/I2DBRONyMfqjKwqswuG4/HnJkgErW7a1/m/LFSuk96LebWR9VFjLaPI8/E4O1BCWCYdMsgiVTuN08dgyEnKsN8KLZRYTXBgHnv2CWoTHBx7TRbJTQxiWLHQu1ImqSwcjYpJT0rSv0bqx2Xk35t+ASBNTSQ0xPorHTb77rUbRJqVWF0e1msYgZu9ihwSBD02SGJqMOqmpDjQHy1wA0IyUSTxMTk7qCWI/wA405S6t3Jt5mTIgAlaNIbpuOevtQAAAsGWbsVwSVHZkMVs9H4oZ8kMeFgT+JzQ4QFgnbxXbwjCgACxmiblRSXwQ+ESyRPVbNtqwnuT637+EKy4Hp/3ORPNfueEt1PdnCU0Pnw7fm21ENEpPoUV/9k='
// 		end 	as picture_profile,
// t_patient.latitude,
// t_patient.longitude
// 			--encode(t_patient.picture_profile,'base64') as picture_profile
// 		 --ENCODE((t_patient.picture_profile, 'UTF-8'), 'base64')as  tt
//      --convert_from(encode(t_patient.picture_profile, 'base64'), 'UTF8') as tt
// 			FROM b_employee
// 			 INNER JOIN f_provider_type ON b_employee.f_provider_type_id = f_provider_type.f_provider_type_id
// 			INNER JOIN t_person ON b_employee.t_person_id=t_person.t_person_id
// 			LEFT JOIN t_patient ON t_person.person_pid=t_patient.patient_pid and t_patient.patient_active='1'
//       LEFT JOIN f_employee_authentication ON b_employee.f_employee_authentication_id=f_employee_authentication.f_employee_authentication_id
// 			 LEFT JOIN  pat_address on t_patient.t_patient_id=pat_address.t_patient_id) as bm
// 			--WHERE b_employee.employee_active='1';
// WHERE bm.patient_hn<>''

  }
}
