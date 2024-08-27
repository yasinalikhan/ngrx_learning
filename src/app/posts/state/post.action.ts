import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models/posts.model";

export const ADD_POST_ACTION = '[Post page] add post page';
export const UPDATE_POST_ACTION = '[Update post] and post page';
export const DELETE_POST_ACTION ='[Delete post] and post page';


export const  addPost = createAction(
    ADD_POST_ACTION, 
    props<{post:Post}>()
    
    ); 
export const updatePost = createAction(
    UPDATE_POST_ACTION,
     props<{post:Post}>()
     );

export const deletePost = createAction(
      DELETE_POST_ACTION,
      props<{id:string}>()
);     