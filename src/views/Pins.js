import React from 'react';
import BoardContainer from '../components/BoardContainer/index';
import Auth from '../components/Auth/index';

export default function Pins(props) {
  const loadComponent = () => {
    let component = '';
    if (props.authed) {
      component = <BoardContainer />;
    } else {
      component = <Auth />;
    }
    return component;
  };
  return (
  <div>
    <h1>Pins</h1>
    {loadComponent()}
    </div>
  );
}
