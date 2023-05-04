import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { DashboardModal } from './dashboard.modal';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  display = "none";
  terms="";
  employeeData : any;
  employees:any;
  numberOfEmp !: number;
  showSubmit !: boolean;
  showUpdate !: boolean;
  hideEmp !: boolean;
  showEmp !: boolean;
  formValue !: FormGroup;
  dashboardEmploObj : DashboardModal = new DashboardModal();
  empDropdown = [1, 2, 3];
  empList = [];
  selectedValue : any;
  constructor(private formbuilder : FormBuilder, private employeeApi : ApiService) { }

  ngOnInit(): void {
    
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      contactNumber: [''],
      emailAddress: [''],
      dateOfBirth: [''],
      streetAddress: [''],
      city: [''],
      postalCode: [''],
      country: [''],
      skills: this.formbuilder.array([this.addSkills()])
    });
    this.getAllEmployeeInfo();
  }

  /***Create form array fields */
  addSkills() {
    return this.formbuilder.group({
      skill: '',
      yearsExp: '',
      seniorityRate: ''
    });
  }
  get skillsArray() {
    return this.formValue.get('skills') as FormArray;
  }

  addSkillsGroup() {
    this.skillsArray.push(this.addSkills());
  }

  // This delete function for adding new form array field
  deleteSkillField(index: any) {
    this.skillsArray.removeAt(index);
  }
  /**End*/


  // Submit Function to add new record
  postEmployeeDetails() {
    console.log('length',  this.skillsArray.value.length);
      if(this.formValue.valid){
        console.log('te',this.skillsArray.value[0].seniorityRate);
        this.dashboardEmploObj.firstName = this.formValue.value.firstName;
        this.dashboardEmploObj.lastName = this.formValue.value.lastName;
        this.dashboardEmploObj.contactNumber = this.formValue.value.contactNumber;
        this.dashboardEmploObj.emailAddress = this.formValue.value.emailAddress;
        this.dashboardEmploObj.dateOfBirth = this.formValue.value.dateOfBirth;
        this.dashboardEmploObj.streetAddress = this.formValue.value.streetAddress;
        this.dashboardEmploObj.city = this.formValue.value.city;
        this.dashboardEmploObj.postalCode = this.formValue.value.postalCode;
        this.dashboardEmploObj.country = this.formValue.value.country;
        for (let i = 0; i < this.skillsArray.value.length; i++) {
          console.log('i', i);
          this.dashboardEmploObj.skill = this.skillsArray.value[i].skill;
          this.dashboardEmploObj.yearsExp = this.skillsArray.value[i].yearsExp;
          this.dashboardEmploObj.seniorityRate = this.skillsArray.value[i].seniorityRate;
        }
        //posting data to the postEmployeeInfo function
        console.log('all', this.dashboardEmploObj);
        this.employeeApi.postEmployeeInfo(this.dashboardEmploObj)
        .subscribe(res=>{
          console.log(res);
          alert('sucessfull added data');
          let cancelForm = document.getElementById('cancel');
          cancelForm?.click();
          this.formValue.reset();
          this.getAllEmployeeInfo();
        });
        console.log('values',this.formValue.value) 
        return
        } else{
          alert("Fill in all required field");
        }
  }

  //function to collect all data from json data
  getAllEmployeeInfo() {
    this.employeeApi.getEmployeeInfo()
     .subscribe(res =>{
      this.employeeData = res;
      console.log('data', this.employeeData);
      //getting number of employees
      this.numberOfEmp = Object.keys(this.employeeData).length;
      //if number of employees is 0 hide search bar, filter and show No employee text
      if(this.numberOfEmp === 0){
        this.hideEmp = true;
        this.showEmp = false;
      } else {
        this.hideEmp = false;
        this.showEmp = true;
      }
    })
  }
  //function to delete record
  deleteRecord(emp: any) {
    this.employeeApi.deleteEmployeeInfo(emp.id)
    .subscribe(res =>{
      alert("Employee Record Deleted");
      this.getAllEmployeeInfo();
    });

  }

  //fuction to edit fields
  editRecord(emp : any) {
    //open the modal with an id assigned to the new employee button
    let openModalRef = document.getElementById("openModalEdit");
    openModalRef?.click();
    
    this.showSubmit = false;
    this.showUpdate = true;
    this.dashboardEmploObj.id = emp.id;
    console.log('formarray', this.formValue.get('skills') as FormArray);
    const formControlValues = this.formValue.get('skills') as FormArray;
    const fArrayValues = formControlValues.controls[0];
    console.log('f', formControlValues.controls.length);

    this.formValue.controls['firstName'].setValue(emp.firstName);
    this.formValue.controls['lastName'].setValue(emp.lastName);
    this.formValue.controls['contactNumber'].setValue(emp.contactNumber);
    this.formValue.controls['emailAddress'].setValue(emp.emailAddress);
    this.formValue.controls['dateOfBirth'].setValue(emp.dateOfBirth);
    this.formValue.controls['streetAddress'].setValue(emp.streetAddress);
    this.formValue.controls['city'].setValue(emp.city);
    this.formValue.controls['postalCode'].setValue(emp.postalCode);
    this.formValue.controls['country'].setValue(emp.country);
    for(let i = 0; i < formControlValues.controls.length; i++) {
      formControlValues.controls[i].setValue({
        skill:emp.skill,
        yearsExp:emp.yearsExp,
        seniorityRate:emp.seniorityRate
      });
    }
  }
  
  //function to update records 
  updateEmployeeDetails(){
    
    this.dashboardEmploObj.firstName = this.formValue.value.firstName;
    this.dashboardEmploObj.lastName = this.formValue.value.lastName;
    this.dashboardEmploObj.contactNumber = this.formValue.value.contactNumber;
    this.dashboardEmploObj.emailAddress = this.formValue.value.emailAddress;
    this.dashboardEmploObj.dateOfBirth = this.formValue.value.dateOfBirth;
    this.dashboardEmploObj.streetAddress = this.formValue.value.streetAddress;
    this.dashboardEmploObj.city = this.formValue.value.city;
    this.dashboardEmploObj.postalCode = this.formValue.value.postalCode;
    this.dashboardEmploObj.country = this.formValue.value.country;
    for (let i = 0; i < this.skillsArray.value.length; i++) {
      this.dashboardEmploObj.skill = this.skillsArray.value[i].skill;
      this.dashboardEmploObj.yearsExp = this.skillsArray.value[i].yearsExp;
      this.dashboardEmploObj.seniorityRate = this.skillsArray.value[i].seniorityRate;
    }
   

    //updating data to the updateEmployeeInfo function
    this.employeeApi.updateEmployeeInfo(this.dashboardEmploObj,this.dashboardEmploObj.id)
      .subscribe(res=>{
        alert("successfully updated!");
        let cancelForm = document.getElementById('cancel');
        cancelForm?.click();
        this.formValue.reset();
        this.getAllEmployeeInfo();
      });
  }

  //function to open modal
  openModal() {
    this.display = "block";
    this.showSubmit = true;
    this.showUpdate = false;
    this.formValue.reset();
  }

  ////function to close modal
  onCloseHandled() {
    this.display = "none";
  }

  //Dropdown Filter Function
  valueSelected() {
    this.employees = this.employeeApi.getEmployeeInfo().forEach(
      item => item.id === this.selectedValue);
  }

}
