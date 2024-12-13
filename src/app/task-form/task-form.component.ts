import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormBuilder, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators 
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { TaskService, Task } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h2>Add New Task</h2>
      <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" class="needs-validation">
        <div class="mb-3">
          <label for="title" class="form-label">Task Title*</label>
          <input 
            type="text" 
            class="form-control" 
            id="title" 
            formControlName="title"
            [ngClass]="{'is-invalid': titleInvalid}"
          >
          <div *ngIf="titleInvalid" class="invalid-feedback">
            Title is required (min. 3 characters)
          </div>
        </div>

        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea 
            class="form-control" 
            id="description" 
            formControlName="description"
            rows="3"
          ></textarea>
        </div>
        
        <div class="mb-3">
          <label for="dueDate" class="form-label">Due Date*</label>
          <input 
            type="date" 
            class="form-control" 
            id="dueDate" 
            formControlName="dueDate"
            [ngClass]="{'is-invalid': dueDateInvalid}"
          >
          <div *ngIf="dueDateInvalid" class="invalid-feedback">
            Due date is required
          </div>
        </div>

        <div class="mb-3">
          <label for="priority" class="form-label">Priority</label>
          <select 
            class="form-select" 
            id="priority" 
            formControlName="priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div class="mb-3">
          <label for="status" class="form-label">Status</label>
          <select 
            class="form-select" 
            id="status" 
            formControlName="status"
          >
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          class="btn btn-primary"
          [disabled]="taskForm.invalid"
        >
          Add Task
        </button>
        <a routerLink="/tasks" class="btn btn-secondary ms-2">
          Cancel
        </a>
      </form>
    </div>
  `
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', [
        Validators.required, 
        Validators.minLength(3)
      ]],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['medium'],
      status: ['ongoing']
    });
  }

  get titleInvalid(): boolean {
    const control = this.taskForm.get('title');
    return !!(control?.invalid && control?.touched);
  }

  get dueDateInvalid(): boolean {
    const control = this.taskForm.get('dueDate');
    return !!(control?.invalid && control?.touched);
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      const newTask: Task = {
        ...formData,
        createdAt: new Date(),
        dueDate: new Date(formData.dueDate)
      };
      
      this.taskService.createTask(newTask).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}
