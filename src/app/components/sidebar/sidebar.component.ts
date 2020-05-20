import { Component, OnInit, Input } from '@angular/core';
import {SideBarItem} from '../../models/sidebar-component'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  @Input() items: SideBarItem[]; // Hardcoded sidebar values
  @Input() active: number;       // Index of active sidebar item

  ngOnInit() {
    
    this.items = [ {"name":'App Registration', "url":'/app-registration'},
                   {"name":'API Registration', "url":'/api-registration'},
                   {"name":'User Registration', "url":'/user-registration'}
                 ];

  }

}
