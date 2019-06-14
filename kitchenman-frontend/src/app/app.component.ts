import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  loggedIn: boolean;

  constructor() { }

  ngOnInit(): void {
    this.loggedIn = true;
  }
}
