import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  Angular2Apollo
} from 'angular2-apollo';
import {
  newQuestionMutation
} from './new-question.model';
import { QuestionsService } from './../questions/questions.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {

  public questionForm = this.fb.group({
    title: ['', Validators.required],
    description: ['']
  });
  public error: string;
  constructor(
    public fb: FormBuilder,
    private apollo: Angular2Apollo,
    private questionsService: QuestionsService
  ) { }

  ngOnInit() { }

  addQuestion(event) {
    this.error = '';
    console.log(event);
    this.apollo.mutate({
      mutation: newQuestionMutation,
      variables: {
        obj: this.questionForm.value,
      },
      optimisticResponse: optimisticQuestion(this.questionForm.value),
      updateQueries: {
        allQuestions: this.questionsService.updateQuestionsQuery
      }
    })
      .toPromise()
      .then((res) => {
        console.log(res);
      }).catch((error) => {
        this.error = error.message;
      });
  }
}

function optimisticQuestion(mutationResult): Object {
  // this is how the server would have return the data
  return {
    QuestionsCreate: {
      _id: null,
      description: mutationResult.description,
      title: mutationResult.title,
      date: null,
      user: null
    }
  };
}

