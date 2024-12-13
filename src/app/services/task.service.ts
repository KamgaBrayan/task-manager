import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  dueDate: Date;
  createdAt: Date;
  status: 'ongoing' | 'completed';
  priority?: 'low' | 'medium' | 'high';
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly STORAGE_KEY = 'tasks';

  constructor() {
    // Initialize localStorage with empty array if it doesn't exist
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
  }

  private getStoredTasks(): Task[] {
    const tasksJson = localStorage.getItem(this.STORAGE_KEY);
    const tasks = JSON.parse(tasksJson || '[]');
    return tasks.map((task: any) => ({
      ...task,
      dueDate: new Date(task.dueDate),
      createdAt: new Date(task.createdAt)
    }));
  }

  private saveTasksToStorage(tasks: Task[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  getTasks(): Observable<Task[]> {
    return of(this.getStoredTasks());
  }

  getTask(id: number): Observable<Task> {
    const tasks = this.getStoredTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return of(task);
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.addTask(task);
  }

  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    const tasks = this.getStoredTasks();
    const newTask = {
      ...task,
      id: Date.now(), // Use timestamp as ID
      createdAt: new Date()
    };
    tasks.push(newTask);
    this.saveTasksToStorage(tasks);
    return of(newTask);
  }

  updateTask(task: Task): Observable<Task> {
    const tasks = this.getStoredTasks();
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      this.saveTasksToStorage(tasks);
      return of(task);
    }
    throw new Error('Task not found');
  }

  deleteTask(id: number): Observable<void> {
    const tasks = this.getStoredTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    this.saveTasksToStorage(filteredTasks);
    return of(void 0);
  }
}
