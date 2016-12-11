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
    QuestionsComponent
} from './questions/questions.component';

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
    path: 'questions',
    component: QuestionsComponent
}, {
    path: 'missions',
    component: MissionsComponent
}, {
    path: '',
    pathMatch: 'full',
    redirectTo: '/questions'
}, {
    path: '**',
    component: PageNotFoundComponent
}];

export {
    appRoutes
};
