import * as Knex from 'knex';

export class SiteModel {
  getSite(db: Knex) {
    return db('b_site')
      .select('b_visit_office_id', 'site_name','address_description as province' ,'tt.version','tt.lastupdate')
      .innerJoin('f_address' , 'f_address.f_address_id' ,'=' ,'b_site.site_changwat' ) 
      .crossJoin ((db.raw(`(select (select version_application_number  FROM   s_version         where version_update_time = (select  Max(s_version.version_update_time)  FROM s_version) ) as version,  (select Max(s_version.version_update_time)  FROM  s_version) as lastupdate) as tt` )))
  }
}