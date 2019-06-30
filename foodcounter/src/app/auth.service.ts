import { Food } from './shared/services/food';
import { AuthGuard } from './auth.guard';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, merge} from 'rxjs';
import { auth } from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User}  from './shared/services/user'


 @Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; //save logged in user data
  userProfile: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
    ) {
      // saving user's data in localstorage when logged and removing it when logged out
      this.afAuth.authState.subscribe(user =>{
        if(user){
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        }
        else{
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })

    }

    //Method used to login with email:password
    Login(email, password) {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['home']);
          });
          this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error.message)
        })
    }
    //Method used to register new user
    Register(email,password){
      return this.afAuth.auth.createUserWithEmailAndPassword(email,password)
        .then((result) =>{
          //call method to verificate email and that returns a promise
          this.SendVerificationMail();
          this.SetUserData(result.user);
        }).catch((error) =>{
          window.alert(error.message)
        })
    }

    SendVerificationMail(){
      return this.afAuth.auth.currentUser.sendEmailVerification()
        .then(() =>{
          this.router.navigate(['verify-email']);
        })
    }

    ForgotPassword(passwordResetEmail){
      return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
        .then(()=>{
          window.alert('Email resetujący hasło zostal wysłany na podany adres, sprawdź swoją pocztę.')
        }).catch((error)=>{
          window.alert(error)
        })
    }

    //Returns true when user is logged in and email is verified
    get isLoggedIn():boolean{
      const user = JSON.parse(localStorage.getItem('user'));
      return (user !== null && user.emailVerified !== false) ? true : false;
    }

    //google login authorization
    GoogleAuth(){
      return this.AuthLogin(new auth.GoogleAuthProvider());
    }

    //logic for running different providers
    AuthLogin(provider){
      return this.afAuth.auth.signInWithPopup(provider)
        .then((result)=>{
          this.ngZone.run(()=>{
            this.router.navigate(['home']);
          })
          this.SetUserData(result.user);
        }).catch((error) =>{
          window.alert(error);
        })
    }

    /*Setting user's data when logging in with username/pass,
    registering with username/pass or logging with social auth*/
    SetUserData(user){
      const userRef: AngularFirestoreDocument<any> = this.afs.doc('users/'+user.uid);
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      }
      return userRef.set(userData,{
        merge: true
      })
    }

    Logout(){
       return this.afAuth.auth.signOut()
       .then(()=>{
        localStorage.removeItem('user');
        this.router.navigate(['login']);
        window.location.reload();
       })
      }


      UpdateUserProfile(user,form){
        var userRef = this.afs.collection('profileinfos').doc(user.uid);

        userRef.update({
          firstName: form.firstName,
          lastName: form.lastName,
          dailyCalories: form.dailyCalories,
          weight: form.weight,
          goalWeight: form.goalWeight,
          profilePhoto: user.photoURL
        }).then(function() {
          console.log("Document successfully written!");
          })
          .catch(function(error) {
          console.error("Error writing document: ", error);
        });

      }
       GetUserProfile(user){
        var docRef = this.afs.collection('profileinfos').doc(user.uid).valueChanges();
        return docRef;
      }

      AddFood(user,form){

        let food: Food ={
          foodName : form.foodName,
          calories : form.calories,
          date: form.date
        };
        this.afs.collection('food').doc(user.uid).collection(food.date).add(food).then(function() {
            console.log("Document successfully written!");
            })
            .catch(function(error) {
            console.error("Error writing document: ", error);
          });
      }

      GetFoods(user,date): Observable<any>{
        return this.afs.collection('food').doc(user.uid).collection(date).snapshotChanges();
      }

      DeleteFood(user,food){


        return this.afs.collection('food').doc(user.uid).collection(food.date).doc(food.id).delete()
        .then(function() {
          console.log("Document successfully deleted!");
        }).catch(function(error) {
          console.error("Error removing document: ", error);
        });
      }

}
