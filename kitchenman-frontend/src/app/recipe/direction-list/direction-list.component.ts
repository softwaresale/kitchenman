import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-direction-list',
  templateUrl: './direction-list.component.html',
  styleUrls: ['./direction-list.component.sass']
})
export class DirectionListComponent implements OnInit {

  @Input() directions: string[];

  constructor() { }

  ngOnInit() {
  }

}
