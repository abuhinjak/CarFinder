import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { carsStore } from './stores/CarsStore';

import './App.css';

const App = observer(() => {

  useEffect(() => {
    carsStore.fetchCars(); 
  }, []);

  return (
    <>
      <h1>Mobx practice</h1>
      <p>{carsStore.total}</p>
      <ul>
        {carsStore.carsData.makes.map((make) => ( 
          <li key={make.id}>
            {make.name} <button onClick={() => carsStore.deleteMake(make.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );  
});

export default App;
