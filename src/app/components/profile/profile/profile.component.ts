import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    isList: any;
    subList = 3;

  constructor() { }

  ngOnInit(): void {
  }

}
