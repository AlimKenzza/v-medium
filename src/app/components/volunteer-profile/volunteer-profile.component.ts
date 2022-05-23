import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-volunteer-profile',
  templateUrl: './volunteer-profile.component.html',
  styleUrls: ['./volunteer-profile.component.css']
})
export class VolunteerProfileComponent implements OnInit {

  role: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  description: string;
  createdDate: string;
  phone: string;
  birthDate: string;
  categoryNames: Array<any> = [];
  categories: Array<any> = [];
  gender: string;


  constructor(private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.categories = [
      { item_id: 1, item_text: 'Medicine' },
      { item_id: 2, item_text: 'Ecology' },
      { item_id: 3, item_text: 'Social' },
      { item_id: 4, item_text: 'Media' },
      { item_id: 5, item_text: 'Event' },
      { item_id: 6, item_text: 'Animal ' },
      { item_id: 7, item_text: 'Emergency' },
      { item_id: 8, item_text: 'Culture' },
      { item_id: 9, item_text: 'Donation' },
      { item_id: 10, item_text: 'Pro_bono' },
      { item_id: 11, item_text: 'Corporate' },
      { item_id: 12, item_text: 'Online' },
      { item_id: 13, item_text: 'Ethno' },
      { item_id: 14, item_text: 'Sport' }
  ];
            this.role = this.getRole();
            this.firstName = this.localStorage.retrieve('firstName');
            this.lastName = this.localStorage.retrieve('lastName');
            this.email = this.localStorage.retrieve('email');
            this.username = this.localStorage.retrieve('username');
            this.description = this.localStorage.retrieve('description');
            this.createdDate = this.localStorage.retrieve('createdDate').split('T')[0];
            this.phone = this.localStorage.retrieve('phone');
            this.birthDate = this.localStorage.retrieve('birthDate').split('T')[0];
            this.gender = this.localStorage.retrieve('gender');
            this.categoryNames = this.getCategories();
  }

  getCategories(): Array<any> {
    var retrievedData = this.localStorage.retrieve("categories");
    var categoryIds = retrievedData;
    console.log(categoryIds);
    for(var i = 0; i < this.categories.length; i++) {
      var categoryName: string = "";
      for(var j = 0; j<categoryIds.length; j++) {
        if(this.categories[i].item_id === categoryIds[j]) {
          categoryName = this.categories[i].item_text;
          this.categoryNames.push(categoryName);
        }
      }
      
    }
    console.log(this.categoryNames);
    return this.categoryNames; 
  }

  getRole() :number {
    return this.localStorage.retrieve('role');
  }

}
