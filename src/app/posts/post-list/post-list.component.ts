import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.store';
import { getPosts } from '../state/post.selector';
import { deletePost, loadPosts } from '../state/post.action';
import { PostsService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
 posts$!: Observable<Post[] | null>;
  constructor(private store: Store<AppState>,private postsService: PostsService) { }

  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
    this.postsService.getPosts().subscribe((data)=>{
      console.log(data);
    })
  }

  deletePost(id:any){
    if (confirm('are you sure want to delete post')) {
      this.store.dispatch(deletePost({id}));
    }
  }

}
