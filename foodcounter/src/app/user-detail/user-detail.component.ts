import { AuthService } from './../auth.service';
import { Component, OnInit, DoCheck, AfterContentInit, AfterContentChecked, OnChanges } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit,OnChanges{

  myForm: FormGroup;
  userId:any;
  userProfile: any;


  constructor(private fb: FormBuilder,
    public authService: AuthService,
    ) {

      this.userProfile = this.authService.GetUserProfile(this.authService.userData);
     }

    ngOnChanges(){

    }
    ngOnInit() {
      this.myForm = this.fb.group({
        firstName: '',
        lastName: '',
        weight: ['',[ Validators.required] ],
        goalWeight: ['',[ Validators.required] ],
        dailyCalories: ['',[ Validators.required] ],
      });

      // this.userProfile = this.authService.GetUserProfile(this.authService.userData);

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
