import React, { useEffect, useState } from 'react';

import TabList from '../components/tasks/TabList';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

import axios from '../utilities/axios';
import { ITask } from '../utilities/taskInterface';
import './Task.css';

const classes = {
  tasks: 'tasks',
  tasksTitle: 'tasks__title',
  tasksSection: 'tasks__section',
  tasksSectionOptions: 'tasks__section-options',
  tasksButton: 'tasks__button',
};

const Task = () => {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [editTask, setEditTask] = useState<Partial<ITask>>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const request = await axios.get('/');
    setTasks(request.data);
    return request;
  };

  const addTask = async (
    object: {
      title: string;
      description: string;
      completed: boolean;
    },
    id?: number,
  ) => {
    let request;

    if (id !== undefined) {
      request = await axios.put(`/${id}/`, object)
    } else {
      request = await axios.post('/', object);
    }

    console.log(`ID IS: ${id}`)
    console.log(request)
    fetchData();
    setEditTask({});
    setOpenModal(false);
  };

  const handleAddTask = () => {
    setEditTask({});
    setOpenModal(true);
  };

  const handleEditTask = async (id: number) => {
    let index = tasks.findIndex((item) => item.id === id);
    setEditTask(tasks[index]);
    setOpenModal(true);
  };

  const handleDeleteTask = async (id: number) => {
    const request = await axios.delete(`/${id}/`);
    console.log(request)
    fetchData();
  };

  return (
    <div className={classes.tasks}>
      <h1 className={classes.tasksTitle}>Task Manager</h1>
      <div className={classes.tasksSection}>
        <div className={classes.tasksSectionOptions}>
          <div className={classes.tasksButton}>
            <Button
              title='Add Task'
              color='green'
              handleClick={handleAddTask}
            />
          </div>
          <TabList
            displayCompleted={viewCompleted}
            displayHandler={setViewCompleted}
          />
          <TaskList
            displayCompleted={viewCompleted}
            tasks={tasks}
            handleEdit={handleEditTask}
            handleDelete={handleDeleteTask}
          />
        </div>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <TaskForm addTask={addTask} task={editTask} />
        </Modal>
      </div>
    </div>
  );
};

export default Task;
