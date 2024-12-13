import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService, Task } from '../services/task.service';

// Interface pour définir la structure d'une tâche
// export interface Task {
//   id?: number;
//   title: string;
//   description?: string;
//   dueDate: Date;
//   createdAt: Date;
//   status: 'ongoing' | 'completed';
//   priority?: 'low' | 'medium' | 'high';
// }

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h2 class="mb-4">Task List</h2>
      <div *ngIf="tasks.length === 0" class="alert alert-info">
        No tasks found
      </div>
      <ul class="list-group">
        <li *ngFor="let task of tasks" class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h5 class="mb-1">{{ task.title }}</h5>
            <p class="mb-1 text-muted" *ngIf="task.description">{{ task.description }}</p>
            <small class="text-muted">
              Due date: {{ task.dueDate | date:'MM/dd/yyyy' }}
            </small>
          </div>
          <div class="d-flex align-items-center">
            <span class="badge me-2" 
                  [ngClass]="{'bg-success': task.status === 'completed', 'bg-warning': task.status === 'ongoing'}"
                  style="cursor: pointer;"
                  (click)="toggleStatus(task)">
              {{ task.status === 'completed' ? 'Completed' : 'Ongoing' }}
            </span>
            <span class="badge me-2" 
                  [ngClass]="{'bg-info': task.priority === 'low', 
                            'bg-warning': task.priority === 'medium',
                            'bg-danger': task.priority === 'high'}">
              {{ task.priority }}
            </span>
            <button class="btn btn-sm btn-danger ms-2" (click)="deleteTask(task.id)">
              Delete
            </button>
            <a [routerLink]="['/tasks', task.id]" class="btn btn-sm btn-info ms-2">
              Details
            </a>
          </div>
        </li>
      </ul>
      <div class="mt-3">
        <a routerLink="/tasks/new" class="btn btn-primary">Add Task</a>
      </div>
    </div>
  `
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  deleteTask(id?: number): void {
    if (id) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      });
    }
  }

  toggleStatus(task: Task): void {
    const newStatus: 'ongoing' | 'completed' = task.status === 'completed' ? 'ongoing' : 'completed';
    const updatedTask: Task = {
      ...task,
      status: newStatus
    };
    this.taskService.updateTask(updatedTask).subscribe(updated => {
      const index = this.tasks.findIndex(t => t.id === updated.id);
      if (index !== -1) {
        this.tasks[index] = updated;
        this.tasks = [...this.tasks];
      }
    });
  }
}