import AsyncStorage from "@react-native-async-storage/async-storage"
import { makeAutoObservable } from "mobx"
import { makePersistable } from "mobx-persist-store"

export class TodoStore {
  todos: Todo[] = []
  filter: "all" | "active" | "complete" = "all"

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: 'TodoStore',
      properties: ['todos'],
      storage: AsyncStorage
    })
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
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  updateTodo(id: string, tile: string){
    const foundTodo = this.todos.find(t => t.id == id)
    if(foundTodo){
      foundTodo.title = tile
    }
  }

  clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed)
  }

  async hydrate(): Promise<void> {
    // makePersistable handles hydration automatically
  }
  
}


export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}