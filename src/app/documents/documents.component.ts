declare var _: any;
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Angular2Apollo,
  ApolloQueryObservable
} from 'angular2-apollo';

import { Subscription } from 'rxjs/Subscription';

import { folderQuery, topQuery } from './documents.model';


const TOP_LEVEL = {or: [{ folder: { exists: false }}, {folder: { eq: ''}}]};

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})

export class DocumentsComponent implements OnInit, OnDestroy {
  public loading: boolean = true;
  public pageSize: number = 25;
  public obs: ApolloQueryObservable<any>;
  public sub: Subscription;
  public where: any = TOP_LEVEL;
  public path: Array<any> = [{_id: undefined, name: 'Home'}];

  public folders = {
    page: 1,
    order: 'name ASC',
    count: undefined,
    edges: []
  };

  public files = {
    page: 1,
    order: '_filename ASC',
    count: undefined,
    edges: []
  };

  constructor(
    private apollo: Angular2Apollo
  ) { }

  private fetchData() {
    let query;
    let variables = {
        firstFolders: this.pageSize,
        firstFiles: this.pageSize,
        jumpFolders: this.pageSize * (this.folders.page - 1),
        jumpFiles: this.pageSize * (this.files.page - 1),
        where: this.where,
        orderFolders: this.folders.order,
        orderFiles: this.files.order,
        id: undefined
    };
    if (_.isUndefined(_.last(this.path)._id)) {
      query = topQuery;
      this.where = TOP_LEVEL;
    } else {
      query = folderQuery;
      variables.id = _.last(this.path)._id;
    }
    this.obs = this.apollo.watchQuery({
      query,
      variables
    });
    this.sub = this.obs.subscribe(res => {
      this.loading = false;
      if (res.data && res.data.Folders) { // one folder query
        this.folders.edges = res.data.Folders.folders.edges;
        this.folders.count = res.data.Folders.folders.count;
        this.files.edges = res.data.Folders.files.edges;
        this.files.count = res.data.Folders.files.count;
      }
      if (res.data && res.data.allFolders) { // top level query
        this.folders.edges = res.data.allFolders.edges;
        this.folders.count = res.data.allFolders.count;
        this.files.edges = res.data.allFiles.edges;
        this.files.count = res.data.allFiles.count;
      }
    });
  }

  public goToFoldersPage(page: number): void {
    this.folders.page = page;
    this.fetchData();
  }

  public goToFilesPage(page: number): void {
    this.files.page = page;
    this.fetchData();
  }

  public goToFolder(index: number) {
    this.path = _.take(this.path, index + 1);
    this.folders.page = 1;
    this.files.page = 1;
    this.fetchData();
  }

  public loadFolder(folder: any): void {
    this.path.push({_id: folder.node._id, name: folder.node.name});
    this.fetchData();
  }

  ngOnInit() {
    this.fetchData();
  }

  ngOnDestroy() {
  }
}

