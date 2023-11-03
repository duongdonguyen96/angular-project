import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from 'ngx-toastr'
import {AuthService} from "../demo/service/auth";
import {Router} from '@angular/router';
import {FormGroup, FormControl} from "@angular/forms";
import {MessagesDemoComponent} from "../demo/view/messagesdemo.component";

@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html',
})
export class AppLoginComponent {
    constructor(
        private builder: FormBuilder,
        private toastr: ToastrService,
        private service: AuthService,
        private router: Router
    ) {
        sessionStorage.clear()

    }

    result: any;

    loginform = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    })

    proceedlogin() {
        this.service.Login(this.loginform.value).subscribe(item => {
                this.result = item;
                this.router.navigate(['/'])

                // if (!this.result.data.errors) {
                //     this.toastr.success("Login success!!")
                //     console.log("thanh cong")
                // } else {
                //     this.toastr.error("Login Fail..!")
                //     console.log("failll")
                // }


            },
            error => {
                this.router.navigate(['/login'])
                alert('oc cho')
            }
        )

    }
}
