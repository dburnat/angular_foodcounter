import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  userProfile: any;
  todaysCalories: number;
  addFoodForm: FormGroup;
  date : string;
  foodList: Observable<any>;


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
      }),
      tap(ret => console.log(ret)),
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
    this.authService.AddFood(this.authService.userData, this.addFoodForm.value);
  }


  OnDeleteButtonClick(food){
    console.log(food);
    this.todaysCalories -= +this.addFoodForm.value.calories;
    this.authService.DeleteFood(this.authService.userData, food);
  }



  returnconsole(){
    console.log('kappa');
  }
}
