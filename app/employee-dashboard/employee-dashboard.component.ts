import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { CrudHttpService } from '../crud-http.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  employeeModelObj:EmployeeModel=new EmployeeModel();

  formValue!:FormGroup;
  employeeData!:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  showUpdateTitle!:boolean
  showAddTitle!:boolean;

  constructor(private formBulider:FormBuilder,private service:CrudHttpService) { }

  addButtonClickFunction(){
    this.formValue.reset();
    this.showUpdate=false;
    this.showAdd=true;
    this.showUpdateTitle=false;
    this.showAddTitle=true;
  }

  ngOnInit(): void {
    this.formValue=this.formBulider.group({
      first_name:[''],
      last_name:[''],
      email:[''],
    })
    this.getAllEmployee();
  }

  postEmployeeDetails(){
    this.employeeModelObj.id=this.formValue.value.id;
    this.employeeModelObj.first_name=this.formValue.value.first_name;
    this.employeeModelObj.last_name=this.formValue.value.last_name;
    this.employeeModelObj.email=this.formValue.value.email;
    let cancel = document.getElementById("cancel");
    this.service.postData(this.employeeModelObj).subscribe(a=>{
      console.log(a);
      alert("Record Inserted Successfully");
      cancel?.click();this.formValue.reset();
      this.getAllEmployee();
    })
  }

  getAllEmployee(){
    this.service.getData().subscribe(a=>{
      this.employeeData=a;
    })

  }

  deleteEmployee(row:any){
    this.service.deleteData(row.id).subscribe(a=>{
      alert("Record Deleted Successfully");
      this.getAllEmployee();
    })
  }

  updateEmployee(row:any){
    this.showUpdate=true;
    this.showAdd=false;
    this.showUpdateTitle=true;
    this.showAddTitle=false;
    this.employeeModelObj.id=row.id;
    this.formValue.controls['first_name'].setValue(row.first_name);
    this.formValue.controls['last_name'].setValue(row.last_name);
    this.formValue.controls['email'].setValue(row.email);
  }

  updateEmployeeDetails(){
    this.employeeModelObj.first_name=this.formValue.value.first_name;
    this.employeeModelObj.last_name=this.formValue.value.last_name;
    this.employeeModelObj.email=this.formValue.value.email;
    this.service.updateData(this.employeeModelObj,this.employeeModelObj.id).subscribe(a=>{
      alert("Record Updated Successfully");
      let cancel=document.getElementById("cancel");
      cancel?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

  getEmployeeById(row:any){
    this.service.getDataById(row.id).subscribe(a=>{
      this.employeeData=a;
    })

  }

}
