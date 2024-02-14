import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { carsStore } from '../stores/CarsStore';

import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import NewMakeForm from '../components/NewMakeForm';
import MakeCard from '../components/MakeCard';
import ShowCase from '../components/ShowCase';
import MainContainerButtons from '../components/MainContainerButtons';


const HomeScreen = observer(() => {
    const [openForm, setOpenForm] = useState(true);
    const [view, setView] = useState('grid');

    useEffect(() => {
      carsStore.fetchCars();
    }, []);

    const handleOpenForm = () => {
      setOpenForm((prevState) => !prevState);
    }

    const handleView = (view) => {
      setView(view)
    }

    return (
      <>
        <main className='container'>
            <ShowCase />
            <MainContainerButtons onOpenFormChange={handleOpenForm} view={view} onViewChange={handleView}/>

            {
              carsStore.status ==="loading" ? <Loader /> : (
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
                  {
                    carsStore.status === "success" && (
                      <div className="pagination">
                        {
                          carsStore.carsData.page !== 1 && <button className="btn light-btn" onClick={() => carsStore.firstPage()}>Prev</button>
                        }

                        {
                          carsStore.carsData.makes.length === carsStore.carsData.limit && 
                          <button className="btn secondary-btn" onClick={() => carsStore.nextPage()}>Next</button>
                        }
                      </div>
                    ) 
                  }
                </div>
              )
            }            
        </main>
        {openForm && (
          <FormContainer open={openForm}>
            <NewMakeForm  onOpenFormChange={handleOpenForm} />
          </FormContainer>
        )}
      </>
    );  
});

export default HomeScreen;