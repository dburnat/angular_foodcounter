import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  userProfile: any;
  todaysCalories: any;
  addFoodForm: FormGroup;
  date : string;
  foodList: Observable<any>;
  user: any


  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    private fb: FormBuilder,
    private datePipe : DatePipe

  )
  {
     this.userProfile = this.authService.GetUserProfile(this.authService.userData);
     this.todaysCalories = 0;
     this.user =  this.authService.GetUserProfile(this.authService.userData).pipe(take(1)).subscribe(value => this.todaysCalories = value);
     console.log(this.user);
    this.date = this.datePipe.transform(new Date(), 'dd-MM-yyyy' );
    }



  ngOnInit() {
    this.addFoodForm = this.fb.group({
      foodName: ['', [Validators.required]],
      calories:['', [Validators.required]],
      date: this.date
    });

    this.foodList = this.authService.GetFoods(this.authService.userData, this.date)
    .pipe(
      map(docList =>{
        return docList.map(doc=>{
          return{
            ...doc.payload.doc.data(),
            id: doc.payload.doc.id
          };
        });
      })
    );

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
    this.todaysCalories += +this.addFoodForm.value.calories;
    this.authService.UpdateCalories(this.authService.userData,this.addFoodForm.value);
    this.authService.AddFood(this.authService.userData, this.addFoodForm.value);
  }


  OnDeleteButtonClick(food){
    this.todaysCalories -= +this.addFoodForm.value.calories;
    this.authService.DeleteFood(this.authService.userData, food);
  }

}
