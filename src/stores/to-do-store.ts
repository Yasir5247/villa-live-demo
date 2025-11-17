import { makeAutoObservable } from "mobx"

export class TodoStore {
  todos: Todo[] = []
  filter: "all" | "active" | "complete" = "all"

  constructor() {
    makeAutoObservable(this)
  }

  addTodo (title: string){
    if(!title.trim()) return 

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
    }

    this.todos.push(newTodo)
  }

  removeTodo(id: string){
    this.todos.filter(todo => todo.id !== id)
  }
  
}


export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}