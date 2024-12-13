import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

// admin before login check
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardLogin implements CanActivate{

  constructor(private http:HttpClient, private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem("role");
    if(role === "admin"){
      this.router.navigate(["/admin-dashboard"]);
      return false
    }else{
      return true;
    }
  }
}



// admin after login check
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService{

  constructor(private http:HttpClient, private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem("role");
    if(role === "admin"){
      return true;
    }else{
      this.router.navigateByUrl("/admin-login");
      return false;
    }
  }
}


// customer buyer and seller before login check
@Injectable({
  providedIn: 'root'
})
export class SellerBuyerAuthGuardLogin implements CanActivate{

  constructor(private http:HttpClient, private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem("role");
    if(role === "seller"){
      this.router.navigate(["/seller-dashboard"])
      return false;
    }else if (role === "buyer"){
      this.router.navigate(["/buyer-dashboard"])
      return false
    }else{
      return true;
    }
  }
}


//Buyer after login check

@Injectable({
  providedIn: 'root'
})
export class BuyerAuthGuardService implements CanActivate{

  constructor(private http:HttpClient, private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem("role");
    if (role === "buyer"){
      return true
    }else{
      this.router.navigate(["/sign-in"])
      return false;
    }
  }
}



@Injectable({
  providedIn: 'root'
})
export class SellerAuthGuardService implements CanActivate{

  constructor(private http:HttpClient, private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem("role");
    if(role === "seller"){
      return true;
    }else if (role === "buyer"){
      this.router.navigate(["/sign-in"])
      return false
    }else{
      return true;
    }
  }
}
