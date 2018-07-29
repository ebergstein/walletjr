import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errors: Array<any>;

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
  }

  login(formData){
    this._userService.login(formData.value)
      .then( (user) => this._router.navigate(['/main']))
      .catch( (err) => {
        this.errors = err._body.split(",")
      })
  }

  register(formData){
    this._userService.register(formData.value)
      .then( () => this._router.navigate(['/main']))
      .catch( (err) => {
        this.errors = err._body.split(",")
      })
  }

}
