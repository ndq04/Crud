import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos!: Todo[];
  todo: Todo = { id: 0, title: '', isDone: false };
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getAllTodos();
  }
  getAllTodos() {
    this.todoService.getAllTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  getDoneTodos() {
    this.todoService.getAllTodos().subscribe((data) => {
      this.todos = data.filter((item) => item.isDone);
    });
  }
  onSubmit(form: NgForm) {
    const newTodo: Todo = {
      ...this.todo,
      ...form.value,
    };
    if (form.value.title && form.value.title.trim()) {
      this.todoService.addTodo(newTodo).subscribe(() => this.getAllTodos());
      form.reset();
    }
  }
  toggleDone(todo: Todo) {
    const updateTodo = {
      ...todo,
      isDone: !todo.isDone,
    };
    this.todoService
      .updateTodo(todo.id, updateTodo)
      .subscribe(() => this.getAllTodos());
  }
  deleteTodo(todo: Todo) {
    if (confirm('Are you sure you want to delete ?')) {
      this.todoService.deleteTodo(todo.id).subscribe(() => this.getAllTodos());
    }
  }
}
