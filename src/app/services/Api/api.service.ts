import { Injectable } from '@angular/core';
import { RestApiService } from '../rest-api/rest-api.service';

import {APIData,APITableItem} from '../../models/api-registration-page'

/**
 * A Service Class to handle CRUD for API page.
 *
 * @export
 * @class ApiService
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private restApiService: RestApiService) { }


  /**
   *
   * Creation of API
   * @param {APIData} postData creation form data  
   * @returns
   * @memberof ApiService
   */
  create(postData: APIData){
    return this.restApiService.post('apis', postData, {observe: 'response'});
  }

  /**
   *
   * read the list of API's
   * @returns
   * @memberof ApiService
   */
  read(){
    return this.restApiService.get('getApis');
  }

 
  update(editData: APITableItem){
    return this.restApiService.post('editApi', editData, {observe: 'response'});
  }

  /**
   * delete a row from the table.
   * @param {APITableItem} deleteData post data for delete
   * @returns
   * @memberof ApiService
   */
  delete(deleteData: APITableItem){
    return this.restApiService.post('deleteApi', deleteData, {observe: 'response'});
  }
  
}
