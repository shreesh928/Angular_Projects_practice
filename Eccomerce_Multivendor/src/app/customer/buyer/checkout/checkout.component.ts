import { Component, OnInit } from '@angular/core';
import { order, Product, User } from '../../../core/Model/object.model';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  user_name!:String
  single_product_id:any;
  user_id:any;
  individual_product!:Product;
  user_detail!:User;
  user_address:any;
  user_contact_no:any;
  order_dto!:order;

  constructor(private customerService:CustomerService, private router:Router){}

  ngOnInit(): void {
    // retrive the current product which user is selected
    this.customerService.current_product.subscribe(product=>this.single_product_id=product);
    this.user_id = Number(sessionStorage.getItem("user_session_id"));

    // called function of to retrive perticular product and userAddress
    this.productDetail(this.single_product_id);
    this.userAddress(this.user_id);
  }

  // retrive the perticular product detail that user want
  productDetail(product_id:any){
    this.customerService.individualProduct(product_id).subscribe(data=>{
      this.individual_product = data;
      console.warn("my single product",this.individual_product)
    }, error=>{
      console.log("My error",error)
    });
  }

  // get the user address that given by user for perticular order
  userAddress(user_id:any){
    this.customerService.userDetails(user_id).subscribe(data=>{
      console.log(data)
      this.user_name = data.name
      this.user_address = data.address;
      console.log(this.user_address.addLine1)
      this.user_contact_no = data.mobNumber;
    },error=>{
      console.log("My error",error)
    });
  }

  // this functionis used for checkout the order
  placeOrder(){
    this.order_dto = {
      id:0,
      userId:this.user_id,
      sellerId:2,
      product:{
        id: this.individual_product.id,
        name: this.individual_product.name,
        uploadPhoto: this.individual_product.uploadPhoto,
        mrp: this.individual_product.mrp,
        dp: this.individual_product.dp,
        status: this.individual_product.status,
        uploadDesc: this.individual_product.uploadDesc
      },
      deliveryAddress:{
        id: 0,
        addLine1: this.user_address.addLine1,
        addLine2: this.user_address.addLine2,
        city: this.user_address.city,
        state: this.user_address.state,
        zipCode: this.user_address.zipCode
      },
      contact:this.user_contact_no,
      dateTime:new Date().toLocaleDateString()
    }
    this.customerService.insertNewOrder(this.order_dto).subscribe(data=>{
      alert("Your order place successfull !");
      this.router.navigateByUrl("/buyer-dashboard");
    },error=>{
      console.log("Order error",error);
    });
  }

}
