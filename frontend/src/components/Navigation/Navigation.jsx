import React  from 'react';
import {MainView} from './MainView';
import {Header} from './Header';

export const Navigation = () => {

  return (
    <div style={{display: 'flex'}}>
      <Header />
      <MainView />
    </div>
  )
}