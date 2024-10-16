import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from './store/app.store';
import { Store } from '@ngrx/store';
import { getErrorMessage, getLoading } from './store/shared/shared.selector';
import { autoLogin } from './auth/state/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngrx_counter';
  showLoading!: Observable<boolean>; 
  errorMessage!: Observable<string>;
  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin());
  }
}
