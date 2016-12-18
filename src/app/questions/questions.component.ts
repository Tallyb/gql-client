import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  Angular2Apollo,
  ApolloQueryObservable,
} from 'angular2-apollo';

import {
  Subscription
} from 'rxjs/Subscription';

import {
  questionsQuery
} from './questions.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  public data: any;
  public loading: boolean = true;
  public displayMode: boolean = true;
  private itemsPerPage: number = 2;
  public currentPage: number = 1;
  private obs: ApolloQueryObservable<any>;
  private sub: Subscription;

  constructor(
    private apollo: Angular2Apollo
  ) {}

  ngOnInit() {
    this.obs = this.apollo.watchQuery({
      query: questionsQuery,
      variables: {
        first: this.itemsPerPage,
        after: null
      }
      // pollInterval: 20000
    });

    this.sub = this.obs.subscribe(res => {
      this.loading = false;
      console.log('RES', res);
      this.data = res.data; // .allQuestions.edges;
    });
  }

  public nextPage(): void {
    this.obs.fetchMore({
      variables: {
        first: this.itemsPerPage,
        after: this.data.allQuestions.edges[this.data.allQuestions.edges.length - 1].cursor
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        console.log('PREV', prev);
        console.log('FETCH MORE', fetchMoreResult);
        return Object.assign(prev, {
          allQuestions: {
            edges: [...prev.allQuestions.edges, ...fetchMoreResult.data.allQuestions.edges]
          }
        });
      }
    });
  }

  ngOnDestroy() {
  }
}
