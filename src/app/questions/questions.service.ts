import { Injectable } from '@angular/core';

@Injectable()
export class QuestionsService {
  constructor() { }

  public updateQuestionsQuery(prev: any, {mutationResult}: any) {
    console.log('PREV', prev);
    console.log('NEW', mutationResult);
    let data = mutationResult.data.QuestionsCreate;
    let newQuestion = {
      __typename: 'QuestionsEdge',
      node: {
        __typename: 'Questions',
        _id: null,
        description: data.description,
        title: data.title,
        date: data.date || null,
        user: {
          __typename: 'User',
          username: data.user || null
        }
      }
    };

    return Object.assign(prev, {
      allQuestions: {
        edges: [...prev.allQuestions.edges, newQuestion]
      }
    });
  }
}