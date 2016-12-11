import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ApolloModule } from 'angular2-apollo';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';

import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { PageNotFoundComponent } from './page.not.found.component';
import { QuestionsService } from './questions/questions.service';

import { client } from './client';
import { QuestionsComponent } from './questions/questions.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewQuestionComponent } from './new-question/new-question.component';
import { MissionsComponent } from './missions/missions.component';

let localStorageServiceConfig = {
  prefix: 'gql-client',
  storageType: 'sessionStorage'
};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PageNotFoundComponent,
    QuestionsComponent,
    NavbarComponent,
    NewQuestionComponent,
    MissionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ApolloModule.withClient(client),
    NgbModule.forRoot()
  ],
  providers: [
    LocalStorageService,
    QuestionsService,
    {
      provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
