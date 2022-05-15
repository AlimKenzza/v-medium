import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from '../../shared/auth.service';
import { SignupRequestPayload } from './signup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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
    preferLanguage: ''
  };

}

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      preferLanguage: new FormControl('', Validators.required)
    });
  }

  signup() {
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.firstName = this.signupForm.get('firstName').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;
    this.signupRequestPayload.lastName = this.signupForm.get('lastName').value;
    this.signupRequestPayload.preferLanguage = "ru";
    this.signupRequestPayload.phone = this.signupForm.get('phone').value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(data => {
        this.router.navigate(['/login'],
          { queryParams: { registered: 'true' } });
          Swal.fire('Вы зарегистрировались!', 'Проверьте свою почту!', 'success').then((result) => {
            location.reload();
          });
      }
      , error => {
        console.log(error);
        this.toastr.error('Registration Failed! Please try again');
      });
  }


}
