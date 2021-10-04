import React from 'react';
import { Field, Form, Formik } from 'formik';

import Button from '../ui/Button';
import './TaskForm.css';
import { ITask } from '../../utilities/taskInterface';

const classes = {
  form: 'task-form',
  formTitle: 'form-title',
  formGroup: 'task-form__group',
};

interface Props {
  task?: Partial<ITask>;
  addTask: (
    object: {
      title: string;
      description: string;
      completed: boolean;
    },
    id?: number,
  ) => void;
}

// Testing Out Formik

// Initial Values -> Object that holds the values of the form

// validate -> Function that will validate the form
// First argument is the object with values
// We can return an object with the errors

// onSubmit -> Function that will run when the form is submitted
// First argument is the object with values
// We can also destructure to get more functions
// resetForm -> resets the form
// isSubmitting -> state to pass to a button when doing an async call

// We can access the values with -> 'values'
// We can know if the user touched the input with -> 'touched'
// We can access the change function with -> 'handleChange'
// We can access the blur function with -> 'handleBlur'
// We can access the errors with -> 'errors'
// We can access the submit function with -> 'handleSubmit'

const TaskForm: React.FC<Props> = ({ task={}, addTask }) => {

  const getTitle = (obj: any) => {
    if (Object.keys(obj).length === 0) {
      return 'New Task'
    }
    return 'Edit Task'
  }

  return (
    <React.Fragment>
      <h1 className={classes.formTitle}>{getTitle(task)}</h1>
      <Formik
        initialValues={{
          title: task?.title || '',
          description: task?.description || '',
          completed: task?.completed || false,
        }}
        enableReinitialize
        validate={(values) => {
          let errors: any = {};

          if (!values.title) {
            errors.title = 'Please enter a title';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.title)) {
            errors.title = 'Title can only contain letters and spaces';
          }

          if (!values.description) {
            errors.description = 'Please enter a description';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          // async call here!
          console.log(values);
          console.log(task);
          console.log(task.id)
          addTask(values, task?.id);
          console.log('Sent Form');
          // async call end!
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form className={classes.form}>
            <div className={classes.formGroup}>
              <label htmlFor='title'>Title</label>
              <Field
                id='title'
                name='title'
                type='text'
                placeholder='Your title here!'
              />
              {touched.title && errors.title && <span>{errors.title}</span>}
            </div>

            <div className={classes.formGroup}>
              <label htmlFor='description'>Description</label>
              <Field
                id='description'
                name='description'
                type='text'
                placeholder='Your description here!'
              />
              {touched.description && errors.description && (
                <span>{errors.description}</span>
              )}
            </div>

            <div className={classes.formGroup}>
              <label htmlFor='completed'>
                Task Completed?
                <Field id='completed' name='completed' type='checkbox' />
              </label>
            </div>

            <Button
              type='submit'
              title='Save'
              color='green'
              disabled={isSubmitting}
            />
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default TaskForm;
