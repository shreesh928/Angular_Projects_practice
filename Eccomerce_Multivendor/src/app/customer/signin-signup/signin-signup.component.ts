import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../core/Model/object.model';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [CommonModule,RouterLink, 
    HttpClientModule, ReactiveFormsModule,
  FormsModule],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.css'
})
export class SigninSignupComponent {
  regForm:boolean = false;
  signUpform!:FormGroup;
  signInform!:FormGroup;
  signUpsubmited:any;
  href:string='';
  user_data:any;
  user_dto!:User;
  user_reg_data:any;
  signInFormValue:any = {};

  constructor(private formbuilder:FormBuilder, private router:Router, private loginService:LoginSignupService){}

  ngOnInit():void{

    
    // Check is registration form or login form
    this.href = this.router.url;
    if(this.href == '/sign-up'){
      this.regForm = true;
    }
    else if(this.href == '/sign-in'){
      this.regForm = false;
    }
    
    this.SignupGroupingForm()
  }


  // Grouping signup form
  SignupGroupingForm(){
    this.signUpform = this.formbuilder.group({
      name:['',Validators.required],
      mobNumber:['',Validators.required],
      age:['',Validators.required],
      dob:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      addLine1:['',Validators.required],
      addLine2:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      zipCode:['',Validators.required],
      language:['',Validators.required],
      gender:['',Validators.required],
      aboutYou:['',Validators.required],
      uploadPhoto:['',Validators.required],
      agreetc:['',Validators.required],
      role:['',Validators.required],
    });
  
  }

  get rf(){
    return this.signUpform.controls;
  }

  onSubmitSignup(){
    this.signUpsubmited = true;
    if(this.signUpform.invalid){
      return console.log("invalid");
    }
    
    this.user_reg_data = this.signUpform.value;
    this.user_dto = {
      name:this.user_reg_data.name,
      password:this.user_reg_data.password,
      uploadPhoto:this.user_reg_data.uploadPhoto,
      role:this.user_reg_data.role,
      mobNumber:this.user_reg_data.mobNumber,
      address:{
        id:0,
        addLine1:this.user_reg_data.addLine1,
        addLine2:this.user_reg_data.addLine2,
        city:this.user_reg_data.city,
        state:this.user_reg_data.state,
        zipCode:this.user_reg_data.zipCode,
      },
      gender:this.user_reg_data.gender,
      language:this.user_reg_data.language,
      email:this.user_reg_data.email,
      dob:this.user_reg_data.dob,
      agreetc:this.user_reg_data.agreetc,
      age:this.user_reg_data.age,
      aboutYou:this.user_reg_data.aboutYou,
    }
    this.loginService.userRegister(this.user_dto).subscribe((data)=>{
      alert("User Register Successfull");
      this.router.navigateByUrl('/sign-in');
    })
  }

  


  onSubmitSignIn(){
    this.loginService.loginAuth(this.signInFormValue.userEmail, this.signInFormValue.userPassword).subscribe((data)=>{
      this.user_data = data;
      if (this.user_data.length == 1){
        if(this.user_data[0].role == "seller"){
          sessionStorage.setItem("user_session_id",this.user_data[0].id);
          sessionStorage.setItem("role",this.user_data[0].role);
          this.router.navigateByUrl("/seller-dashboard");
        }else if(this.user_data[0].role == "buyer"){
          sessionStorage.setItem("user_session_id",this.user_data[0].id);
          sessionStorage.setItem("role",this.user_data[0].role);
          this.router.navigateByUrl("./buyer-dashboard");
        }else{
          alert("Invalid credentials");
        }
      }else{
        alert("Invalid");
      }
    },error=>{
      console.log("My error", error)
    })
  }  
}



