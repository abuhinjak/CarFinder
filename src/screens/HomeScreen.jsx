import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { carsStore } from '../stores/CarsStore';

import NewMakeForm from "../components/NewMakeForm";


const HomeScreen = observer(() => {
  const [createModal, setCreateModal] = useState(false);

  useEffect(() => {
    carsStore.fetchCars();
  }, []);

  const createModalTrigger = () => {
    setCreateModal((prevState) => !prevState);
}


  return (
    <>
     <button onClick={createModalTrigger}>New Make</button>

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

      {createModal && <NewMakeForm open={createModal} close={createModalTrigger} />}
    </>
  );  
});

export default HomeScreen;
