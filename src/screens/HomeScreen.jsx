import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { carsStore } from '../stores/CarsStore';

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



              <ul style={{display: "flex", flexWrap: "wrap", gap:"30px"}}>
                {carsStore.carsData.makes.map((make) => ( 
                  <li key={make.id}>
                    <h2>{make.name}</h2>
                    <div>
                      <img src={make.image} alt={make.name} width={300} height={200} style={{objectFit: "cover"}}/>
                    </div> 
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

        </main>
    );  
});

export default HomeScreen;