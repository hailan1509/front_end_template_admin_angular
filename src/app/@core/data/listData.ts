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


export interface Fields {
  fields_rcd?: number;
  fields_name_e?: string; 
  fields_name_l?: string;
  sort_order?:number;
  fields_note_e?: string; 
  fields_note_l?: string;
  active_flag?: number;
}

export interface Confidentiality {
  confidentiality_rcd?: number;
  confidentiality_name_e?: string; 
  confidentiality_name_l?: string;
  sort_order?:number;
  confidentiality_note_e?: string; 
  confidentiality_note_l?: string;
  active_flag?: number;
}

export interface AgencyIssued {
  agency_issued_rcd?: number;
  agency_issued_name_e?: string; 
  agency_issued_name_l?: string;
  sort_order?:number;
  agency_issued_note_e?: string; 
  agency_issued_note_l?: string;
  active_flag?: number;
}

export interface Archives {
  archives_rcd?: number;
  archives_name_e?: string; 
  archives_name_l?: string;
  sort_order?:number;
  archives_note_e?: string; 
  archives_note_l?: string;
  active_flag?: number;
}

export interface DurationStorage {
  duration_storage_rcd?: number;
  duration_storage_name_e?: string; 
  duration_storage_name_l?: string;
  sort_order?:number;
  duration_storage_note_e?: string; 
  duration_storage_note_l?: string;
  active_flag?: number;
}

export interface PhysicalCondition {
  physical_condition_rcd?: number;
  physical_condition_name_e?: string; 
  physical_condition_name_l?: string;
  sort_order?:number;
  physical_condition_note_e?: string; 
  physical_condition_note_l?: string;
  active_flag?: number;
}

export interface MiningPurpose {
  mining_purpose_rcd?: number;
  mining_purpose_name_e?: string; 
  mining_purpose_name_l?: string;
  sort_order?:number;
  mining_purpose_note_e?: string; 
  mining_purpose_note_l?: string;
  active_flag?: number;
}

export interface MiningBook {
  mining_book_rcd?: number;
  mining_book_name_e?: string; 
  mining_book_name_l?: string;
  sort_order?:number;
  mining_book_note_e?: string; 
  mining_book_note_l?: string;
  active_flag?: number;
}

export interface DocumentType {
  document_type_rcd?: number;
  document_type_name_e?: string; 
  document_type_name_l?: string;     
  sort_order?:number;
  document_type_note_e?: string; 
  document_type_note_l?: string;
  active_flag?: number;
}

export interface ArchiveFonts {
  archive_fonts_rcd?: number;
  archive_fonts_name_e?: string; 
  archive_fonts_name_l?: string;     
  sort_order?:number;
  archive_fonts_note_e?: string; 
  archive_fonts_note_l?: string;
  active_flag?: number;
  }

export interface DocumentRef {
  document_rcd ?: string;
  document_number?: string;
  document_name_e?: string;
  document_name_l?: string;
  date?:string;
  excerpt?:string;
  author?:string;
  number_of_paper?:number;
  document_note_l?:string;
  document_note_e?:string;
  sort_order?:number;
  attached_file?:string;
  document_type_rcd?:string;
  physical_condition_rcd?:string;
  confidentiality_rcd?:string;
  profile_rcd?:string;
  active_flag?:number;
  created_by_user_id?:string;
  created_date_time?:string;
  lu_updated?:string;
  lu_user_id?:string;
  document_type_name_l?:string;
  physical_condition_name_l?:string;
  confidentiality_name_l?:string;
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
  profile_type_name_l?:string;
  agency_issued_name_l?:string;
  archives_name_l?:string;
  phong_name_l?:string;
}

export interface ProfileRef {
  profile_rcd?: number;
  profile_code?: string;
  profile_number?: number;
  profile_type_rcd?: string;
  profile_box_rcd?: string;
  phong_rcd?: string;
  archives_rcd?: string;
  duration_storage_rcd?: string;
  agency_issued_ref?: string;
  profile_name?: string;
  from_date?: Date;
  to_date?: Date;
  number_of_pager?: number;
  profile_note?: string;
  cancellation_reason?: string;
  is_digital_profile?: number;
  status?: number;
  sort_order?: number;
  active_flag?: number;
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
