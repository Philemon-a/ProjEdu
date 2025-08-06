export interface User {
    id: string;
    email: string;
    full_name: string;
    created_at: string;
  }
  
export interface Task {
    id: string;
    user_id: string;
    title: string;
    description?: string;
    due_date?: string;
    status: 'pending' | 'completed';
    priority: 'low' | 'medium' | 'high';
    course?: string;
    project_id?: string;
    created_at: string;
    updated_at: string;
}
  
export interface Project {
    id: string;
    user_id: string;
    title: string;
    description?: string;
    created_at: string;
}
  
export interface CalendarEvent {
    id: string;
    user_id: string;
    title: string;
    start_time: string;
    end_time: string;
    type: 'task' | 'event' | 'reminder';
    created_at: string;
}
  
export interface AIQuery {
    id: string;
    user_id: string;
    prompt: string;
    response: string;
    created_at: string;
  }
  