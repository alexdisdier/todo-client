export interface TaskDefinition {
  key: string;
  title: string;
  isDone: boolean;
  date: Date;
  pos: number;
}

export type TasksDefinition = TaskDefinition[]