import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css'
})
export class BuyerDashboardComponent implements OnInit {

  // Declered all nessecary variable here
  allProducts:any;
  showCheckout:boolean = false;

  constructor(private router:Router,private customerService:CustomerService,
    
  ){
    console.log("I am in")
  }

  ngOnInit(): void {
    console.log("I am in")
    this.getAllProduct()
  }

  // get all product reqtrive from api
  getAllProduct(){
    this.customerService.allProduct().subscribe(data=>{
      this.allProducts = data
    },error=>{
      console.log("My error",error)
    });
  }

  // buy product and add to checkout page
  buyProduct(id:number){
    this.showCheckout = true;
    this.customerService.quickBuyProduct(id);
    this.router.navigateByUrl('/checkout');
  }

  // add  to cart alert
  addToCart(){
    alert("This is showcase");
  }

}
