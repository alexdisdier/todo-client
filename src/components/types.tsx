export enum IconEnums {
  Circle = 'circle',
  CircleCheck = 'circleCheck',
  Trash = 'trash',
  SwipingTrash = 'swipingTrash'
}

export interface TaskDefinition {
  key: string;
  content: string;
  date: Date;
  isDone: boolean;
}

export type TasksDefinition = TaskDefinition[];
