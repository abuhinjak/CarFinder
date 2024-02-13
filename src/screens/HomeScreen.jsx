import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { carsStore } from '../stores/CarsStore';

import MakeCard from '../components/MakeCard';
import NewMakeForm from "../components/NewMakeForm";
import ShowCase from '../components/ShowCase';
import MainContainerButtons from '../components/MainContainerButtons';


const HomeScreen = observer(() => {
    const [createModal, setCreateModal] = useState(false);
    const [view, setView] = useState('grid');

    useEffect(() => {
      carsStore.fetchCars();
    }, []);

    const createModalTrigger = () => {
      setCreateModal((prevState) => !prevState);
    }

    const handleView = (view) => {
      setView(view)
    }

    return (
        <main className='container'>
            <ShowCase />
            <MainContainerButtons createModalTrigger={createModalTrigger} view={view} onViewChange={handleView}/>

            <div className="cards-container">
              {
                carsStore.carsData.makes.length === 0 && <h3>No cars found</h3>
              }
                <div className={`cards-${view}`}>
                  {
                    carsStore.carsData.makes.map((make) => 
                      <MakeCard key={make.id} make={make} view={view} />)
                  }
                </div>
                <div className="pagination">
                  {
                    carsStore.carsData.page !== 1 && <button className="btn light-btn" onClick={() => carsStore.firstPage()}>Prev</button>
                  }

                  {
                    carsStore.carsData.makes.length === carsStore.carsData.limit && 
                    <button className="btn secondary-btn" onClick={() => carsStore.nextPage()}>Next</button>
                  }
                </div>
            </div>
            

              {createModal && <NewMakeForm open={createModal} close={createModalTrigger} />}

        </main>
    );  
});

export default HomeScreen;