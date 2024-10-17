import { Post } from "src/app/models/posts.model";

export  interface PostState {
    posts:Post[] | null
}

export  const initialState : PostState ={
    posts:null
}