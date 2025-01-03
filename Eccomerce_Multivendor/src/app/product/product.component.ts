import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../core/Model/object.model';
import { Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  all_product_data:any;
  addEditProductForm!:FormGroup
  addEditProduct:boolean = false;
  popup_header!:String;
  add_product!:boolean;
  edit_product!:boolean;
  product_data:any;
  single_product_data:any;
  product_dto!:Product;
  edit_product_id:any;

  constructor(private fb:FormBuilder, private router:Router, private productService:ProductService){}

  ngOnInit(): void {

    // created form for add a product or edit a product
    this.addEditProductForm= this.fb.group({
      name:["",Validators.required],
      uploadPhoto:["",Validators.required],
      uploadDesc:["",Validators.required],
      mrp:["",Validators.required],
      dp:["",Validators.required],
      status:["",Validators.required]
    })

    this.getAllProduct()
    
  }

  get rf(){
    return this.addEditProductForm.controls
  }

  // get all products
  getAllProduct(){
    this.productService.allProduct().subscribe(data=>{
      this.all_product_data = data;
      console.log("My All Product", this.all_product_data)
    },error=>{
      console.log("Something went wrong",error)
    });
  }

  // add product popup
  addProductPopup(){
    this.add_product = true;
    this.edit_product = false;
    this.popup_header = "Add new Product";
    this.addEditProductForm.reset();
  }

  // add a new product by seller
  addNewProduct(){
    this.addEditProduct = true;
    if(this.addEditProductForm.invalid){
      return;
    }

    this.product_data = this.addEditProductForm.value;

    this.product_dto = {
      id:0,
      name:this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      uploadDesc: this.product_data.productDesc,
      mrp:this.product_data.mrp,
      dp:this.product_data.dp,
      status:this.product_data.status
    }

    this.productService.addNewProduct(this.product_dto).subscribe(data=>{
      console.log(data);

    },error=>{
      console.log("My error",error)
    });
  }

  // edit product poup
  editProductPopup(id:any){
    this.add_product = false;
    this.edit_product = false;
    this.popup_header = "Edit Product";
    this.addEditProductForm.reset();
    this.productService.singleProduct(id).subscribe(data=>{
      console.log("edit",data)
      this.single_product_data = data;
      this.edit_product_id = data.id
      this.addEditProductForm.setValue({
        name:this.single_product_data.name,
        uploadPhoto:this.single_product_data.uploadPhoto,
        uploadDesc:this.single_product_data.productDesc,
        mrp:this.single_product_data.mrp,
        dp:this.single_product_data.dp,
        status:this.single_product_data.status
      });
    },error=>{
      console.log("My error",error)
    });
  }

  // edit the product data by seller
  updateProduct(){
    this.addEditProduct = true;
    if(this.addEditProductForm.invalid){
      return;
    }
    this.product_data = this.addEditProductForm.value;
    this.product_dto = {
        id:0,
        name:this.single_product_data.name,
        uploadPhoto:this.single_product_data.uploadPhoto,
        uploadDesc:this.single_product_data.productDesc,
        mrp:this.single_product_data.mrp,
        dp:this.single_product_data.dp,
        status:this.single_product_data.status,
    }
    this.productService.updateProduct(this.edit_product_id,this.product_dto).subscribe(data=>{
      this.getAllProduct();
    },error=>{
      console.log("My error", error)
    });
  }

  // delete the product data
  deleteProduct(id:any){
    let conf = confirm("Do you want to delte these product:"+id);
    if(conf){
      this.productService.deleteProduct(id).subscribe(data=>{
        console.log("Deleted successfull",data);
        this.getAllProduct()
      },err=>{
        console.log("My error", err);
      })
    }else{
      alert("You pressed cancel !");
    }
  }

}
