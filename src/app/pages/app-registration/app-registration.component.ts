import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApplicationService } from '../../services/Application/application.service';
import { ApplicationData} from '../../models/app-registration-page'

import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {HttpStatusCode} from '../../utility/HttpStatusCode'

import {GlobalConstants} from '../../utility/global-constants'

/**
 *
 * App registration page
 * @export
 * @class AppRegistrationComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-app-registration',
  templateUrl: './app-registration.component.html',
  styleUrls: ['./app-registration.component.css']
})
export class AppRegistrationComponent implements OnInit {

  @ViewChild('editModal') editModal : TemplateRef<any>;

  // Application Register/Edit Form post data 
  public applicationPostData: ApplicationData;
  public applicationEditPostData: ApplicationData;

  // Table data
  public tableDisplayColumns: string[];
  public tableDataSource: ApplicationData[];

   // Combo box items
   public selectApps = GlobalConstants.APPS;
  
  /**
   *Creates an instance of AppRegistrationComponent.
   * @param {ApplicationService} applicationService service implementation for application page
   * @param {ToastrService} toastr to show toast message
   * @param {NgbModal} modalCtrl for showing modal
   * @memberof AppRegistrationComponent 
   */
  constructor(private applicationService: ApplicationService, 
              private toastr: ToastrService,
              private modalCtrl: NgbModal) { 
    
    this.tableDisplayColumns = ["Application Name","Callback URL's","Expiry Time"];
    this.resetApplicationRegisterForm();

  }


  /**
   * call's getApplicationTable() to load data inside the table
   * @memberof AppRegistrationComponent
   */
  ngOnInit() {
    this.getApplicationTable();   
  }

  /*****************  Form Functions ***************/

  /**
   * Checks if the form data is not filled completly.
   * @param {ApplicationData} appPostData the form data to be submitted
   * @returns
   * @memberof AppRegistrationComponent
   */
  isNotValidFormData(appPostData: ApplicationData){
    if(appPostData.appId == ""  ||  appPostData.expiryTime == 0){
        return true;
    }
    return false;
  }

  /**
   *
   * reset's form data in Application Registration page.
   * @memberof AppRegistrationComponent
   */
  resetApplicationRegisterForm(){
    this.applicationPostData = {"appId":"","callbackURL":"","expiryTime":0};
  }

  /**
   * register application. Post Form data.
   * @memberof AppRegistrationComponent
   */
  registerApplication(){

    if(this.isNotValidFormData(this.applicationPostData) ){
      this.toastr.error('Please fill all the fields in the register application form','Missing Values');
      return;
    }

    this.applicationService.create(this.applicationPostData).subscribe((res: any) => { 
      
      console.log(res);

      if(res.status == HttpStatusCode.HTTP_OK){
        
        this.toastr.success('Application Registered', '');
        this.getApplicationTable();
        this.resetApplicationRegisterForm();

      } 

    }, err => {
        this.toastr.error( err.error,'Error');
    });;
  }

  /*****************  /. Form Functions ***************/


  /*****************  Table Functions ***************/
  /**
   * loads application list 
   *
   * @memberof AppRegistrationComponent
   */
  getApplicationTable(){

    this.applicationService.read().subscribe((res: any) => {
      this.tableDataSource = res;
    }, err => {
      console.log(err);
    });

  }

  /**
   * delete application data
   * @param {ApplicationData} item delete row item
   * @memberof AppRegistrationComponent
   */
  deleteApplicationTableItem(item: ApplicationData){
  
    this.applicationService.delete(item).subscribe((res:any)=>{
        
      if(res.status == HttpStatusCode.HTTP_OK){
        this.toastr.info('Application Deleted', '');
        this.getApplicationTable();
      } 

    },err=>{
      this.toastr.error( err.error,'Error');
    });

  }

  /**
   * callback function for edit in <app-table>
   * @param {*} item
   * @memberof AppRegistrationComponent
   */
  editApplicationTableItem(item){
    this.openEditModal(item);
  }
  /*****************  /. Table Functions ***************/


  /*****************  Modal Functions ***************/
  /**
   * Open edit Modal. Load row data
   *
   * @param {ApplicationData} editItem
   * @memberof AppRegistrationComponent
   */
  openEditModal(editItem:ApplicationData){
    this.applicationEditPostData = editItem;
    this.modalCtrl.open(this.editModal);
  }

  /**
   *
   * Update popup.
   * @memberof AppRegistrationComponent
   */
  saveEditModal(){

    this.applicationService.update(this.applicationEditPostData).subscribe((res:any)=>{
        
      if(res.status == HttpStatusCode.HTTP_OK){
        this.getApplicationTable();
        this.modalCtrl.dismissAll();
        this.toastr.info('Application Updated Successfully', '');

      } 

    },err=>{
      console.log(err);
      this.toastr.error( err.error,'Error');
    });

  }
  /*****************  /. Modal Functions ***************/


}
