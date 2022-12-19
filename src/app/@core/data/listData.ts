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
