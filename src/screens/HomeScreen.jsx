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
      <div className="navigation">
        <button onClick={() => carsStore.firstPage()}>First Page</button>
        {carsStore.carsData.makes.length === carsStore.carsData.limit && <button onClick={() => carsStore.nextPage()}>Next Page</button>}
      </div>
    </>
  );  
});

export default HomeScreen;
