import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { CounterComponent } from "./counter/counter.component";
import { CounterOutputComponent } from "./counter-output/counter-output.component";
import { CounterButtonsComponent } from "./counter-buttons/counter-buttons.component";
import { CustomInputComponent } from "./custom-input/custom-input.component";
import { FormsModule } from "@angular/forms";






const routes:Routes = [
    {
        path:'',
        component:CounterComponent
      },
]



@NgModule({
    declarations:[
        CounterComponent,
        CounterOutputComponent,
        CounterButtonsComponent,
        CustomInputComponent,
    ],
  imports:[CommonModule,RouterModule.forChild(routes),FormsModule]  
})

export class CounterModule{}