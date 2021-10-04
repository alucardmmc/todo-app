import React from 'react';

import './TabList.css';

const classes = {
  active: 'active',
  tabList: 'tab-list',
};

interface Props {
  displayCompleted: boolean;
  displayHandler: any;
}

const TabList: React.FC<Props> = ({ displayCompleted, displayHandler }) => {
  return (
    <div className={classes.tabList}>
      <span
        onClick={() => displayHandler(true)}
        className={`${displayCompleted ? classes.active : ''}`}
      >
        Completed
      </span>
      <span
        onClick={() => displayHandler(false)}
        className={`${!displayCompleted ? classes.active : ''}`}
      >
        Incompleted
      </span>
    </div>
  );
};

export default TabList;
