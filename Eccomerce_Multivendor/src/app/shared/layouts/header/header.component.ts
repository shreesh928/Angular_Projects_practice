import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, DoCheck{
  logged_in:boolean = false;
  language:string = "English";
  user_role:any;

  constructor(private router:Router){}

  ngOnInit(): void {
    
  }
  
  
  ngDoCheck(): void {

    // checking the user is logged in or logged out
    this.user_role = sessionStorage.getItem("role");
    const user_session_id = sessionStorage.getItem("user_session_id");
    if(user_session_id){
      this.logged_in = true;
    }
  }

  logout(){
    sessionStorage.removeItem("user_session_id");
    sessionStorage.removeItem("role");
    location.reload();
    this.router.navigateByUrl("/sign-in");
  }


}
