import Knex = require('knex');
import * as moment from 'moment';
export class familyModel {

  public tableName  = 't_patient';
  public primaryKey = 't_patient_id';


  list(knex: Knex, limit: number = 20, offset: number = 0) {
    return knex(this.tableName)
      .limit(limit)
      .offset(offset);
  }

  raw(knex: Knex, id: string, limit: number = 3 , offset: number = 0) {
    return knex(this.tableName)
    .column('t_patient.patient_father_firstname','t_patient.patient_father_lastname','t_patient.patient_father_pid'
            ,'t_patient.patient_mother_firstname','t_patient.patient_mother_lastname','t_patient.patient_mather_pid'
            ,'t_patient.patient_couple_firstname','t_patient.patient_couple_lastname','t_patient.patient_couple_pid')
            .where(this.primaryKey, id)
      .limit(limit)
      .offset(offset);
  }
  detail(knex: Knex, id: string ,limit: number = 1 ,offset: number = 0) {
   
 return knex(this.tableName)
  .column(knex.raw('case when f.patient_pid<> \'\' then json_build_object(\'hn\',\'HN\'||\' \' ||f.patient_hn , \'mobile\',f.patient_patient_mobile_phone , \'f\',t_patient.patient_father_firstname , \'l\',t_patient.patient_father_lastname, \'pid\',\'CID\'||\' \' ||t_patient.patient_father_pid, \'tpid\',f.t_patient_id) else json_build_object(\'f\',t_patient.patient_father_firstname , \'l\',t_patient.patient_father_lastname)  end as dad'))
  .column(knex.raw('case when ma.patient_pid<> \'\' then json_build_object(\'hn\',\'HN\'||\' \' ||ma.patient_hn , \'mobile\',ma.patient_patient_mobile_phone , \'f\',t_patient.patient_mother_firstname , \'l\',t_patient.patient_mother_lastname, \'pid\',\'CID\'||\' \' ||t_patient.patient_mather_pid, \'tpid\',ma.t_patient_id) else json_build_object(\'f\',t_patient.patient_mother_firstname , \'l\',t_patient.patient_mother_lastname)  end as mom'))
  .column(knex.raw('case when co.patient_pid<> \'\' then json_build_object(\'hn\',\'HN\'||\' \' ||co.patient_hn , \'mobile\',co.patient_patient_mobile_phone , \'f\',t_patient.patient_couple_firstname , \'l\',t_patient.patient_couple_lastname, \'pid\',\'CID\'||\' \' ||t_patient.patient_couple_pid, \'tpid\',co.t_patient_id) else json_build_object(\'f\',t_patient.patient_couple_firstname , \'l\',t_patient.patient_couple_lastname)  end as couple'))
  .column(knex.raw('case when f.picture_profile IS NOT NULL then	regexp_replace(encode(f.picture_profile,\'base64\'),\'\r|\n\',\'\',\'g\') else null end 	as f_p'))
   .column(knex.raw('case when ma.picture_profile IS NOT NULL then	regexp_replace(encode(ma.picture_profile,\'base64\'),\'\r|\n\',\'\',\'g\') else null end 	as m_p'))
   .column(knex.raw('case when co.picture_profile IS NOT NULL then	regexp_replace(encode(co.picture_profile,\'base64\'),\'\r|\n\',\'\',\'g\') else null end 	as co_p'))
 
.leftJoin('t_patient  as f','t_patient.patient_father_pid','=','f.patient_pid')
 .leftJoin('t_patient  as ma','t_patient.patient_mather_pid','=','ma.patient_pid')
 .leftJoin('t_patient  as co','t_patient.patient_couple_pid','=','co.patient_pid')
 
 .where('t_patient.t_patient_id', id)
 .limit(limit)
 .offset(offset);
  }

}