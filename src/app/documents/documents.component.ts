import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Angular2Apollo,
  ApolloQueryObservable
} from 'angular2-apollo';

import { Subscription } from 'rxjs/Subscription';

import { query } from './documents.model';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  public loading: boolean = true;
  public itemsPerPage: number = 30;
  public pages: Array<number> = [0, 1, 2, 3, 4, 5];
  public obs: ApolloQueryObservable<any>;
  public sub: Subscription;

  constructor(
    private apollo: Angular2Apollo
  ) { }

  private fetchData(pageNum) {
    this.obs = this.apollo.watchQuery({
      query: query,
      variables: {
        first: this.itemsPerPage,
        jump: this.itemsPerPage * (pageNum)
      }
      // pollInterval: 20000
    });

  }

  ngOnInit() {
    this.fetchData(0);
  }

  public gotToPage(pageNum): void {
    this.fetchData(pageNum);
  }

  ngOnDestroy() {
  }
}

