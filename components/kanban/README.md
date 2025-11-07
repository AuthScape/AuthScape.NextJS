# Kanban Board Component

A modern, fully-featured kanban board system built with React, Material-UI, and Framer Motion.

## Features

### Core Features
- ✅ **Project Management** - Create and switch between multiple projects
- ✅ **Dynamic Columns** - Add, edit, delete, and reorder status columns
- ✅ **Rich Cards** - Full-featured task cards with:
  - Title and description
  - Priority levels (Low, Medium, High, Urgent)
  - Tags with custom colors
  - Assignees with avatars
  - Due dates with overdue indicators
  - Attachment and comment counts
- ✅ **Drag & Drop** - Smooth drag and drop for cards and columns
- ✅ **WIP Limits** - Optional Work In Progress limits per column
- ✅ **Dark Mode** - Full dark/light theme support
- ✅ **Animations** - Professional animations powered by Framer Motion
- ✅ **Responsive** - Works on desktop and mobile devices

### User Experience
- Quick add cards with inline form
- Click cards to view/edit full details
- Visual priority indicators
- Overdue date warnings
- Empty states with helpful CTAs
- Loading states
- Toast notifications for actions

## Components

### KanbanBoard
Main container component that manages the entire kanban board.

```jsx
import { KanbanBoard } from '@/components/kanban';

function MyPage() {
  return <KanbanBoard />;
}
```

### Card
Individual task card component with animations and metadata display.

### Column
Status column component with drag & drop support and WIP limits.

### CardModal
Full-screen modal for viewing and editing card details.

### ProjectSelector
Dropdown for selecting/creating projects.

## API Endpoints

The kanban board expects the following API endpoints:

### Projects
- `GET /Kanban/GetProjects` - Get all projects
- `POST /Kanban/CreateProject` - Create a new project
  - Body: `{ name: string, description: string }`

### Board & Columns
- `GET /Kanban/GetBoard?projectId={id}` - Get board data (columns and cards)
- `POST /Kanban/CreateColumn` - Create a new column
  - Body: `{ name: string, color: string, wipLimit: number?, projectId: number, order: number }`
- `PUT /Kanban/UpdateColumn` - Update column
  - Body: `{ id: number, name: string, color: string, wipLimit: number? }`
- `DELETE /Kanban/DeleteColumn?columnId={id}` - Delete column

### Cards
- `POST /Kanban/CreateCard` - Create a new card
  - Body: `{ title: string, columnId: string, projectId: number, ... }`
- `PUT /Kanban/UpdateCard` - Update card
  - Body: `{ id: string, title: string, description: string, priority: string, ... }`
- `PUT /Kanban/MoveCard` - Move card between columns
  - Body: `{ cardId: string, columnId: string, order: number }`
- `DELETE /Kanban/DeleteCard?cardId={id}` - Delete card

## Data Structures

### Project
```typescript
{
  id: number,
  name: string,
  description: string,
  createdAt: string (ISO date)
}
```

### Column
```typescript
{
  id: string,
  projectId: number,
  name: string,
  color: string (hex color),
  order: number,
  wipLimit?: number,
  isDone?: boolean
}
```

### Card
```typescript
{
  id: string,
  columnId: string,
  projectId: number,
  title: string,
  description?: string,
  priority: 'low' | 'medium' | 'high' | 'urgent',
  tags?: Array<{ name: string, color: string }>,
  assignees?: Array<{ name: string, avatar?: string }>,
  dueDate?: string (ISO date),
  attachmentCount: number,
  commentCount: number,
  order: number
}
```

## Mock Data

The component includes mock data initialization for development/testing when API calls fail. This allows you to see the full kanban board with sample projects, columns, and cards even without a backend.

## Styling

All components fully support dark/light mode through the MUI theme system. Colors automatically adjust based on the current theme mode.

### Custom Colors
- Priority badges have predefined colors
- Columns can have custom colors
- Tags can have custom colors

## Dependencies

- `framer-motion` - Animations
- `@dnd-kit/core` - Drag & drop core
- `@dnd-kit/sortable` - Sortable items
- `@mui/material` - UI components
- `@mui/x-date-pickers` - Date picker
- `react-toastify` - Notifications
- `authscape` - API service

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Optimized rendering with React
- Smooth 60fps animations
- Efficient drag & drop
- Lazy loading support ready
