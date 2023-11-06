import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {FormGroup, FormControl} from "@angular/forms";
import {ConfirmationService, MessageService} from 'primeng/api';
import {AuthInterceptor} from "../authentication/interceptor/auth.interceptor";
import {AuthService} from "../authentication/auth";

@Component({
    selector: 'app-login',
    providers: [MessageService, ConfirmationService],
    templateUrl: './app.login.component.html',
    styleUrls: ['../../assets/demo/app.login.component.css']
})
export class AppLoginComponent implements OnInit {
    result: any;
    isLogin: boolean = false;
    userInfo: any;

    constructor(
        private builder: FormBuilder,
        private messageService: MessageService,
        private service: AuthService,
        private router: Router,
    ) {

    }

    ngOnInit() {
        // this.autoLogout(4000)
    }


    loginform = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(5)]),
        password: new FormControl('', [Validators.required, Validators.minLength(5)])
    })

    proceedlogin() {
        console.log('232323')
        if (this.loginform.valid) {
            this.service.Login(this.loginform.value).subscribe(item => {
                    this.result = item;
                    localStorage.setItem('user-login', JSON.stringify(this.result.data));
                    AuthInterceptor.accessToken = this.result.data.access_token;

                    this.router.navigate(['/pages/crud']);
                    this.isLogin = true;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Login success',
                        life: 3000
                    });

                    // if (!this.result.data.errors) {
                    //     this.toastr.success("Login success!!")
                    //     console.log("thanh cong")
                    // } else {
                    //     this.toastr.error("Login Fail..!")
                    //     console.log("failll")
                    // }


                },
                error => {
                    // alert(error.error.errors[0].detail);
                    this.messageService.add({severity: 'error', summary: 'Rejected', detail: '12312312312'});

                    // this.router.navigate(['/login'])
                }
            )
        }
    }

    getUserFromLocalStorage() {
        this.userInfo = JSON.parse(localStorage.getItem('user-login'))
    }


    logOut() {
        this.router.navigate(['/login'])
        localStorage.removeItem('user-login')
        this.isLogin = false
    }

    autoLogout(exp: number) {
        console.log(exp)
        setTimeout(() => {
            this.logOut();
        }, exp)
    }
}


