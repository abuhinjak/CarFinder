import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { carsStore } from '../stores/CarsStore';

const HomeScreen = observer(() => {

  useEffect(() => {
    carsStore.fetchCars(); 
  }, []);


  return (
    <>
      <ul>
        {carsStore.carsData.makes.map((make) => ( 
          <li key={make.id}>
            {make.name} 
            <button onClick={() => carsStore.deleteMake(make.id)}>
                Delete
            </button>
            <button>
                <Link to={`/makes/${make.id}`}>GO</Link>
            </button>
          </li>
        ))}
      </ul>
    </>
  );  
});

export default HomeScreen;
