import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from './store/app.store';
import { Store } from '@ngrx/store';
import { getLoading } from './store/shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngrx_counter';
  showLoading!: Observable<boolean>; 
  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.showLoading = this.store.select(getLoading);
  }
}
