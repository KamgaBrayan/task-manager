# Task Manager

A modern, responsive task management application built with Angular. This application helps users organize their daily tasks with features like priority levels, due dates, and status tracking.

## Project Overview

### Aim
The Task Manager is designed to provide a simple yet powerful interface for managing tasks. It focuses on delivering a smooth user experience while maintaining data persistence through browser local storage.

### Key Features
- Create, read, update, and delete tasks
- Set task priorities (low, medium, high)
- Track task status (ongoing, completed)
- Add due dates and descriptions
- Persistent storage using browser localStorage
- Responsive design for all devices
- Modern UI with Bootstrap styling

## Project Structure

```
task-manager/
├── src/
│   ├── app/
│   │   ├── services/
│   │   │   └── task.service.ts      # Core service for task management
│   │   ├── task-list/              # Task list view component
│   │   ├── task-form/              # Task creation/editing component
│   │   └── task-details/           # Task details view component
│   ├── assets/                     # Static assets
│   └── styles/                     # Global styles
└── package.json                    # Project dependencies
```

## Current Implementation

### Completed Features
- Complete CRUD operations for tasks
- Local storage implementation for data persistence
- Responsive UI with Bootstrap
- Task filtering and sorting
- Priority and status management
- Due date tracking

### Recent Updates
- Migrated from JSON server to localStorage for improved reliability
- Enhanced error handling
- Improved type safety with TypeScript
- Added detailed task view functionality

## Future Optimizations

### Planned Features
1. User Authentication
   - Login/Register functionality
   - User-specific task lists
   - Role-based access control

2. Data Management
   - Cloud synchronization
   - Export/Import functionality
   - Data backup options

3. UI/UX Improvements
   - Dark mode support
   - Customizable themes
   - Drag-and-drop task organization
   - Task categories and tags

4. Performance Optimizations
   - Lazy loading for better initial load time
   - Caching strategies
   - Offline support

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI

### Installation
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd task-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository

2. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Add your commit message"
   ```

4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a Pull Request

### Development Guidelines
- Follow Angular style guide
- Write clear commit messages
- Add appropriate documentation
- Include unit tests for new features
- Ensure all tests pass before submitting PR

## Available Scripts

- `npm start`: Start development server
- `npm run build`: Build production version
- `npm test`: Run unit tests
- `npm run lint`: Run linting
- `npm run e2e`: Run end-to-end tests

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Angular team for the fantastic framework
- Bootstrap team for the UI components
- All contributors who have helped shape this project
