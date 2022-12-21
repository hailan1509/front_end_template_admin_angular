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
