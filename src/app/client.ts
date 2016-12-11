import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { Client } from 'subscriptions-transport-ws';
import { print } from 'graphql-tag/printer';
import 'whatwg-fetch';

interface Result {
    _id?: string;
    __typename?: string;
    node?: any;
}

function addGraphQLSubscriptions(networkInterface: any, wsClient: Client) {
    function subscribe(request: any, handler: any): number {
        return wsClient.subscribe({
            query: print(request.query),
            variables: request.variables
        }, handler);
    }
    function unsubscribe(id: number) {
        wsClient.unsubscribe(id);
    }

    return Object.assign(networkInterface, subscribe, unsubscribe);
}

const networkInterface: any = createNetworkInterface({
    uri: 'https://yoobic-loopback-dev.herokuapp.com/graphql',
    // batchInterval: 10,
    opts: {
        credentials: 'same-origin',
    }
});

// const wsClient: Client = new Client('ws://localhost:3000');

// const networkInterfaceWithSubscription: any = addGraphQLSubscriptions(networkInterface, wsClient);

networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};  // Create the header object if needed.
        }
        // get the authentication token from local storage if it exists
        req.options.headers.authorization = localStorage.getItem('token') || null;
        next();
    }
}]);

const client: ApolloClient = new ApolloClient({
    networkInterface: networkInterface,
    // dataIdFromObject: (result: Result) => {
    //     let retval = null;
    //     if (result.node) {
    //         retval = result.node;
    //     }
    //     if (result._id && result.__typename) {
    //         retval = result.__typename + result._id;
    //     }
    //     return retval;
    // }
});

export {
    client
}
