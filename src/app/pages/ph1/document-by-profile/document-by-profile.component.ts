import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, FormLayout, TableWidthConfig } from 'ng-devui';
import { ApiService } from 'src/app/api.service';
import { Subscription } from 'rxjs';
import { Item, Profile } from 'src/app/@core/data/listData';
import { ListDataService } from 'src/app/@core/mock/list-data.service';
import { FormConfig } from 'src/app/@shared/components/admin-form';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-by-profile',
  templateUrl: './document-by-profile.component.html',
  styleUrls: ['./document-by-profile.component.scss']
})
export class DocumentByProfileComponent implements OnInit {
  filterprofileShow = false;

  options = ['normal', 'borderless', 'bordered'];

  sizeOptions = ['sm', 'md', 'lg'];

  layoutOptions = ['auto', 'fixed'];

  formData = {};

  editForm: any = null;

  insert = true;

  editRowIndex = -1;

  busy: Subscription;
  private routeSub: Subscription;

  @ViewChild('EditorTemplate', { static: true })
  EditorTemplate: TemplateRef<any>;

  constructor(private dialogService: DialogService, private cdr: ChangeDetectorRef,private api: ApiService,private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
    });
  }

}
