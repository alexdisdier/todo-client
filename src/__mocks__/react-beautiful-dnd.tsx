// global mock for react-beautiful-dnd
// note: draggable and droppable takes as unique child a render function

export const DragDropContext = 'DragDropContext';

export const Droppable = ({ children, ...rest }: any) => (
  <div id="Droppable" {...rest}>
    {children(
      {
        innerRef: { current: 'droppableRef' },
        droppableProps: { otherProps: 'droppableProps' },
        placeholder: 'droppabePlaceholder'
      },
      {}
    )}
  </div>
);

export const Draggable = ({ children, ...rest }: any) => (
  <div id="Draggable" {...rest}>
    {children(
      {
        innerRef: { current: 'draggableRef' },
        draggableProps: { otherProps: 'draggableProps' },
        dragHandleProps: { otherProps: 'dragHandleProps' }
      },
      {}
    )}
  </div>
);
