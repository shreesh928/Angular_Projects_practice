import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent implements OnInit {

  
  constructor(private formBuilder:FormBuilder, private router:Router, 
    private adminService:AdminService){}

  ngOnInit(): void {
    
  }
}
