import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserService } from '../services/user.service';


@Injectable({
    providedIn: 'root'
})
export class UnLoginGuard implements CanActivate {

    constructor(public router: Router, public userService: UserService) { }
    jwtHelper = new JwtHelperService();

    canActivate(): boolean {
        if (this.userService.isAuthenticated()) {
            this.router.navigate(['/folder']);

            return false;
        }
        return true;
    }
}