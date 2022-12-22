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

export interface Department {
  department_rcd?: number;
  department_code?:number;
  departmment_name_e?: string; 
  departmment_name_l?: string;
  sort_order?:number;
  department_note_e?: string; 
  department_note_l?: string;
  active_flag?: number;
}

export interface Role {
  role_rcd?: number;
  role_code?:number;
  role_name_e?: string; 
  role_name_l?: string;
  sort_order?:number;
  role_note_e?: string; 
  role_note_l?: string;
  active_flag?: number;
}

export interface Users {
  user_rcd: string;
  user_code:string;
  full_name: string;
  gender:string;
  date_of_birth:string;
  email:string;
  phone_number:string;
  address:string;
  user_name: string; 
  pass_word:string;
  user_note_e?: string;
  user_note_l?: string;
  department_rcd?:string;
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
