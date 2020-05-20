import { Injectable } from '@angular/core';
import { RestApiService } from '../rest-api/rest-api.service';

import {UserData} from '../../models/user-registration-page'


/**
 *
 * A Service Class to handle CRUD for User page.
 * @export
 * @class UserService
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private restApiService: RestApiService) { }

  
  /**
   * Creation of User 
   * @param {UserData[]} postData
   * @returns
   * @memberof UserService
   */
  create(postData: UserData[]){
    return this.restApiService.post('users', postData, {observe: 'response'});
  }

  /**
   *
   * read a list of users
   * @returns
   * @memberof UserService
   */
  read(){
    return this.restApiService.get('getUsers');
  }

  update(editData: UserData){
    return this.restApiService.post('editUser', editData, {observe: 'response'});

  }

  /**
   *
   * delete a table row 
   * @param {UserData} deleteData form data for delete row
   * @returns
   * @memberof UserService
   */
  delete(deleteData: UserData){
    return this.restApiService.post('deleteUser', deleteData, {observe: 'response'});
  }
  

}
