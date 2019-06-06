import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { strictEqual } from 'assert';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'foodcounter';

  constructor(private authService: AuthService){}

   ngOnInit(): void {
     //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
     //Add 'implements OnInit' to the class.
     this.loginUser('root@gmail.com', '1234567');
    }
    loginUser(email: string , pass: string ){
      this.authService.login(email, pass)
        .then(ret =>{
          console.log('Login:' , ret);
        });
    }
}
