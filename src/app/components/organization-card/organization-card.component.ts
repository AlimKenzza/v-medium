import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { throwError } from 'rxjs';
import { OrganizationListRequest } from 'src/app/model/organization-getlist.payload';
import { MembershipService } from 'src/app/services/membership.service';
import { OrganizationService } from 'src/app/services/organization.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-organization-card',
  templateUrl: './organization-card.component.html',
  styleUrls: ['./organization-card.component.css']
})
export class OrganizationCardComponent implements OnInit {
  organization: OrganizationListRequest;
  companyId: number;
  categoryNames: Array<any> = [];
  companyTypeNames: Array<any> = [];
  categoriesMap: Array<any> = [];
  types: Array<any> = [];
  categories: Array<any> = [];
  companyTypeIds: Array<any> = [];
  regions: Array<any> = [];
  region: number;
  regionName: string;
  
  constructor(private activateRoute: ActivatedRoute, private router: Router, private toastr: ToastrService
    , private localStorage: LocalStorageService, private organizationService: OrganizationService, private membershipService: MembershipService) {
      this.companyId = this.activateRoute.snapshot.params.id;
     }

  ngOnInit(): void {
    this.getOrganizationById();
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
  }


  private getOrganizationById() {
    this.organizationService.getOrganizationById(this.companyId).subscribe(data => {
      this.organization = data;
      this.categories = data.volunteeringCategories;
      this.companyTypeIds = data.organizationTypes;
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
      for(var i = 0; i < this.types.length; i++) {
        var companyTypeName: string = "";
        for(var j = 0; j< this.companyTypeIds.length; j++) {
          if(this.types[i].item_id === this.companyTypeIds[j]) {
            companyTypeName = this.types[i].item_text;
            this.companyTypeNames.push(companyTypeName);
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

  requestMembership() {
    console.log(this.companyId);
    this.membershipService.requestMembership(this.companyId)
      .subscribe(data => {
        this.router.navigate(['/organization/companyId'],
          { queryParams: { requested: 'true' } });
          Swal.fire('You have successfully created membership request!', 'Be ready', 'success').then((result) => {
            location.reload();
          });
      }
      , error => {
        console.log(error);
        this.toastr.error('Request failed! Please try again');
      });

  }

}
