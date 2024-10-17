import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';
import { getPostById } from '../state/post.selector';
import { Post } from 'src/app/models/posts.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { updatePost } from '../state/post.action';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {

  post!:Post;
  editPostFrom!:FormGroup;
  postSubscription!:Subscription;

  constructor(private store:Store<AppState>,private router:Router) { }

  ngOnInit(): void {
    this.createFrom();
    this.store.select(getPostById).subscribe((post) => {
      if (post) {
        this.post = post;
        this.editPostFrom.patchValue({
          title: post.title,
          description: post.description,
        });
      }
    });
    // this.route.paramMap.subscribe((params)=>{
    //  const  id = params.get('id');

    // this.postSubscription = this.store.select(getPostById,{ id }).subscribe((data)=>{
    //         this.post = data;
    //         console.log(this.post);
    //         this.createFrom();
    //     })
    // })
  }

  createFrom(){
    this.editPostFrom = new FormGroup({
      title: new FormControl(null,[Validators.required,Validators.minLength(6)]),
      description:new FormControl(null,[Validators.required,Validators.minLength(10)])
    });
  }

  
  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  onPostUpdate(){
    if (!this.editPostFrom.valid) {
      return;
    }

    const title = this.editPostFrom.value.title;
    const description = this.editPostFrom.value.description;

      const post:Post = {
        id:this.post.id,
        title,
        description
      };

      this.store.dispatch(updatePost({post}));
      this.router.navigate(['posts']);
  }

}
