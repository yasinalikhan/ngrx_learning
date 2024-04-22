import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { customIncrement } from '../state/counter.action';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent implements OnInit {

  value!:number;
  constructor(private store:Store<{counter: CounterState}>) { }

  ngOnInit(): void {
  }


  onAdd(){
   this.store.dispatch(customIncrement({count: +this.value}))
  }

}
