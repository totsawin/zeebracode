import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { DataService } from '../see-fun/shared/data.service';

@Component({
  selector: 'app-see-fun',
  templateUrl: './see-fun.component.html',
  styleUrls: ['./see-fun.component.scss']
})
export class SeeFunComponent implements OnInit {

  code = '';
  code$: Observable<Object>;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.code = this.route.snapshot.params.code;
   }

  ngOnInit() {
    this.code$ = this.dataService.fetchCode(this.code)
      .pipe(
        map(response => response.data),
        catchError(error => of(error.error))
      );
  }

}
