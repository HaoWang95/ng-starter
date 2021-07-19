import { Component, OnInit } from '@angular/core';
import { from, throwError } from 'rxjs';
import {map, tap, take, catchError} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'pm';

  ngOnInit(){
    from([1,2,3,4,5,6,7])
      .pipe(
        catchError(
          err => {
            console.log(err)
            return throwError(err)
          }
        ),
        tap(item => console.log(`${item} is emitted, perform ops`)),
        map(item => item += 3),
        take(5)
      ).subscribe(
        item => console.log(`subscribed item => ${item}`),
        err => console.log(`error occurred => ${err}`),
        () => console.log('complete')
      )
  }
}
