import {
    Routes
} from '@angular/router';
import {
    AuthComponent
} from './auth/auth.component';
import {
    PageNotFoundComponent
} from './page.not.found.component';

import {
    DocumentsComponent
} from './documents/documents.component';

import {
    MissionsComponent
} from './missions/missions.component';

const appRoutes: Routes = [{
    path: 'login',
    component: AuthComponent,
    data: {
        mode: 'login'
    }
}, {
    path: 'documents',
    component: DocumentsComponent
}, {
    path: 'missions',
    component: MissionsComponent
}, {
    path: '',
    pathMatch: 'full',
    redirectTo: '/documents'
}, {
    path: '**',
    component: PageNotFoundComponent
}];

export {
    appRoutes
};
