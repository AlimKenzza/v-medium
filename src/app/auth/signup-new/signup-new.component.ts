import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './signup-request.payload';

@Component({
  selector: 'app-signup-new',
  templateUrl: './signup-new.component.html',
  styleUrls: ['./signup-new.component.css']
})
export class SignupNewComponent implements OnInit {

  signupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup;


  constructor(private authService: AuthService, private router: Router,
    private toastr: ToastrService
) { 
  this.signupRequestPayload = {
    firstName: '',
    email: '',
    password: '',
    lastName: '',
    phone: '',
    confirmPassword: '',
    login: '',
    role: 0,
    avatar: ''
  };

}

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      login: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      avatar: new FormControl('', Validators.required)
    });
  }

  signup() {
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.firstName = this.signupForm.get('firstName').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;
    this.signupRequestPayload.lastName = this.signupForm.get('lastName').value;
    this.signupRequestPayload.login = this.signupForm.get('login').value;
    this.signupRequestPayload.role = 0;
    this.signupRequestPayload.confirmPassword = this.signupForm.get('confirmPassword').value;
    this.signupRequestPayload.phone = this.signupForm.get('phone').value;
    this.signupRequestPayload.avatar = this.signupForm.get('avatar').value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(data => {
        this.router.navigate(['/login'],
          { queryParams: { registered: 'true' } });
          Swal.fire('Registration successfull!', 'Complete your profile', 'success').then((result) => {
            location.reload();
          });
      }
      , error => {
        console.log(error);
        this.toastr.error('Registration Failed! Please try again');
      });
  }
}
