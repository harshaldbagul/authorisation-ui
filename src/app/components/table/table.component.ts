import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild  } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @ViewChild('deleteModalContent') deleteModalContent : TemplateRef<any>; // Modal for delete 

  @Input() table_title: string; // Title for the table
  @Input() displayedColumns: string[]; // string[] for table columns
  @Input() dataSource : any[]; // row[] for table 

  @Output() deleteItem : EventEmitter<any> = new EventEmitter(); // callback function for delete row
  @Output() editItem : EventEmitter<any> = new EventEmitter();   // callback function for edit row

  itemToDelete:any; // row to be deleted is stored temporarly before deletion

  /**
   * Creates an instance of TableComponent.
   * @param {NgbModal} modalCtrl used to access modalCtrl. 
   * @memberof TableComponent
   */
  constructor(private modalCtrl: NgbModal) { }

  ngOnInit() {
  }

  /**
   * Opens a delete modal. deleteModalContent is a TemplateRef.
   * sm is passed as a parameter to open small modal
   * @param {*} item
   * @memberof TableComponent
   */
  openDeleteModal(item:any){
    this.itemToDelete = item;
    this.modalCtrl.open(this.deleteModalContent, {size: 'sm'});
    
  }

  /**
   * Sets callback with row object
   * The respective function from the controller recieves the row object and perfroms edit accordingly.
   * This is done because, there is no standard edit dialogue to accomodate row object.
   * @param {*} item
   * @memberof TableComponent
   */
  edit(item:any){
    this.editItem.emit(item);
  }

  /**
   * Upon selecting delete from the Delete-Row-Modal, this function is called.
   * the respective callback function in the controller handles teh row object, and performs delete.
   * @memberof TableComponent
   */
  delete(){
    this.deleteItem.emit(this.itemToDelete);
  }

}
