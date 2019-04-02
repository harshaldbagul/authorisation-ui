import { Injectable } from '@angular/core';
import { RestApiService } from '../rest-api/rest-api.service';

import {ApplicationData} from '../../models/app-registration-page'



/**
 *
 * A Service Class to handle CRUD for App page.
 * @export
 * @class ApplicationService
 */
@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private restApiService: RestApiService) { }

  /**
   * Creation of Application
   *
   * @param {ApplicationData} postData  creation form data 
   * @returns
   * @memberof ApplicationService
   */
  create(postData: ApplicationData){
    return this.restApiService.post('applications', postData, {observe: 'response'});
  }

  /**
   *
   * Reads apps list.
   * @returns
   * @memberof ApplicationService
   */
  read(){
    return this.restApiService.get('getApps');
  }

  update(editData: ApplicationData){
    return this.restApiService.post('editApp', editData, {observe: 'response'});

  }

  /**
   * delete a row from app list.
   *
   * @param {ApplicationData} deleteData
   * @returns
   * @memberof ApplicationService
   */
  delete(deleteData: ApplicationData){
    return this.restApiService.post('deleteApp', deleteData, {observe: 'response'});
  }

}
