import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
// url: string = 'http://localhost:3000/';
// uri: 'https://yoobic-loopback-dev.herokuapp.com/';
url: string = 'https://yoobic-loopback-tally.herokuapp.com/';

  constructor() { }
    getGraphQLUrl() {
      return this.url + 'graphql';
    }
}
