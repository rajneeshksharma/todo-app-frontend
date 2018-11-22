import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  emptyForm = false;
  signupDone = false;
  constructor(private fb: FormBuilder,private apiService : ApiService) {

    this.signupForm = fb.group({
      'firstName': ['', [
        Validators.required,
        Validators.pattern('^([a-zA-Z]*)$'),
      ]],
      'lastName': ['', [
        Validators.required,
        Validators.pattern('^([a-zA-Z]*)$'),
      ]],
      'email': ['', [
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9.]+)@([a-zA-Z]+)\.([a-zA-Z]{2,5})$')
      ]],
      'password': ['', Validators.compose([
        Validators.required,
        Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}')
      ])],
      'cpassword': ['', [
        Validators.required,
      ]]

    }, { validator: this.passwordMatchValidator });

  }
  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('cpassword').value
      ? null : { 'mismatch': true };
  }

  ngOnInit() {
  }
  onSubmit() {
    if (this.signupForm.valid) {
      let newUserData = {
        firstName : this.signupForm.value.firstName,
        lastName : this.signupForm.value.lastName,
        email : this.signupForm.value.email,
        password : this.signupForm.value.password
      };
      this.apiService.signUp(newUserData).subscribe(
        (res)=>{
          if(res.code === 200){
            this.signupDone = true;
          } else {

          }
        }, (err) => {
          console.log(err);
        }
      );
    } else {
      this.emptyForm = true;
      setTimeout(() => {
        this.emptyForm = false;
      }, 4000);

    }
  }
}
