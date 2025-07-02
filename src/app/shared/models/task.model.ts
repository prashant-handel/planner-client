export interface Task {
  _id?: string;
  name: string;
  startDate?: Date | string;
  dueDate: Date | string;
  progress: 'not_started' | 'in_progress' | 'completed';
  priority: 'urgent' | 'important' | 'medium' | 'low';
  description?: string;
  assigner: string;
  assignees: string[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}