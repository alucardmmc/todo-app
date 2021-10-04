import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './App.css';

const Task = lazy(() => import('./pages/Task'));

function App() {
  return (
    <Router>
      <div className="app">
        <main>
          <Switch>
            <Suspense fallback={<div>Loading Page...</div>}>
              <Route path="/tasks">
                <Task />
              </Route>
              <Route path="/">
                <Redirect to="/tasks" />
              </Route>
            </Suspense>
          </Switch>
        </main>
        <footer className="footer">
          Copyright 2021 &copy; All Rights Reserved
        </footer>
      </div>
    </Router>
  );
}

export default App;
