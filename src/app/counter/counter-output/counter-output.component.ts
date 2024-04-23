import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { Observable, Subscription } from 'rxjs';
import { getCounter } from '../state/counter.selector';
import { AppState } from 'src/app/store/app.store';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss']
})
export class CounterOutputComponent implements OnInit{

  
  counter$!:Observable<number>;   // with ngrx
  counterSubscription!:Subscription
  // counter$: object<number>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
   this.counter$ = this.store.select(getCounter);
    // this.counter$ = this.store.select('counter');
  }

  

}
