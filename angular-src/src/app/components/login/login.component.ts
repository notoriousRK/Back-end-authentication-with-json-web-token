import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
  username: String
  password:String
  role: String
  constructor(private authService:AuthService,
              private router:Router,
              private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }
  

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password,
      role: this.role
      }
    this.authService.authenticateUser(user).subscribe(data => {
          if(data.success && data.user.role == "Participant"){
            this.authService.storeUserData(data.token, data.user)
            this.flashMessage.show("You are now logged in as Participant", {cssClass: 'alert-success', timeout: 2000})
            this.router.navigate(['/'])

          }else if(data.success && data.user.role == "Organiser"){
            this.authService.storeUserData(data.token, data.user)
            this.flashMessage.show("You are now logged in in as Organiser", {cssClass: 'alert-success', timeout: 2000})
            this.router.navigate(['/dashboard'])

          } else{
            this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000})
            this.router.navigate(['/login'])
          }
    })
  }
}
