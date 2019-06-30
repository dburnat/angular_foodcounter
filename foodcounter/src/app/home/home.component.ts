import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userProfile: any;
  todaysCalories: any;
  addFoodForm: FormGroup


  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    private fb: FormBuilder

  )
  {
     this.userProfile = this.authService.GetUserProfile(this.authService.userData);
     this.todaysCalories = 0;
    }



  ngOnInit() {
    this.addFoodForm = this.fb.group({
      foodName: ['', [Validators.required]],
      calories:['', [Validators.required]]
    });
  }

  public checkFormFields(): boolean{
    const invalid =[];
    const controls = this.addFoodForm.controls;
    for(const name in controls){
      if(controls[name].invalid){
        invalid.push(name);
      }
    }
    if(invalid.length > 0){
      return true;
    }
    else
      return false;
  }

  OnAddButtonClick(){
    this.authService.AddFood(this.authService.userData, this.addFoodForm.value);
  }



  returnconsole(){
    console.log('kappa');
  }
}
