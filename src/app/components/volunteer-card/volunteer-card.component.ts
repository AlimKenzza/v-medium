import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { throwError } from 'rxjs';
import { OrganizationService } from 'src/app/services/organization.service';
import { VolunteerResponse } from 'src/app/services/volunteer-response.payload';
import { VolunteerService } from 'src/app/services/volunteer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-volunteer-card',
  templateUrl: './volunteer-card.component.html',
  styleUrls: ['./volunteer-card.component.css']
})
export class VolunteerCardComponent implements OnInit {
  volunteerId: number;
  volunteer: VolunteerResponse;
  categoryNames: Array<any> = [];
  categoriesMap: Array<any> = [];
  categories: Array<any> = [];
  regions: Array<any> = [];
  region: number;
  regionName: string;

  constructor(private volunteerService: VolunteerService, private activateRoute: ActivatedRoute, private router: Router, private toastr: ToastrService
    , private localStorage: LocalStorageService, private companyService: OrganizationService) { 
      this.volunteerId = this.activateRoute.snapshot.params.id;
    }

  ngOnInit(): void {
    this.getVolunteerById();
    this.categoriesMap = [
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
  this.regions = [
    { item_id: 1, item_text: 'Nur-Sultan' },
    { item_id: 2, item_text: 'Almaty' },
    { item_id: 3, item_text: 'Shymkent' },
    { item_id: 4, item_text: 'Pavlodar' },
    { item_id: 5, item_text: 'Almaty region' },
    { item_id: 6, item_text: 'Aktobe ' },
    { item_id: 7, item_text: 'Kostanay' },
    { item_id: 8, item_text: 'Kyzylorda' },
    { item_id: 9, item_text: 'Atyrau' },
    { item_id: 10, item_text: 'West Kazakhstan' },
    { item_id: 11, item_text: 'Akmola' },
    { item_id: 12, item_text: 'Karaganda' },
    { item_id: 13, item_text: 'North Kazakhstan' },
    { item_id: 14, item_text: 'Mangystau' },
    { item_id: 15, item_text: 'Turkestan' },
    { item_id: 16, item_text: 'Zhambyl' }
];
  }

  private getVolunteerById() {
    this.volunteerService.getVolunteerById(this.volunteerId).subscribe(data => {
      console.log(data);
      this.volunteer = data;
      this.categories = data.volunteeringCategories;
      this.region = data.region;
      for(var i = 0; i < this.categoriesMap.length; i++) {
        var categoryName: string = "";
        for(var j = 0; j<this.categories.length; j++) {
          if(this.categoriesMap[i].item_id === this.categories[j]) {
            categoryName = this.categoriesMap[i].item_text;
            this.categoryNames.push(categoryName);
          }
        }    
      }
      for (var i = 0; i < this.regions.length; i++) {
        if(this.regions[i].item_id == this.region) {
          this.regionName = this.regions[i].item_text;
        }
      }
      console.log(this.categoryNames);
      return this.categoryNames;
    }, error => {
      throwError(error);
    });
  }

  inviteVolunteer() {
    this.companyService.inviteVolunteer(this.volunteerId)
      .subscribe(data => {
        this.router.navigate(['/volunteers'],
          { queryParams: { requested: 'true' } });
          Swal.fire('You have successfully invited volunteer!', 'Be in touch', 'success').then((result) => {
            location.reload();
          });
      }
      , error => {
        console.log(error);
        this.toastr.error('Request failed! Please try again');
      });

  }
}
