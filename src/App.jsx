import { Outlet } from 'react-router-dom';

import './App.css';

const App = () => {
  return (
    <>
      <h1>Mobx practice</h1>
      <Outlet />
    </>
  )
};

export default App;
