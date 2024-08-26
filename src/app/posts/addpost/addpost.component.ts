import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.store';
import { addPost } from '../state/post.action';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss']
})
export class AddpostComponent implements OnInit {
  postForm!: FormGroup;

  constructor(private store:Store<AppState>) { }

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

      const post:Post = {
        title:this.postForm.value.title,
        description:this.postForm.value.description
      }

      this.store.dispatch(addPost({post}));
    
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
