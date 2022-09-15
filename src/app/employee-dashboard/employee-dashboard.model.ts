import { CurrencyPipe } from "@angular/common";
import { NgModule } from "@angular/core";
import {NgxPaginationModule} from 'ngx-pagination';



NgModule({

    imports: [
        NgxPaginationModule
    ],
    providers: [CurrencyPipe]
})
export class EmployeeModel{

    
 id :number=0;
 firstName:string='';
 lastName:string='';
 Email:string='';
 Mobile:string='';
 Salary:string='';

}

