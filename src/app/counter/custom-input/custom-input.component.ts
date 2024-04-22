import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { changeChanelName, customIncrement } from '../state/counter.action';
import { getChanelName } from '../state/counter.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent implements OnInit {

  value!:number;
  chanelName$!: Observable<string>;
  constructor(private store:Store<{counter: CounterState}>) { }

  ngOnInit(): void {

   this.chanelName$ = this.store.select(getChanelName);
  }


  onAdd(){
   this.store.dispatch(customIncrement({count: +this.value}))
  }

  chnageChanelName(){
    this.store.dispatch(changeChanelName())
  }

}
