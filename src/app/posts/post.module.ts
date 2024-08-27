import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostListComponent } from "./post-list/post-list.component";
import { AddpostComponent } from "./addpost/addpost.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";




const routes:Routes = [{
    path:'',
    component:PostListComponent,
    children: [
        {path:'add',component:AddpostComponent},
        {path:'edit/:id',component:EditPostComponent}
      ]
}]

@NgModule({
    declarations:[  
        PostListComponent,
        AddpostComponent,
        EditPostComponent
    ],
    imports:[CommonModule,RouterModule.forChild(routes),FormsModule,ReactiveFormsModule]
})
export class PostModule{}