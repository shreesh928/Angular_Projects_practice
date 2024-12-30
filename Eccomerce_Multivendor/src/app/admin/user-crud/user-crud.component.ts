import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../../core/Model/object.model';

declare var JQuery:any


@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent implements OnInit {

  all_user_data:any;
  single_user_data:any;
  addEditUserForm!:FormGroup;
  user_dto!:User;
  user_reg_data:any;
  edit_user_id:any;
  upload_file_name!:string;
  addEditUser:boolean = false; //For Form Validation
  add_user:boolean = false;
  edit_user:boolean = false;
  popup_header!:string;
  availableLanguages:any;
  signInFormValue:any = {};


  constructor(private formBuilder:FormBuilder, private router:Router, 
    private adminService:AdminService){}


  ngOnInit(): void {

    
    //All user data function is called
    this.getAllUser()

    // Form grouping
    this.addEditUserForm = this.formBuilder.group({
      name: ["",Validators.required],
      mobNumber: ["",Validators.required],
      age: ["",Validators.required],
      dob: ["",Validators.required],
      email: ["",Validators.required],
      password: ["",Validators.required],
      addLine1: ["",Validators.required],
      addLine2: ["",Validators.required],
      city: ["",Validators.required],
      state: ["",Validators.required],
      zipCode: ["",Validators.required],
      language: ["", Validators.required],
      gender: ["",Validators.required],
      aboutYou: ["",Validators.required],
      uploadPhoto: ["",Validators.required],
      agreetc: ["",Validators.required],
      role: ["",Validators.required],
    });
  }


  



  // This mathod get the all user of data
  getAllUser(){
    this.adminService.allUser().subscribe(data => {
      this.all_user_data = data;
    
    },error =>{
      console.log("My error", error);
    });
  }



  // This function returns the key value pair of all forms data
  get rf(){
    return this.addEditUserForm.controls;
  }



  // addUserPopup method gives notfy to admin that new user is added
  addUserpopup(){
    this.edit_user = false;
    this.add_user = true;
    this.popup_header = "Add New User";
    this.addEditUserForm.reset();
  }


  // this is a notify when user is going to be add.
  addUser(){
    this.addEditUser = true;
    if(this.addEditUserForm.invalid){
      console.log('Form Errors:', JSON.stringify(this.addEditUserForm.value));  // Log form errors
      alert('Error!! :-)\n\n'+JSON.stringify(this.addEditUserForm.value));
      return;
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.addEditUserForm.reset()
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
    this.adminService.addUser(this.user_dto).subscribe(data=>{
      this.getAllUser();
      JQuery('#addEditUserModal').modal('toggle');
    }, error=>{
      console.log("My crud error", error);
    });
  }



  // edit user notify
  editUserPopup(user_id:any){
    this.edit_user_id = user_id;
    this.edit_user = true;
    this.add_user = false;
    this.popup_header = "Edit User";
    this.adminService.singleUser(user_id).subscribe(data =>{
      this.single_user_data = data;
      this.availableLanguages = this.single_user_data.language
      this.upload_file_name = this.single_user_data.uploadPhoto;
      console.log(this.single_user_data)
      this.addEditUserForm.setValue({
        name:this.single_user_data.name,
        mobNumber:this.single_user_data.mobNumber,
        age:this.single_user_data.age,
        dob:this.single_user_data.dob,
        email:this.single_user_data.email,
        password:this.single_user_data.password,
        language:this.single_user_data.language,
        gender:this.single_user_data.gender,
        addLine1:this.single_user_data.address.addLine1,
        addLine2:this.single_user_data.address.addLine2,
        city:this.single_user_data.address.city,
        zipCode:this.single_user_data.address.zipCode,
        state:this.single_user_data.address.state,
        aboutYou:this.single_user_data.aboutYou,
        uploadPhoto:"",
        role:this.single_user_data.role,
        agreetc:this.single_user_data.agreetc
      });
    },error=>{
      console.log("My Edit error", error)
    });
  }



  // Update method to update the edtited values
  updateUser(){
    if(this.addEditUserForm.invalid){
      alert('Error!! :-)\n\n'+JSON.stringify(this.addEditUserForm.value));
      return;
    }
    
    this.user_reg_data = this.addEditUserForm.value;
    this.user_dto = {
      name:this.user_reg_data.name,
      password:this.user_reg_data.password,
      uploadPhoto:(this.user_reg_data.uploadPhoto == ""?this.upload_file_name: this.user_reg_data.uploadPhoto),
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
    this.adminService.editUser(this.edit_user_id,this.user_dto).subscribe(data=>{
      this.addEditUserForm.reset()
      this.getAllUser();
      JQuery('#addEditUserModal').modal('toggle');
    }, error=>{
      console.log("My edit error", error);
    });
  }


  // This method is use to delete the user from database
  deleteUser(user_id:any){
    this.adminService.deleteUser(user_id).subscribe(data=>{
      this.getAllUser();
    },error=>{
      console.log("My Delete error", error);
    });
  }

}


