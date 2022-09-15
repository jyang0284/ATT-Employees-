import { Component, NgModule, OnInit, Pipe, ViewChild, PipeTransform } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'; 
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';
import { CurrencyPipe } from '@angular/common';
import { IConfig, NgxMaskModule } from "ngx-mask";
import { fromEvent, ObservableInput, Subject } from 'rxjs';
import { AsYouType } from "libphonenumber-js";
import parsePhoneNumber from 'libphonenumber-js'



@Component({
  selector: 'tr[app-employee-dashboard], currency-pipe, slice-list-pipe',
  providers: [ApiService],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],  
})


export class EmployeeDashboardComponent implements OnInit {
employeeModelObj:EmployeeModel = new EmployeeModel();
searchText: any;
firstName: any;
formValue !: FormGroup;
showAdd!:boolean;
showUpdate!:boolean;
Mobile: string = ""

//mask number

// mobile = parsePhoneNumber('(800) 555-35-35 ', 'US')
// if (mobile: any) {
//   mobile.country === 'US'
//   mobile.number === '+78005553535'
//   mobile.isValid() === true
//   // Note: `.getType()` requires `/max` metadata: see below for an explanation.
//   mobile.getType() === 'TOLL_FREE'
// }


maskNumber(number:any){
    let mask = ""

    if(this.Mobile){
      for(let i=0; i<this.Mobile.length - 2; i++){
        mask += "X"
      }
      console.log
      return mask + this.Mobile.slice(8,10)
    }
    else{
      return null
    }
  }
 //------------------------------------------------------------------
  maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
  };
 //-------------------------------------------------------------------- 

@NgModule({
  imports: [
    NgxMaskModule.forRoot(),
    
  ],
  declarations:[
  ]
})

 //Pagination implementation --------------------------------------------------------------------------------------
 
 employeeData: Array<any> = [];
 totalLength:any;
 page:number = 1;
 //  filterInput : string = "";

showUpdateTitle!:boolean;
showAddTitle!:boolean;
  auth: any;
  service: any;

  callsomething: any;
  unsubscribe!: ObservableInput<any>;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private currencyPipe: CurrencyPipe) { }


  addButtonClickFunction(){
    this.formValue.reset();
    this.showUpdate=false;
    this.showAdd=true;
    
    this.showUpdateTitle=false;
    this.showAddTitle=true;
  }


  ngOnInit(): void {

  this.getAllEmployee();
  this.formValue = this.formBuilder.group({

  firstName:['', Validators.required],
  lastName:['', Validators.required],
  Email:['', Validators.required],
  Mobile:['', Validators.required],
  Salary:['', Validators.required]
  });
  

  //Original way of implementing the currency dollar sign

  // this.formValue.valueChanges.subscribe( form =>{
  //   if (form.Salary){
  //     this.formValue.patchValue({
  //       Salary: this.currencyPipe.transform(form.Salary.replace(/\D/g, '').replace(/^0+/, ''), 'USD', 'symbol', '1.0-0')
  //     }, {emitEvent: false});
  //   }
  // }); 
}
  showErrorModal(arg0: string) {
    throw new Error(`You can't make changes or go back at this time.`);
  }

postEmployeeDetails(){
//alert("fucntion call");
this.employeeModelObj.id=this.formValue.value.id ;

  this.employeeModelObj.firstName=this.formValue.value.firstName;
  this.employeeModelObj.lastName=this.formValue.value.lastName;
  this.employeeModelObj.Email=this.formValue.value.Email;
  this.employeeModelObj.Mobile=this.formValue.value.Mobile;
  this.employeeModelObj.Salary=this.formValue.value.Salary;

  let cancel=document.getElementById("cancel");
  this.api.postData(this.employeeModelObj).subscribe(a=> {

    console.log(a);
    alert("Record inserted successfully");
    cancel?.click();this.formValue.reset();
    this.getAllEmployee();
  })
 }



getAllEmployee(){
  this.api.getData().subscribe(a=>{
    this.employeeData=a;
  })
}

deleteEmployee(row:any){

  this.api.deleteData(row.id).subscribe(a=>{
    alert("Record Deleted Succesfully");
    this.getAllEmployee();
  })
}

updateEmployee(row:any){
  this.showUpdate=true;
  this.showAdd=false;

  this.showUpdateTitle=true;
  this.showAddTitle=false;
  this.employeeModelObj.id=row.id;
  this.formValue.controls['firstName'].setValue(row.firstName);
  this.formValue.controls['lastName'].setValue(row.lastName);
  this.formValue.controls['Email'].setValue(row.Email);
  this.formValue.controls['Mobile'].setValue(row.Mobile);
  this.formValue.controls['Salary'].setValue(row.Salary);

}

updateEmployeeDetails(){

  this.employeeModelObj.firstName=this.formValue.value.firstName;
  this.employeeModelObj.lastName=this.formValue.value.lastName;
  this.employeeModelObj.Email=this.formValue.value.Email;
  this.employeeModelObj.Mobile=this.formValue.value.Mobile;
  this.employeeModelObj.Salary=this.formValue.value.Salary;
  this.api.updateData(this.employeeModelObj,this.employeeModelObj.id).subscribe(a=>{
    alert("Record updated Succesfully");

    let cancel=document.getElementById("cancel");

      cancel?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
}


// export class AppComponent {
//   constructor(router: Router) {
//      router.canceledNavigationResolution = 'computed';
//   }
// }

