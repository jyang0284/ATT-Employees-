import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup, Validators} from "@angular/forms"
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup
  returnUrl: string | undefined;
  submitted: boolean = false;
  loading: boolean = false;
  error: string | undefined;
  constructor(
    private formBuilder : FormBuilder, 
    private http : HttpClient, 
    private router: Router,
    private route: ActivatedRoute,
) {
    }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required], 
    })
  }


  login(){
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        alert("Login Success");
        this.loginForm.reset();
        this.router.navigate(['dashboard'])
      }else
      {
        alert("Email or Password is incorrect");
      }
    },err=>{
      alert("Turn on Json Server")
    })
  }

}
