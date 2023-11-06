import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Product, User} from '../demo/domain/product';
import {ProductService} from '../demo/service/productservice';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppLoginComponent} from "./app.login.component";
import {AuthService} from "../authentication/auth";

@Component({
    templateUrl: './app.crud.component.html',
    providers: [MessageService, ConfirmationService, AppLoginComponent],
    styleUrls: ['../../assets/demo/badges.scss']
})
export class AppCrudComponent implements OnInit {

    userDialog: boolean;

    userDetailDialog: boolean

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    isLogin: boolean = false;

    products: Product[];

    users: User[];

    user: User;

    user_detail: User;

    selectedProducts: Product[];

    submitted: boolean = true;

    cols: any[];

    statuses: any[];

    @ViewChild('dt') table: Table;
    @ViewChild('filter') filter: ElementRef;

    gender = [
        {label: 'MALE', value: 'MALE'},
        {label: 'FEMALE', value: 'FEMALE'}
    ]

    result: any;

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private service: AuthService,
        private authentication: AppLoginComponent
    ) {
    }

    ngOnInit() {
        this.authentication.autoLogout(1 * 60 * 60 * 24 * 1000)

        this.getAllUsers()

        this.cols = [
            {field: 'id', header: 'Code'},
            {field: 'full_name', header: 'Name'},
            {field: 'email', header: 'Email'},
            {field: 'gender', header: 'Gender'},
            {field: 'phone', header: 'Phone'}
        ];

        this.gender = [
            {label: 'MALE', value: 'MALE'},
            {label: 'FEMALE', value: 'FEMALE'}
        ];
    }

    createUserForm = new FormGroup({
        full_name: new FormControl('', [Validators.required, Validators.minLength(5)]),
        username: new FormControl('', [Validators.required, Validators.minLength(1)]),
        email: new FormControl('', [Validators.required, Validators.minLength(5)]),
        phone: new FormControl('', [Validators.required, Validators.minLength(5)]),
        gender: new FormControl('', [Validators.required, Validators.minLength(1)]),
        password: new FormControl('123456')
    })


    createUser() {
        if (this.submitted) {
            console.log('33333')

            this.service.RegisterUser(this.createUserForm.value).subscribe(item => {
                    this.result = item;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'User Created',
                        life: 3000
                    });
                    this.userDialog = false

                    this.getAllUsers()
                },
                error => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Rejected',
                        detail: error.error.errors[0].detail
                    });
                }
            )
        }
    }

    getAllUsers() {
        this.service.GetAllUser({
            "page_size": 100,
            "current_page": 1
        }).then(data => this.users = data)

    }


    openNew() {
        this.user = {};
        this.userDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(user: User) {
        this.userDetailDialog = true;
        this.user_detail = {...user};
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.user = {...product};
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.user.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        this.user = {};
    }

    hideDialog() {
        this.userDialog = false;
        this.userDetailDialog = false
        this.submitted = false;
    }
}
