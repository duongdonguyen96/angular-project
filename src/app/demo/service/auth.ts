import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {

    }

    apiurl = 'http://127.0.0.1:8000/api/v1/train/user/';

    Login(inputdata: any) {
        return this.http.post(this.apiurl + 'login/', inputdata)
    }

    RegisterUser(inputdata: any) {
        return this.http.post(this.apiurl, inputdata)
    }

    GetUserbyCode(id: any) {
        return this.http.get(this.apiurl + '/' + id);
    }

    Getall() {
        return this.http.get(this.apiurl);
    }

    updateuser(id: any, inputdata: any) {
        return this.http.put(this.apiurl + '/' + id, inputdata);
    }

    getuserrole() {
        return this.http.get('http://localhost:3000/role');
    }

    isloggedin() {
        return sessionStorage.getItem('username') != null;
    }

    getrole() {
        return sessionStorage.getItem('role') != null ? sessionStorage.getItem('role')?.toString() : '';
    }

    GetAllCustomer() {
        return this.http.get('http://localhost:3000/customer');
    }

    Getaccessbyrole(role: any, menu: any) {
        return this.http.get('http://localhost:3000/roleaccess?role=' + role + '&menu=' + menu)
    }
}
