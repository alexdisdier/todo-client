export interface TaskDefinition {
  key: string;
  content: string;
  date: Date;
  isDone: boolean;
}

export type TasksDefinition = TaskDefinition[];
