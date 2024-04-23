import { Post } from "src/app/models/posts.model";

export  interface PostState {
    posts:Post[]
}

export  const initialState : PostState ={
    posts:[
        {id:1, title:"Title One", description: 'Description one'},
        {id:2, title:'Title Two', description: 'Description two'}
    ],
}