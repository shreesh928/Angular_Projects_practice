import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  user_dashboard_data:any;
  total_user:number = 0;
  admin_user:number = 0;
  seller_user:number = 0;
  buyer_user:number = 0;

  product_dashboard_data:any;
  total_product:number = 0;
  publish_product:number = 0;
  inactive_product:number = 0;
  draft_product:number = 0;
  NoRecords:boolean = false;


  constructor(private router:Router, private adminService:AdminService){}

  ngOnInit(): void {

    this.adminUserDashboard();
    this.adminProductDashboard();
    
  }

  userDahboard(){
    this.router.navigateByUrl("/admin/user");
  }

  productDashboard(){
    this.router.navigateByUrl("/admin/product");
  }

  // Count the all user data including admin, buyer, seller
  adminUserDashboard(){
    this.adminService.userDashboardData().subscribe(data => {
      this.user_dashboard_data = data
      for(let user in this.user_dashboard_data){
        // Count the number of admin in your system
        if(this.user_dashboard_data && this.user_dashboard_data[user].role == 'admin'){
          ++this.admin_user;
        }
        // count the number of seller in your system
        else if(this.user_dashboard_data && this.user_dashboard_data[user].role == 'seller'){
          ++this.seller_user;
        }
        // count the number of buyer in your system
        else if(this.user_dashboard_data && this.user_dashboard_data[user].role == 'buyer'){
          ++this.buyer_user;
        }
        ++this.total_user;
      }
      
    }, error =>{
      console.log("Admin User Dashboard Data Function have error", error)
    });
  }



  adminProductDashboard(){
    this.adminService.productDashboardData().subscribe(data =>{
      this.product_dashboard_data = data;
      for(let status in this.product_dashboard_data){
        if(this.product_dashboard_data[status].status == 'publish'){
          ++this.publish_product;
        }
        else if(this.product_dashboard_data[status].status == 'inactive'){
          ++this.inactive_product;
        }
        else if(this.product_dashboard_data[status].status == 'draft'){
          ++this.draft_product;
        }
        ++this.total_product
      }
    },error => {
      console.log("This error i s in adminDashboard adminProductDashboard() func", error)
    });
  }

}
