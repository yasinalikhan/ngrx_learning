import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';
import { getPostById } from '../state/post.selector';
import { Post } from 'src/app/models/posts.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {

  post!:Post;
  editPostFrom!:FormGroup;
  postSubscription!:Subscription;

  constructor(private route:ActivatedRoute,private store:Store<AppState>) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
     const  id = params.get('id');

    this.postSubscription = this.store.select(getPostById,{ id }).subscribe((data)=>{
            this.post = data;
            console.log(this.post);
            this.createFrom();
        })
    })
  }

  createFrom(){
    this.editPostFrom = new FormGroup({
      title: new FormControl(this.post.title,[Validators.required,Validators.minLength(6)]),
      description:new FormControl(this.post.description,[Validators.required,Validators.minLength(10)])
    });
  }

  ngOnDestroy(): void {
      this.postSubscription.unsubscribe();
  }

}