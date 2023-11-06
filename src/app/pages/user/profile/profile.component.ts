import {Component} from '@angular/core';
import {CountryService} from "../../../demo/service/countryservice";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    selectedState: any = null;

    states: any[] = [
        {name: 'Arizona', code: 'Arizona'},
        {name: 'California', value: 'California'},
        {name: 'Florida', code: 'Florida'},
        {name: 'Ohio', code: 'Ohio'},
        {name: 'Washington', code: 'Washington'}
    ];

    dropdownItems = [
        {name: 'Option 1', code: 'Option 1'},
        {name: 'Option 2', code: 'Option 2'},
        {name: 'Option 3', code: 'Option 3'}
    ];

    cities1: any[] = [];

    cities2: any[] = [];

    city1: any = null;

    city2: any = null;

}
