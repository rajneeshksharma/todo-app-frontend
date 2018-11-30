import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todoArray: Array<{ todo: String, complete: Boolean, _id: String }> = [];
  todo;
  todoForm: FormGroup;
  notValid = false;
  userId: number;
  constructor(private fb: FormBuilder, private apiService: ApiService,
    private router: Router) {
    this.todoForm = fb.group({
      'todo': ['', [
        Validators.required
      ]]
    });
   
  }
  ngOnInit() {
    this.apiService.getUserId().subscribe(res => {
        this.userId = res;
    });
    const data = {
      user: this.userId
    };
  this.apiService.getAllTodos(data).subscribe(res => {
    if(res.code === 200){
    let value = res.data[0];
    value.forEach(v => {
      this.todoArray.push(v);
    });
  } else { console.log(res.message);}
  }, err => { console.error(err, "err") });
   
  }
  deleteItem(todo) {
    this.apiService.rmTodo(todo).subscribe(res => {
      var pos = this.todoArray.indexOf(todo);
      this.todoArray.splice(pos, 1);
    }, err => { console.log(err); });

  }
  todoDone(todo) {
    this.apiService.isComplete(todo).subscribe(
      res => {
        var pos = this.todoArray.indexOf(todo);
        this.todoArray.splice(pos, 1);
        this.todoArray.push(res.data[0]);
      }, err => { console.log(err); }
    );
  }
  addTodo(todo) {
    if (this.todoForm.valid) {
      const newTodo = {
        todo: todo.todo,
        user: this.userId
      }
      this.apiService.addTodo(newTodo).subscribe(res => {
        this.todoArray.push(res.data[0]);
        this.todoForm.reset();
      }, err => { console.error(err) });
    }
    else {
      this.notValid = true;
      setTimeout(() => {
        this.notValid = false;
      }, 2000);
    }
  }
  logout() {
    window.localStorage.removeItem('token');
    this.apiService.sendUserId(0);
    this.router.navigate(['']);
  }

}
