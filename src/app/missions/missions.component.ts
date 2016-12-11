import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Angular2Apollo,
  ApolloQueryObservable
} from 'angular2-apollo';

import { Subscription } from 'rxjs/Subscription';

import { missionsQuery } from './missions.model';


@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent implements OnInit, OnDestroy {
  public data: any;
  public loading: boolean = true;
  public displayAll: boolean;
  private itemsPerPage: number = 2;
  public currentPage: number = 1;
  public obs: ApolloQueryObservable<any>;
  public sub: Subscription;
  constructor(
    private apollo: Angular2Apollo
  ) { }

  private cleanQuery(after: string) {
    this.obs = this.apollo.watchQuery({
      query: missionsQuery,
      variables: {
        first: this.itemsPerPage,
        after
      }
      // pollInterval: 20000
    });

    this.sub = this.obs.subscribe(res => {
      this.loading = false;
      this.data = res.data;
    });
  }

  private additionalQuery(after: string) {
    this.obs.fetchMore({
      variables: {
        first: this.itemsPerPage,
        after
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        console.log('PREV', prev);
        console.log('FETCH MORE', fetchMoreResult);
        if (!fetchMoreResult.data) { return prev; }
        return Object.assign(prev, {
          allMissions: {
            edges: [...prev.allMissions.edges, ...fetchMoreResult.data.allMissions.edges]
          }
        });
      }
    });
  }

  ngOnInit() {
    this.cleanQuery(null);
  }


  public nextPage(): void {
    let endCursor = this.data.allMissions.edges[this.data.allMissions.edges.length - 1].cursor;
    if (this.displayAll) {
      this.additionalQuery(endCursor);
    } else {
      this.cleanQuery(endCursor);
    }
  }
  public modeChanged(element): void {
    this.displayAll = element.currentTarget.checked;
  }

  ngOnDestroy() {
  }
}
