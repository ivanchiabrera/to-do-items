import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';



@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    data: any;

    constructor(public router: Router, public userService: UserService) { }

    canActivate(): boolean {
        if (!this.userService.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}