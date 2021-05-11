import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { HttpClient } from  '@angular/common/Http';

@Component({
  selector: 'app-signinpage',
  templateUrl: './signinpage.component.html',
  styleUrls: ['./signinpage.component.css']
})
export class SigninpageComponent {
	
	 userName="";
     password="";
     Email="";
     FirstName="";
	 LastName="";
   PreLogin=true;
  constructor() { }
  
  public SignInPage()
  {
	
	  console.log(this.userName)
	  console.log(this.password)
	  console.log(this.Email)
	  console.log(this.FirstName)
	  console.log(this.LastName)
	  this.PreLogin=false;
	  
  }
  
}