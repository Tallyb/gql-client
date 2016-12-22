import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Angular2Apollo,
  ApolloQueryObservable
} from 'angular2-apollo';

import { Subscription } from 'rxjs/Subscription';

import { query } from './documents.model';

const TOP_LEVEL = {or: [{ folder: { exists: false }}, {folder: { eq: ''}}]};

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})

export class DocumentsComponent implements OnInit, OnDestroy {
  public loading: boolean = true;
  public pageSize: number = 30;
  public totalFolders;
  public totalFiles;
  public obs: ApolloQueryObservable<any>;
  public sub: Subscription;
  public data: any;
  public where: any = TOP_LEVEL;
  public foldersPagination = {
    page: 1,
    order: 'name ASC',
    selected: undefined
  };

  public filesPagination = {
    page: 1,
    order: '_filename ASC'
  };

  constructor(
    private apollo: Angular2Apollo
  ) { }

  private fetchData() {
    this.obs = this.apollo.watchQuery({
      query: query,
      variables: {
        firstFolders: this.pageSize,
        firstFiles: this.pageSize,
        jumpFolders: this.pageSize * (this.foldersPagination.page - 1),
        jumpFiles: this.pageSize * (this.filesPagination.page - 1),
        where: this.where,
        orderFolders: this.foldersPagination.order,
        orderFiles: this.filesPagination.order
      }
    });
    this.sub = this.obs.subscribe(res => {
      this.loading = false;
      this.data = res.data;
      this.totalFolders = this.data.allFolders.count;
      this.totalFiles = this.data.allFiles.count;
    });
  }

  public goToFoldersPage(page: number): void {
    this.foldersPagination.page = page;
    this.fetchData();
  }

  public goToFilesPage(page: number): void {
    this.filesPagination.page = page;
    this.fetchData();
  }

  public goHome(): void {
    this.where = TOP_LEVEL;
    this.fetchData();
  }

  public getFolder(folder: any): void {
    console.log(folder);
    this.where = {or: [{ folder: { eq: folder.node._id }}, {parent: { eq: folder.node._id}}]};
    this.fetchData();
  }

  ngOnInit() {
    this.fetchData();
  }

  ngOnDestroy() {
  }
}

