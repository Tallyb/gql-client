import ApolloClient, {
    createNetworkInterface
} from 'apollo-client';
import {
    Injectable, NgModule
} from '@angular/core';

import 'whatwg-fetch';

import {Angular2Apollo, ApolloModule} from 'angular2-apollo';

import { ConfigService } from './common/config.service';

interface Result {
    _id ?: string;
    __typename ?: string;
    node ?: any;
    cursor ?: string;
}

@Injectable()
export class Client {
    client: ApolloClient;
    private networkInterface: any;

    constructor(private config: ConfigService) {
        this.networkInterface = createNetworkInterface({
            uri: this.config.getGraphQLUrl(),
            // batchInterval: 10,
            opts: {
                credentials: 'same-origin',
            }
        });

        this.networkInterface.use([{
            applyMiddleware(req, next) {
                if (!req.options.headers) {
                    req.options.headers = {}; // Create the header object if needed.
                }
                // get the authentication token from local storage if it exists
                req.options.headers.authorization = localStorage.getItem('token') || null;
                next();
            }
        }]);

        this.client = new ApolloClient({
            networkInterface: this.networkInterface,
            // dataIdFromObject: (result: Result) => {
            //     if (result.node && result.node._id && result.node.__typename) {
            //         return result.node.__typename + result.node._id;
            //     }
            //     return result;
            // }
        });
    }

}

@NgModule({
    providers: [Client, {
      provide: Angular2Apollo,
      useFactory: (graphqlClient) => {
        return new Angular2Apollo(graphqlClient.client);
      },
      deps: [Client]
    }],
    declarations: [],
    exports: [ApolloModule],
    imports: [ApolloModule]

})
export class MyApolloModule {}
