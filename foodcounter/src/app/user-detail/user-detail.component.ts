import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  myForm: FormGroup;
  loginForm: FormGroup


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      firstName: '',
      lastName: '',
      weight: ['',[ Validators.required] ],
      goalWeight: ['',[ Validators.required] ],
      dailyCalories: ['',[ Validators.required] ],
    });
    this.loginForm = this.fb.group({
      login: '',
      password: '',
      email: ''
    })
  }

  get weight(){
    return this.myForm.get('weight');
  }
  get goalWeight(){
    return this.myForm.get('goalWeight');
  }
  get dailyCalories(){
    return this.myForm.get('dailyCalories');
  }

}
