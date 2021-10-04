import React from 'react';
import Button from '../ui/Button';

import './TaskList.css';

const classes = {
  listGroup: 'list-group',
  listGroupItem: 'list-group-item',
  todoTitle: 'todo-title',
  todoButtons: 'todo-buttons',
};

interface Props {
  displayCompleted: boolean;
  tasks: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  }[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

const TaskList: React.FC<Props> = ({ displayCompleted, tasks, handleEdit, handleDelete }) => {
  const newItems = tasks.filter((item) => item.completed === displayCompleted);

  console.log(newItems);

  return (
    <ul className={classes.listGroup}>
      {newItems.map((item) => (
        <li key={item.id} className={classes.listGroupItem}>
          <span
            className={`${classes.todoTitle} ${
              displayCompleted ? 'completed-todo' : ''
            }`}
            title={item.title}
          >
            {item.title}
          </span>
          <span className={`${classes.todoButtons}`}>
            <Button title='Edit' color='yellow' handleClick={() => (handleEdit(item.id))} />
            <Button title='Delete' color='red' handleClick={() => (handleDelete(item.id))} />
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
