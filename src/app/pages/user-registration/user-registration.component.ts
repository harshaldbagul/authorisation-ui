import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {UserData} from '../../models/user-registration-page'

import {UserService} from '../../services/User/user.service'
import { ToastrService } from 'ngx-toastr';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';``

import {HttpStatusCode} from '../../utility/HttpStatusCode'

import {GlobalConstants} from '../../utility/global-constants'

/**
 * Page for User Registration
 * @export
 * @class UserRegistrationComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  @ViewChild('editModal') editModal : TemplateRef<any>;

  public userPostData: UserData[];
  public userEditPostData: UserData;

  public tableDisplayColumns: string[];
  public tableDataSource: UserData[];

  // Combo box items
  public selectApps = GlobalConstants.APPS;
  
  /**
   *Creates an instance of UserRegistrationComponent.
   * @param {UserService} userService service implementation for User registration
   * @param {ToastrService} toastr to show toast message
   * @param {NgbModal} modalCtrl to show modal
   * @memberof UserRegistrationComponent
   */
  constructor(private userService: UserService,
              private toastr: ToastrService,
              private modalCtrl: NgbModal) { 

    this.resetUserRegisterForm();

    this.tableDisplayColumns = ["User ID","App Name","Role","Grant"];
  }

  /**
   *
   * Loads user table on Initialization
   * @memberof UserRegistrationComponent
   */
  ngOnInit() {
    this.getUserTable();
  }


  /**
   * Reset's user registration form array
   * 
   * @memberof UserRegistrationComponent
   */
  resetUserRegisterForm(){
    this.userPostData = [];
    
    this.userPostData.push({
      "userId":"",
      "appId":"",
      "role": "",
      "grantAccess": true
    });
  }

  /*****************  Form Functions ***************/


  /**
   *  Checks validity of Form Data
   * @param {UserData[]} userPostData the form row[]
   * @returns
   * @memberof UserRegistrationComponent
   */
  isNotValidFormData(userPostData: UserData[]){
    for(let user of userPostData){
      if(this.isNotValidFormDataUser(user))
        return true;
    }
    return false;
  }

  /** 
   * Checks the validity for user row
   * @param {UserData} user the form row
   * @returns
   * @memberof UserRegistrationComponent
   */
  isNotValidFormDataUser(user: UserData){
    if(user.userId == "" || user.appId =="" || user.role ==""){
      return true;
    }
    return false;
  }

  /**
   * Form submit. Register user
   *
   * @memberof UserRegistrationComponent
   */
  registerUser(){
    
    if(this.isNotValidFormData(this.userPostData) ){
      this.toastr.error('Please fill all the fields in the user registration form','Missing Values');
      return;
    }

    this.userService.create(this.userPostData).subscribe( (res:any)=>{
      
      if(res.status == HttpStatusCode.HTTP_OK){
        
        this.toastr.success('User Registered', '');
        this.getUserTable();
        this.resetUserRegisterForm();
          
      } 

    }, err=>{
        this.toastr.error( err.error,'Error');
    })

  }


  /**
   * 
   * add button implemention. Add's new user
   * @memberof UserRegistrationComponent
   */
  addUserForm(){
    this.userPostData.push({
      "userId":"",
      "appId":"",
      "role": "",
      "grantAccess": true
     });
  }

  /**
   * delete button implementation for user table form.
   * @param {*} user the row to be removed
   * @memberof UserRegistrationComponent
   */
  deleteUserForm(user){
    let index = this.userPostData.indexOf(user);
    if(index > -1){
        this.userPostData.splice(index, 1);
    }
  }
  /*****************  /. Form Functions ***************/

 

  /*****************   Table Functions ***************/
  /**
   * gets user list.
   * @memberof UserRegistrationComponent
   */
  getUserTable(){

    this.userService.read().subscribe((res: any) => {
      this.tableDataSource = res;
    }, err => {
      console.log(err);
    });

  }

  /**
   * handler for delete call back funciton in <app-table>
   *
   * @param {UserData} item delete item row
   * @memberof UserRegistrationComponent
   */
  deleteUserTableItem(item: UserData){
    this.userService.delete(item).subscribe( (res:any)=>{
    
      if(res.status == HttpStatusCode.HTTP_OK){
        
        this.toastr.success('User Deleted', '');
        this.getUserTable();

      } 

    },err=>{
        this.toastr.error( err.error,'Error');
    } )
  }


  /**
   *
   * handlre for edit call back function in <app-table>
   * @param {*} item edit item row
   * @memberof UserRegistrationComponent
   */
  editUserTableItem(item){
    this.openEditModal(item);
  }
  /*****************  /. Table Functions ***************/



  /*****************   Modal Functions ***************/
  /**
   *  open edit Modal with edit data.
   * @param {UserData} editItem 
   * @memberof UserRegistrationComponent
   */
  openEditModal(editItem:UserData){
    this.userEditPostData = editItem;
    this.modalCtrl.open(this.editModal,{size: 'lg'});
  }


  /**
   * saves edit Modal data into db.
   *
   * @memberof UserRegistrationComponent
   */
  saveEditModal(){

    this.userService.update(this.userEditPostData).subscribe((res:any)=>{
        
      if(res.status == HttpStatusCode.HTTP_OK){
        this.getUserTable();
        this.modalCtrl.dismissAll();
        this.toastr.info('User updated Successfully', '');

      } 

    },err=>{
      console.log(err);
      this.toastr.error( err.error,'Error');
    });


  }
  /*****************  /. Modal Functions ***************/

}
