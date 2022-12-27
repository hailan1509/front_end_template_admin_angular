import { number } from 'echarts';
import { Observable } from 'rxjs';


export interface Item {
  id?: string;
  title?: string;
  priority?: string;
  iteration?: string;
  assignee?: string;
  status?: string;
  timeline?: string;
  $checked?: boolean;
  $expandConfig?: any;
  children?: any;
  chosen?: boolean;
  $isChildTableOpen?: boolean;
}

export interface Area {
  area_rcd?: number;
  area_name?: string;
  country_rcd?: number;
  area_group?: number;
  area_note?: string;
  active_flag?: number;
}

export interface Profile {
  profile_rcd?:number;
  profile_code?: number;
  profile_name_e?:number;
  profile_name_l?: string;
  from_date?:Date;
  to_date?:Date;
  year?:number;
  number_of_paper?: number;
  profile_type_rcd?: number;
  profile_number?: number;
  cancellation_reason?:string;
  is_digital_profile?:string;
  status?:string;
  sort_order?:number;
  date_pending?:Date;
  date_edited?:Date;
  date_pending_cancellation?:Date;
  date_cancellation?:Date;
  agency_issued_rcd?:string;
  phong_rcd?:string;
  duration_storage_rcd?:string;
  archives_rcd?:string;
  profile_box_rcd?:string;
  profile_tyle_rcd?:string;
  active_flag?: number;

}

export interface ProfileRef {
  profile_rcd?: string;
  profile_code?: string;
  profile_number?: number;
  profile_name_l?: string;
  profile_name_e?: string;
  from_date?: Date;
  to_date?: Date;
  year?: number;
  number_of_paper?: number;
  profile_note_l?: string;
  profile_note_e?: string;
  cancellation_reason?: string;
  is_digital_profile?: boolean;
  status?: number;
  sort_order?: number;
  active_flag?: number;
  profile_type_rcd?: string;
  profile_box_rcd?: string;
  phong_rcd?: string;
  archives_rcd?: string;
  archive_fonts_rcd?: string;
  duration_storage_rcd?: string;
  agency_issued_rcd?: string;
  confidentiality_rcd?: string;
  fields_rcd?: string;
  created_by_user_id?: string;
}

export interface DocumentRef {
  document_rcd?: string;
  document_number?: string;
  document_name_l?: string;
  document_name_e?: string;
  date?: string;
  excerpt?: string;
  author?: string;
  number_of_paper?: number;
  document_note_l?: string;
  document_note_e?: string;
  sort_order?: string;
  attached_file?: string;
  status?: number;
  document_type_rcd?: string;
  physical_condition_rcd?: string;
  confidentiality_rcd?: string;
  agency_issued_rcd?: string;
  profile_rcd?: string;
  active_flag?: number;
  created_by_user_id?: string;
  attachments_json?: DocumentAttachment[];

}

export class DocumentAttachment {
  document_attachment_id?: string;
  document_rcd?: string;
  file_name?: string;
  file_source?: string;
  file_destination?: string;
  file_extension?: string;
  sort_order?: number;
  file_weight?: number;
  active_flag?: number;
  created_by_user_id?: string;
}

export interface CancellationMinutesRef {
  cancellation_minutes_rcd?: number;
  staff_rcd?: string;
  cancellation_minutes_number?: number;
  decision_number?: number;
  number_of_cancellations?: number;
  content?: string;
  place?: string;
  cancellation_method?: string;
  time_destroy?: Date;
  cancellation_minutes_note?: string;
  attached_file?: string;
  status?: number;
  comment?: string;
  active_flag?: number;
}
// export interface Profile {

//   profile_code?: number;
//   profile_name_l?: string;
//   profile_type_rcd?: number;
//   profile_number?: number;
//   from_date?:Date;
//   to_date?:Date;
//   year?:number;
//   number_of_paper?: number;
//   active_flag?: number;

// }
export interface HandoverMinutesRef {
  handover_minutes_rcd?: number;
  staff_rcd?: string;
  profile_rcd?: string;
  handover_minutes_name?: number;
  // handover_minutes_name_e?: number;
  place?: string;
  reason?: string;
  time_destroy?: Date;
  cancellation_minutes_note?: string;
  attached_file?: string;
  // status?: number;
  // comment?: string;
 sort_order?: number;
  active_flag?: number;
  // created_by_user_id?: string;
  // created_date_time?: Date;
  // lu_updated?: Date;
  // lu_user_id?: string;
}

export interface MiningBookRef {
  mining_book_rcd?: number;
  mining_name?: string;
  mining_note?: string;
  sort_order?: number;
  active_flag?: number;
}

export interface ListPager {
  pageSize?: number;
  pageIndex?: number
}


export interface CardAction {
  icon?: string;
  num?: string;
}

export interface Card {
  name?: string;
  id?: number;
  ame?: string;
  title?: string;
  imgSrc?: string;
  subTitle?: string;
  content?: string;
  agreeNum?: number;
  starsNum?: number;
  messageNum?: number;
  actions?: CardAction[];
}

export abstract class ListData {
  abstract getListData(pager: ListPager): Observable<Item[]>;
  abstract getOriginSource(pager: ListPager): Observable<Item[]>;
  abstract getTreeSource(pager: ListPager): Observable<Item[]>;
  abstract getCardSource(pager: ListPager): Observable<Card[]>;
}
