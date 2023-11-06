import {Component} from '@angular/core';
import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import {AppLoginComponent} from "./pages/app.login.component";
import {ConfirmationService, MessageService} from "primeng/api";
import {an} from "@fullcalendar/core/internal-common";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [AppLoginComponent, MessageService, ConfirmationService]
})
export class AppTopBarComponent {
    constructor(
        public app: AppComponent,
        public appMain: AppMainComponent,
        public authentication: AppLoginComponent
    ) {
    }
}
