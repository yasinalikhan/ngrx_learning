import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.store';
import { getPosts } from '../state/post.selector';
import { deletePost } from '../state/post.action';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
 posts$!: Observable<Post[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts);
  }

  deletePost(id:any){
    if (confirm('are you sure want to delete post')) {
      this.store.dispatch(deletePost({id}));
    }
  }

}
