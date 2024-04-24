import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss']
})
export class AddpostComponent implements OnInit {
  postForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title:new FormControl (null,[Validators.required,Validators.minLength(6)]),
      description:new FormControl (null,[Validators.required,Validators.minLength(10)]),
    });
  }

  onAddPost(){

    if (!this.postForm.valid) {
      return;
    }
    console.log(this.postForm);
  }

  showDescriptionErrors(){
    const description =  this.postForm.get('description');
    if(description?.touched && !description.valid){
      if (description.errors?.['required']) {
        return 'Description is required';
      }

      if (description.errors?.['minlength']) {
        return 'Description must be at least 10 charrecetr';
        
      }

    }

    return '';
  }

}
