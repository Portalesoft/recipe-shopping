import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { fadeElementsAnimation } from './shared/animations/fade-elements.animation';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [fadeElementsAnimation]
})
export class AppComponent implements OnInit {

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.autoLogin();
    }

}
