import React from 'react';

const onDragOver = (e) => {
  e.preventDefault();
}

export const findDraggableElement = (element) => {
  if (element.tagName === 'body') {
    return undefined;
  }

  if (element.getAttribute('draggable')) {
    return element;
  }

  return findDraggableElement(element.parentElement);
}

const foo = (a, b) => a + b;

const onDropRaw = (onDrop) => (event) => {
  event.preventDefault();
  event.target.style.cursor = 'grab';
  let elementRaw = event.target;
  let element = findDraggableElement(elementRaw);
  console.log({ element, elementRaw });
  if (element) {
    onDrop(element);
  }
}

const onDragStartRaw = (onDragStart) => (event) => {
  event.target.style.cursor = 'grabbing';
  onDragStart(event);
}

const DragableRow = ({ key, id, onDragStart, onDrop, children }) => {
  return (
    <tr id={id} key={key} draggable="true" onDragStart={onDragStartRaw(onDragStart)} onDragOver={onDragOver} onDrop={onDropRaw(onDrop)}>
      { children }
    </tr>
  );
};

export default DragableRow;
