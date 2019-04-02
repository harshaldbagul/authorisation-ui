import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.css']
})
export class InfoBarComponent implements OnInit {

  @Input() message: string; // the info message to show inside the bar

  constructor() { }

  ngOnInit() {
  }

}
