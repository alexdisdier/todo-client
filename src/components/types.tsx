export enum IconEnums {
  Circle = 'circle',
  CircleCheck = 'circleCheck',
  Trash = 'trash'
}

export interface TaskDefinition {
  key: string;
  title: string;
  date: Date;
  isDone: boolean;
}

export type TasksDefinition = TaskDefinition[];
