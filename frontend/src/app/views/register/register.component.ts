import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  @ViewChild('btn1') btn1: ElementRef; icn1 = false;
  
  ngOnInit(): void {
  }

  register(form) {
    this.btn1.nativeElement.disabled = true; this.icn1 = true;// Button disabled
    this.userService.register(form.value).subscribe(
      (data: any) => {        
        this.router.navigate(["login"]);
      },
      (error) => {
        this.btn1.nativeElement.disabled = false; this.icn1 = false;// Button available
      }
    )
  }

}
