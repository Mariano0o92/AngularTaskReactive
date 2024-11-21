import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
form = new FormGroup({
  projectName: new FormControl('', {validators: [Validators.required]}),
  projectDescription: new FormControl(''),
  teamMembers: new FormArray([])
})

get teamMembers(): FormArray {
  return this.form.get('teamMembers') as FormArray;
}


get buttonContent() : string {
  return this.teamMembers.length === 0 ? 'add team member' : 'add next member'
}


addTeamMember() {
  const teamMember = new FormGroup({
    name: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    availability: new FormControl(false)
  });
  this.teamMembers.push(teamMember);
}

removeTeamMember(index: number) {
this.teamMembers.removeAt(index)
}
submittedData:any = null
onSubmit() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    console.log('Form is invalid');
    return
  }
  this.submittedData = this.form.value
  console.log(this.submittedData);
  console.log(this.form);
}

}
