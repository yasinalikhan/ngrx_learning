import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map } from "rxjs";
import { AuthService } from "src/app/services/auth,service";
import { loginStart, loginSuccess } from "./auth.action";
import { Store } from "@ngrx/store";
import { setLoadingSpinner } from "src/app/store/shared/shared.action";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService,private store:Store) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({status:false}));
            const user = this.authService.formatUser(data);
            return loginSuccess({user});
          })
        );
      })
    );
  });
}