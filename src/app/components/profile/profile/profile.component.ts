import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { HeaderComponent } from 'src/app/header/header.component';
import { VolunteerService } from 'src/app/services/volunteer.service';
import Swal from 'sweetalert2';
import { Volunteer } from './volunteer-request.payload';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    volunteer: Volunteer;
    isList: any;
    subList = 3;
    region: number;
    myForm:FormGroup;
    date: any;
    form = new FormGroup({
      gender: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    disabled = false;
    ShowFilter = false;
    limitSelection = false;
    categories: Array<any> = [];
    categoriesIds: Array<any> = [];
    selectedItems: Array<any> = [];
    dropdownSettings: any = {};
    today: string;
    dateBirth: string;
    firstName: string;
    lastName: string;
    role:number;
    email: string;
    username: string;
    experience: number;
    description: string;
    categoryObject: Array<any> = [];
    createdDate: string;
    types: Array<any> = [];
    phone: string;
    categoryNames: Array<any> = [];
    companyTypeNames: Array<any> = [];
    gender: string;

  constructor(private fb: FormBuilder, private volunteerService: VolunteerService, private router: Router, private toastr: ToastrService, private localStorage: LocalStorageService
    ) { 
    this.volunteer = {
      birthDate: '',
      volunteeringCategories: [],
      region: 0,
      sex: true,
      experience: 0,
      description: ''
    };
    this.role = this.getRole();
  }

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
  this.types = [
    { item_id: 1, item_text: 'Associatio' },
    { item_id: 2, item_text: 'Gov' },
    { item_id: 3, item_text: 'Business' },
    { item_id: 4, item_text: 'University' },
    { item_id: 5, item_text: 'Medical' },
    { item_id: 6, item_text: 'Young' },
    { item_id: 7, item_text: 'NGOs' },
    { item_id: 8, item_text: 'Citizens' },
    { item_id: 9, item_text: 'Media' },
    { item_id: 10, item_text: 'Social' },
    { item_id: 11, item_text: 'Other' }
];
  this.selectedItems = [];
            this.dropdownSettings = {
                singleSelection: false,
                idField: 'item_id',
                textField: 'item_text',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 4,
                allowSearchFilter: this.ShowFilter
            };
            this.myForm = this.fb.group({
                category: [this.selectedItems]
            });
            this.role = this.getRole();
            this.firstName = this.localStorage.retrieve('firstName');
            this.lastName = this.localStorage.retrieve('lastName');
            this.email = this.localStorage.retrieve('email');
            this.username = this.localStorage.retrieve('username');
            this.description = this.localStorage.retrieve('description');
            this.createdDate = this.localStorage.retrieve('createdDate').split('T')[0];
            this.phone = this.localStorage.retrieve('phone');
            this.categoryNames = this.getCategories();
            this.gender = this.localStorage.retrieve('gender');
            this.dateBirth = this.localStorage.retrieve('birthDate').split('T')[0];
            this.experience = this.localStorage.retrieve('experience');
            this.companyTypeNames = this.getCompanyTypes();
            console.log(this.phone);
  }
  onItemSelect(item: any) {
    console.log('onItemSelect', item);
    console.log(Object.values(item)[0]);
    this.categoriesIds.push(Object.values(item)[0]);
}
public onDeSelect(item: any) {
  console.log(item);
  this.categoriesIds.pop();
}

getCategory(id_field: number) : string {
  var categoryName = this.categories.find(i => i.item_id === id_field)[1];
  return categoryName;
}
onSelectAll(items: any) {
    console.log('onSelectAll', items);
}
public onDeSelectAll(items: any) {
  console.log(items);
}
toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
}

getRole() :number {
  return this.localStorage.retrieve('role');
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

getCompanyTypes(): Array<any> {
  var retrievedData = this.localStorage.retrieve("organizationTypes");
  var companyTypeIds = retrievedData;
  console.log(companyTypeIds);
  for(var i = 0; i < this.types.length; i++) {
    var companyTypeName: string = "";
    for(var j = 0; j<companyTypeIds.length; j++) {
      if(this.types[i].item_id === companyTypeIds[j]) {
        companyTypeName = this.types[i].item_text;
        this.companyTypeNames.push(companyTypeName);
      }
    }
    
  }
  console.log(this.companyTypeNames);
  return this.companyTypeNames; 
}

createVolunteer() {
  // console.log(this.region);
  console.log(this.categoriesIds);
  // console.log(this.form.get('gender').value);
  this.dateBirth = this.today = new Date().toISOString().split('T')[0];
  // console.log(this.today = new Date().toISOString().split('T')[0]);
  // console.log(this.form.get('description').value);
  this.volunteer.region = this.region;
  for(var i = 0; i < this.categoriesIds.length; i++) {
    var category = this.categoriesIds[i];
    this.volunteer.volunteeringCategories.push(category);
  }
  console.log(this.volunteer.volunteeringCategories);
  // this.volunteer.volunteeringCategories = this.categoriesIds;
  this.volunteer.description = this.form.get('description').value;
  this.volunteer.sex = this.isMale();
  this.volunteer.birthDate = this.dateBirth;
  this.volunteer.experience = this.experience;
  this.volunteerService.createVolunteerProfile(this.volunteer)
      .subscribe(data => {
        this.router.navigate(['/login']);
        //   { queryParams: { registered: 'true' } });
          Swal.fire('You have successfully created a volunteer profile!', 'Explore and apply to events!', 'success').then((result) => {
            // this.header.logout();
            location.reload();
          });
      }
      , error => {
        console.log(error);
        this.toastr.error('Registration Failed! Please try again');
      });
}

isMale(): boolean {
  if(this.form.get('gender').value == 'female') {
    return false;
  }
  return true;
}

selectChangeHandler (event: any) {
  this.region = event.target.value;
}

selectChangeHandlerExpi(event: any) {
  this.experience = event.target.value;
}

handleLimitSelection() {
    if (this.limitSelection) {
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
}

getCeo() {
  return this.localStorage.retrieve('ceo');
}

getOrganizationName() {
  return this.localStorage.retrieve('organizationName');
}

getLocation() {
  return this.localStorage.retrieve('location');
}

getDescription() {
  return this.localStorage.retrieve('description');
}

getLogo() {
  return this.localStorage.retrieve('logo');
}

getCategoryList() {
  return this.localStorage.retrieve('categories');
}

getImage() {
  return this.localStorage.retrieve('image');
}

}
