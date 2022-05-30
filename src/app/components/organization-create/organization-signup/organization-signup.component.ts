import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { OrganizationService } from 'src/app/services/organization.service';
import { VolunteerService } from 'src/app/services/volunteer.service';
import Swal from 'sweetalert2';
import { Volunteer } from '../../profile/profile/volunteer-request.payload';
import { Organization } from '../organization-request.payload';

@Component({
  selector: 'app-organization-signup',
  templateUrl: './organization-signup.component.html',
  styleUrls: ['./organization-signup.component.css']
})
export class OrganizationSignupComponent implements OnInit {
    organization: Organization;
    isList: any;
    subList = 3;
    region: number;
    myForm:FormGroup;
    myForm2:FormGroup;
    date: any;
    form = new FormGroup({
      location: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
      ceo: new FormControl('', Validators.required),
      logo: new FormControl('', Validators.required)
    });
    disabled = false;
    ShowFilter = false;
    limitSelection = false;
    categories: Array<any> = [];
    types: Array<any> = [];
    categoriesIds: Array<any> = [];
    organizationTypeIds: Array<any> = [];
    selectedItems: Array<any> = [];
    selectedItems2: Array<any> = [];
    dropdownSettings: any = {};
    dropdownSettings2: any = {};
    today: string;
    dateOrganized: string;
    firstName: string;
    lastName: string;
    experience: number;
    role:number;
    email: string;
    username: string;
    description: string;
    categoryObject: Array<any> = [];
    createdDate: string;
    phone: string;
    categoryNames: Array<any> = [];
    companyTypeNames: Array<any> = [];

  constructor(private fb: FormBuilder, private volunteerService: VolunteerService, private organizationService: OrganizationService, private router: Router, private toastr: ToastrService, private localStorage: LocalStorageService) { 
    this.organization = {
      organizedDate: '',
      volunteeringCategories: [],
      region: 0,
      location: '',
      experience: 0,
      description: '',
      ceo: '',
      organizationTypes: [],
      organizationName: '',
      logo: ''
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
  this.selectedItems2 = [];
            this.dropdownSettings = {
                singleSelection: false,
                idField: 'item_id',
                textField: 'item_text',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 4,
                allowSearchFilter: this.ShowFilter
            };
            this.dropdownSettings2 = {
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
            this.myForm2 = this.fb.group({
              organizationType: [this.selectedItems2]
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
            this.companyTypeNames = this.getCompanyTypes();
            console.log(this.phone);
  }
  onItemSelect(item: any) {
    console.log('onItemSelect', item);
    console.log(Object.values(item)[0]);
    this.categoriesIds.push(Object.values(item)[0]);
}
onItemSelectType(item: any) {
  console.log('onItemSelectType', item);
  console.log(Object.values(item)[0]);
  this.organizationTypeIds.push(Object.values(item)[0]);
}
public onDeSelectAll(items: any) {
  console.log(items);
}

public onDeSelect(item: any) {
  console.log(item);
  this.categoriesIds.pop();
}

public onDeSelectAllTypes(items: any) {
  console.log(items);
}

public onDeSelectType(item: any) {
  console.log(item);
  this.organizationTypeIds.pop();
}

getCategory(id_field: number) : string {
  var categoryName = this.categories.find(i => i.item_id === id_field)[1];
  return categoryName;
}
onSelectAll(items: any) {
    console.log('onSelectAll', items);
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

createOrganization() {
  // console.log(this.region);
  console.log(this.categoriesIds);
  console.log(this.organizationTypeIds);
  // console.log(this.form.get('gender').value);
  this.dateOrganized = this.today = new Date().toISOString().split('T')[0];
  // console.log(this.today = new Date().toISOString().split('T')[0]);
  // console.log(this.form.get('description').value);
  this.organization.region = this.region;
  for(var i = 0; i < this.categoriesIds.length; i++) {
    var category = this.categoriesIds[i];
    this.organization.volunteeringCategories.push(category);
  }
  for(var i = 0; i < this.organizationTypeIds.length; i++) {
    var type = this.organizationTypeIds[i];
    this.organization.organizationTypes.push(type);
  }
  console.log(this.organization.volunteeringCategories);
  console.log(this.organization.organizationTypes);
  // this.volunteer.volunteeringCategories = this.categoriesIds;
  this.organization.description = this.form.get('description').value;
  this.organization.organizedDate = this.dateOrganized;
  this.organization.experience = this.experience;
  this.organization.location = this.form.get('location').value;
  this.organization.organizationName = this.form.get('companyName').value;
  this.organization.logo = this.form.get('logo').value;
  this.organization.ceo = this.form.get('ceo').value;
  this.organizationService.createOrganizationProfile(this.organization)
      .subscribe(data => {
        this.router.navigate(['/'],
          { queryParams: { registered: 'true' } });
          Swal.fire('Your request for creating organization profile has been accepted!', 'Our Admin will validate your request as soons as possible!', 'success').then((result) => {
            location.reload();
          });
      }
      , error => {
        console.log(error);
        this.toastr.error('Registration Failed! Please try again');
      });
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
        this.dropdownSettings2 = Object.assign({}, this.dropdownSettings2, { limitSelection: 2 });
    } else {
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
        this.dropdownSettings2 = Object.assign({}, this.dropdownSettings2, { limitSelection: null });
    }
}

}
