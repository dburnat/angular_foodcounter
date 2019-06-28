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

  
}
