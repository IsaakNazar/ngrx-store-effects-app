import {Injectable} from "@angular/core";

import {map, switchMap, catchError} from "rxjs/operators";
import {Actions, Effect} from "@ngrx/effects";

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';
import {of} from "rxjs/observable/of";

@Injectable()
export class PizzasEffects {
  constructor(private action$: Actions,
              private pizzaService: fromServices.PizzasService) {
  }

  @Effect()
  loadPizzas$ = this.action$.ofType(pizzaActions.LOAD_PIZZAS)
    .pipe(
      switchMap(() => {
        return this.pizzaService
          .getPizzas()
          .pipe(
            map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
            catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
          )
      }));
}
