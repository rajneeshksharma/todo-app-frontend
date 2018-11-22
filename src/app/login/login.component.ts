import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { SocialAuthService , GoogleLoginProvider } from 'ng-social';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emptyForm = false;
  name: string;
  fullName: string[];
  firstName: string;
  lastName: string;
  userSocial_id: string;
  constructor(private fb: FormBuilder, private apiService : ApiService, private router : Router, private socialAuthService: SocialAuthService) {
    this.emptyForm =false;
    this.loginForm = fb.group({
      'email': ['', [
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9.]+)@([a-zA-Z]+)\.([a-zA-Z]{2,5})$')
      ]],
      'password': ['', [
        Validators.required,
        Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}')
      ]]
    });
   }


  public socialLogin(platform: string) {
    let socialPlatformProvider;

    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then((userData) => {

      this.name = userData.name;
      this.fullName = this.name.split(' ');
      this.firstName = this.fullName[0];
      this.lastName = this.fullName[this.fullName.length - 1];
      // tslint:disable-next-line:max-line-length
      console.log(platform + ' login in data : ', userData, userData.email, userData.id, this.firstName, this.lastName);
      this.userSocial_id = userData.id;
      const socialUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: userData.email,
        social_id: userData.id,
        provider: userData.provider
      };
      console.log(socialUser);


      this.apiService.social(socialUser).subscribe(
        (res) => {
          if(res.code === 200){
            localStorage.setItem('token', res.data[0].token);
            this.router.navigate(['/chat']);
          } else {
            console.log(res.message);
          }
        },err=>{
          console.log(err,"error");
        }
      );

    }).catch(err => {console.error(err);});
  }


  ngOnInit() {
  }
  onSubmit() {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);
      this.apiService.logIn(this.loginForm.value).subscribe(
       (res) => {
        if(res.code === 200){
          localStorage.setItem('token', res.data[0].token);
          this.router.navigate(['/chat']);
        } else {
          console.log(res.message);
        }
      },err=>{
        console.log(err,"error");
      }
    
      );
    }
    else {
      this.emptyForm =true;
      setTimeout(() => {
        this.emptyForm =false;
      }, 4000);
      
    }
  }
}
