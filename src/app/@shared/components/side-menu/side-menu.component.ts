import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'da-side-menu',
  templateUrl: './side-draw.component.html',
  styleUrls: ['./side-draw.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Input() data: any;
  role_rcd: 1;
  user: any;

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('userinfo')) {
      this.user = JSON.parse(localStorage.getItem('userinfo')!);
      this.role_rcd = this.user.role_rcd;
      this.data = this.data.filter((v:any) => {
        return v.roles.indexOf(this.role_rcd) > -1
      })
    }
  }

}
