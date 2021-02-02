import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  @ViewChild('btn1') btn1: ElementRef; icn1 = false;

  ngOnInit(): void {
  }

  showError = false;

  login(form) {
    this.btn1.nativeElement.disabled = true; this.icn1 = true;// Button disabled
    this.userService.login(form.value).subscribe(
      (data: any) => {
        if (data.verified == true) {
          this.showError = false;
          localStorage.setItem("token", data.token);
          this.router.navigate(["task"]);
        } else {
          this.showError = true;
        }
      },
      (error) => {
        this.showError = true;
        this.btn1.nativeElement.disabled = false; this.icn1 = false;// Button available
      }
    )
  }

}
