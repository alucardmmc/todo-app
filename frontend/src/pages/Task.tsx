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
    try {
      const request = await axios.get('/');
      setTasks(request.data);
      return request;
    } catch (err) {
      console.log(err)
      alert(err)
    }
  };

  const addTask = async (
    object: {
      title: string;
      description: string;
      completed: boolean;
    },
    id?: number,
  ) => {
    try {
      if (id !== undefined) {
        await axios.put(`/${id}/`, object)
      } else {
        await axios.post('/', object);
      }
      fetchData();
    } catch(err) {
      console.log(err)
      alert(err)
    }
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
    try {
      await axios.delete(`/${id}/`);
      fetchData();
    } catch(err) {
      console.log(err)
      alert(err)
    }
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
