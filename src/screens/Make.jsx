import { observer } from "mobx-react-lite";
import { useParams, Link } from "react-router-dom";
import { carsStore } from "../stores/CarsStore";
import { useEffect, useState } from "react";

import MakeCard from "../components/MakeCard";
import EditMakeForm from "../components/EditMakeForm";
import NewModelForm from "../components/NewModelForm";
import MainContainerButtons from "../components/MainContainerButtons";


const Make = observer(() => {
    const makeID = useParams().id;
    const make = carsStore.carsData.makes.find((make) => make.id === makeID);
    const [editModal, setEditModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const order = carsStore.order;

    useEffect(() => {
        carsStore.fetchModels(makeID);
    }, [makeID, order]);


    const editModalTrigger = () => {
        setEditModal((prevState) => !prevState);
    }

    const createModalTrigger = () => {
        setCreateModal((prevState) => !prevState);
    }

    if(carsStore.status === 'loading') {
        return <div>Loading...</div>
    }

    return (
        <main className="container">

            <div className="make-header">
                <Link to="/" className="btn secondary-btn">Go Back</Link>
                <h1 className="title">{make.name}</h1>
            </div>

            <div className="make-info">
                <div className="make-logo">
                    <img src={make.logo} alt={make.name} />
                </div>
                <div className="make-desc">
                    <p>{make.desc}</p>
                    <div className="buttons-wrapper">
                        <button className="btn secondary-btn" onClick={editModalTrigger}>Edit {make.name}</button>
                        <button className="btn delete-btn">Delete {make.name}</button>
                    </div>
                </div>
            </div>

            <button className="btn delete-btn" onClick={createModalTrigger}>Add New Model</button>

            <MainContainerButtons onOpenFormChange={carsStore.handleView} view={carsStore.view} onViewChange={carsStore.handleView}/>

            {
                carsStore.status === 'loading' ? <Loader /> : (
                    <div className="cards-container">
                        {
                            carsStore.carsData.makes.lenght === 0 && <h3>No models found</h3>
                        }
                            <div className={`cards-${carsStore.view}`}>
                                {Array.isArray(carsStore.modelsData.models) ? carsStore.modelsData.models.map((model) => (
                                        <MakeCard key={model.id} make={model} view={carsStore.view} />
                                    )) : (
                                        <div>{carsStore.modelsData.models}</div>
                                    )}
                                    {editModal && <EditMakeForm open={editModalTrigger} make={make} id={makeID} />}
                                    {createModal && <NewModelForm open={createModal} makeID={makeID} close={createModalTrigger} />}
                            </div>

                    </div>
                )
            }

        </main>
    );
});

export default Make;
