import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  // counter:number = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

// onIncrement(){
//   this.counter++
// }

// OnDecrement(){
//   this.counter--
// }

// onReset(){
//   this.counter = 0;
// }

}
