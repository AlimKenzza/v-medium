import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
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
    role:number;

  constructor(private fb: FormBuilder, private volunteerService: VolunteerService, private router: Router, private toastr: ToastrService, private localStorage: LocalStorageService) { 
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
  }
  onItemSelect(item: any) {
    console.log('onItemSelect', item);
    console.log(Object.values(item)[0]);
    this.categoriesIds.push(Object.values(item)[0]);
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
  this.volunteer.experience = 0;
  this.volunteerService.createVolunteerProfile(this.volunteer)
      .subscribe(data => {
        this.router.navigate(['/login'],
          { queryParams: { registered: 'true' } });
          Swal.fire('Вы успешно создали волонтерский профиль!', 'Творите добро!', 'success').then((result) => {
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

handleLimitSelection() {
    if (this.limitSelection) {
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
}

}
