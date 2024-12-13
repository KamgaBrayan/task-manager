import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TaskService, Task } from '../services/task.service';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4" *ngIf="task">
      <h2>Task Details</h2>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ task.title }}</h5>
          <p class="card-text" *ngIf="task.description">{{ task.description }}</p>
          <p class="card-text">
            Status: 
            <span 
              class="badge" 
              [ngClass]="task.status === 'completed' ? 'bg-success' : 'bg-warning'"
            >
              {{ task.status === 'completed' ? 'Completed' : 'Ongoing' }}
            </span>
          </p>
          <p class="card-text">
            Priority:
            <span class="badge"
                  [ngClass]="{'bg-info': task.priority === 'low', 
                            'bg-warning': task.priority === 'medium',
                            'bg-danger': task.priority === 'high'}">
              {{ task.priority }}
            </span>
          </p>
          <p class="card-text">
            Due Date: {{ task.dueDate | date:'MM/dd/yyyy' }}
          </p>
          <p class="card-text">
            Created: {{ task.createdAt | date:'MM/dd/yyyy' }}
          </p>
        </div>
        <div class="card-footer">
          <a routerLink="/tasks" class="btn btn-secondary">
            Back to List
          </a>
        </div>
      </div>
    </div>
  `
})
export class TaskDetailsComponent implements OnInit {
  task?: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    if (taskId) {
      this.taskService.getTask(taskId).subscribe((task: Task) => {
        this.task = task;
      });
    }
  }
}