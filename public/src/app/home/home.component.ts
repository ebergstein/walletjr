import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
//import { ContractsService } from '../contracts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errors: Array<any>;
  user: any;
  public balance: number;

  constructor(private _userService: UserService, private _router: Router/*, cs: ContractsService) {
    cs.getUserBalance().then(balance => this.balance = balance;}*/) { }

  ngOnInit() {
    //console.log(this.balance);
    this.getCurrentUser();
  }

  getCurrentUser(){
    this._userService.getCurrent()
      .then( (user) => this.user = user)
      .catch( (err) => this._router.navigate(['/login']))
  }

}
