import { Component, OnInit, Input } from '@angular/core';
import { Action } from '../action';

@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.css']
})
export class ActionCardComponent implements OnInit {

  @Input() action: Action;

  constructor() { }

  ngOnInit() {
  }

}
