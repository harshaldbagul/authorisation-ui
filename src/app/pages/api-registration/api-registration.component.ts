import { Component, OnInit,ViewChild, TemplateRef } from '@angular/core';
import {APIData,APITableItem,RolesData} from '../../models/api-registration-page'

import {ApiService} from '../../services/Api/api.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';

import {HttpStatusCode} from '../../utility/HttpStatusCode'

import {GlobalConstants} from '../../utility/global-constants'
/**
 * API registration Page
 *
 * @export
 * @class ApiRegistrationComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-api-registration',
  templateUrl: './api-registration.component.html',
  styleUrls: ['./api-registration.component.css']
})
export class ApiRegistrationComponent implements OnInit {

  @ViewChild('editModal') editModal : TemplateRef<any>; // TemplateRef is used to pass to Modal Controller

  /*
    NOTE: if the variable used inside the html, then make it as public.
    Else make the variable as private.
  */

  //Post object for API page
  public apiPostData: APIData;
  public apiEditPostData: APITableItem;

  // Multi Select Component data
  public multiSelectDropdownList = [];
  public multiSelectDropdownSettings = {}; 

  //Table Component data
  public tableDisplayColumns: string[];
  public tableDataSource: APITableItem[];

  // Combo box items
  public selectApps = GlobalConstants.APPS;

  /**
   * Creates an instance of API page.
   * @param {NgbModal} modalCtrl for rendering the modal. Uses TempalateRef
   * @param {ApiService} apiService the API service for CRUD
   * @param {ToastrService} toastr the toast component
   * @memberof ApiRegistrationComponent 
   */
  constructor(private modalCtrl: NgbModal,
              private apiService: ApiService,
              private toastr: ToastrService) { 

    this.resetAPIRegisterForm();

    this.multiSelectDropdownList = [ 'GET','POST','PUT','DELETE' ];
    this.multiSelectDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };

    this.tableDisplayColumns = ["API URL","App Name","Role","METHOD","Server Metadata","UI Metadata"];

  }

  /**
   * Used for reseting the form data
   *
   * @memberof ApiRegistrationComponent
   */
  resetAPIRegisterForm(){
    this.apiPostData = { 
      "apiURL"  : "", 
      "appId"   : "",
      "roles" : [
        {
         "role":"", 
         "methodType":[], 
         "serverMetadata":"",
         "uiMetadata":""
        }
      ] 
    };
  }

 
  /**
   * On Initialize, call the getAPITable to populate the table
   *
   * @memberof ApiRegistrationComponent
   */
  ngOnInit() {
    this.getAPITable();
  }


  /***************** Form Functions ***************/

  /**
   * Validate form data before posting
   * @param {APIData} apiPostData form data
   * @returns
   * @memberof ApiRegistrationComponent
   */
  isNotValidFormData(apiPostData: APIData){
    
    if(this.apiPostData.apiURL == "" || this.apiPostData.appId=="")
      return true;

    for(let role of apiPostData.roles){
      if(this.isNotValidFormDataRole(role))
        return true;
    }
    return false;
  }

  /**
   * Validate role data inside apiPostData
   * @param {RolesData} role role row from apiPostData
   * @returns
   * @memberof ApiRegistrationComponent 
   */
  isNotValidFormDataRole(role: RolesData){
    if(role.role == "" || role.methodType.length==0 ){
      return true;
    }
    return false;
  }

  /**
   *
   * Register API. Form register click 
   * @memberof ApiRegistrationComponent
   */
  registerAPI(){
    
    if(this.isNotValidFormData(this.apiPostData) ){
      this.toastr.error('Please fill all the fields in the API registration form','Missing Values');
      return;
    }

    this.apiService.create(this.apiPostData).subscribe( (res:any)=>{

      if(res.status == HttpStatusCode.HTTP_OK){
        
        this.toastr.success('API Registered', '');
        this.getAPITable();
        this.resetAPIRegisterForm();

      } 
    },err=>{
      this.toastr.error( err.error,'Error');
    });
  }

  /**
   *
   * Adds new Role row in the form
   * @memberof ApiRegistrationComponent
   */
  addRoleForm(){
    this.apiPostData.roles.push({
      "role":"", 
      "methodType":[], 
      "serverMetadata":"",
      "uiMetadata":""
     });
  }

  /**
   *
   * Deletes Role row in the form
   * @param {*} role
   * @memberof ApiRegistrationComponent
   */
  deleteRoleForm(role){
    let index = this.apiPostData.roles.indexOf(role);
    if(index > -1){
        this.apiPostData.roles.splice(index, 1);
    }
  }
  /***************** /.Form Functions ***************/


  /***************** Table Functions ***************/
  /**
   * loads the API table with content
   *
   * @memberof ApiRegistrationComponent
   */
  getAPITable(){

    this.apiService.read().subscribe((res:any)=>{
      this.tableDataSource = res;
    },err=>{
      console.log(err);
    })

  }

  /**
   *
   * Delete callback returned from <app-table>
   * @param {APITableItem} item the row item to be deleted
   * @memberof ApiRegistrationComponent
   */
  deleteAPITableItem(item: APITableItem){  

    this.apiService.delete(item).subscribe( (res:any)=>{
      if(res.status == HttpStatusCode.HTTP_OK){
        
        this.toastr.success('API deleted', '');
        this.getAPITable();
          
      } 
    },err=>{
      this.toastr.error( err.error,'Error');
    });
  }

  /**
   *
   * Edit callback returned from <app-table>
   * @param {*} item the row item to be edited
   * @memberof ApiRegistrationComponent
   */
  editAPITableItem(item){
    console.log(item);
    this.openEditModal(item);
  }
  /*****************  /.Table Functions ***************/


  /*****************  Modal Functions ***************/
  /**
   * handler for opening the modal
   *
   * @param {APITableItem} editItem edit row item, returned from editCallback of <app-table>
   * @memberof ApiRegistrationComponent
   */
  openEditModal(editItem:APITableItem){
    this.apiEditPostData = editItem;
    this.modalCtrl.open(this.editModal,{size: 'lg'});
  }

  /** 
   * handler for save click in Edit modal.
   * @memberof ApiRegistrationComponent
   */
  saveEditModal(){

    this.apiService.update(this.apiEditPostData).subscribe((res:any)=>{
        
      if(res.status == HttpStatusCode.HTTP_OK){
        this.getAPITable();
        this.modalCtrl.dismissAll();
        this.toastr.info('API Updated Successfully', '');
      } 

    },err=>{
      console.log(err);
      this.toastr.error( err.error,'Error');
    });


  }

  /*****************  /.Modal Functions ***************/
 
}
