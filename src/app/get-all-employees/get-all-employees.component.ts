import { Component, OnInit } from '@angular/core';
import { employee } from '../employee';
import { EmpBlobServiceService } from 'src/services/emp-blob-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-all-employees',
  templateUrl: './get-all-employees.component.html',
  styleUrls: ['./get-all-employees.component.css']
})
export class GetAllEmployeesComponent implements OnInit {

  employees !: employee[]
  selectedEmployee: employee | null = null; 
  
  constructor(private service: EmpBlobServiceService,  private router: Router) { }

  ngOnInit(): void {
    this.loadEmployeess();
    
  }
  loadEmployeess(): void{
    this.service.getAllEmployees().subscribe(data => {
      this.employees = data})
  }
  deleteEmployee(employeeName: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.service.deleteEmployee(employeeName).subscribe(() => {
        // Employee deleted, refresh the list
         this.loadEmployeess();
      });
    }
  }

  viewEmployeeDetails(employeeName:string){
    this.router.navigate(['/employee-details', employeeName]);
  }
  editEmployee(employeeName: string) {
    this.router.navigate(['/edit-employee', employeeName]);
  }
  
  // viewEmployeeDetails(employeeName:string){
  //   this.service.downloadEmployeeData(employeeName).subscribe(employee => {
  //     if (employee) {
  //       this.selectedEmployee = employee;
  //     } else {
  //       // Handle the case where the employee data is not found
  //       // For example, you can display an error message or navigate to an error page.
  //       console.error(`Employee with full name ${employeeName} not found.`);
  //     }
  //   });
  // }


}