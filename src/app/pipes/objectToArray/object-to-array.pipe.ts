import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'objectToArray'})
export class ObjectToArrayPipe implements PipeTransform {
  
  /**
   * Pipe to convert a generic object to array of objects => Object : Array[ Object{key,value} ]
   * @param {*} object a generic object with multiple parameters
   * @param {string[]} args Optional
   * @returns {*} object[] of objects {key,value}
   * @memberof ObjectToArrayPipe
   */
  transform( object, args:string[]) : any {

    let objectArrayList = [];

    for (let [key, value] of Object.entries(object)) {
      objectArrayList.push({key: key, value: value});
    }

    return objectArrayList;

  }

}