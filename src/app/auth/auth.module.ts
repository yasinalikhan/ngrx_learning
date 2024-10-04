import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { AUTH_STATE_NAME } from "./state/auth.selector";
import { AuthReducer } from "./state/auth.reducer";


const routes:Routes =[
    {
        path:'',
        children:[
               {path:'', redirectTo:'login',pathMatch:'full'},
               {
                path:'login',
                component:LoginComponent
               }
        ]
    }
]

@NgModule({
    declarations: [
    LoginComponent
  ],
    imports:[CommonModule,ReactiveFormsModule, RouterModule.forChild(routes),StoreModule.forFeature(AUTH_STATE_NAME,AuthReducer)],
})

export class AuthModule{

}