import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models/posts.model";

export const ADD_POST_ACTION = '[Post page] add post page';

export const  addPost = createAction(ADD_POST_ACTION, props<{post:Post}>()); 