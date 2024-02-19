import { observer } from "mobx-react-lite";
import { useParams, Link } from "react-router-dom";
import { carsStore } from "../stores/CarsStore";
import { useEffect, useState } from "react";

import Loader from "../components/Loader";
import ModelCard from "../components/ModelCard";
// import EditMakeForm from "../components/EditMakeForm";
import NewModelForm from "../components/NewModelForm";
import MainContainerButtons from "../components/MainContainerButtons";
import FormContainer from "../components/FormContainer";


const Make = observer(() => {
    const makeID = useParams().id;
    const make = carsStore.carsData.makes.find((make) => make.id === makeID);
    // const [editModal, setEditModal] = useState(false);
    // const [createModal, setCreateModal] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const order = carsStore.order;

    useEffect(() => {
        carsStore.fetchModels(makeID);
    }, [makeID, order]);

    const handleOpenForm = () => {
        setOpenForm((prevState) => !prevState);
      }

    // const editModalTrigger = () => {
    //     setEditModal((prevState) => !prevState);
    // }

    // const createModalTrigger = () => {
    //     setCreateModal((prevState) => !prevState);
    // }

    return (
        <>
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
                            <button className="btn secondary-btn" onClick={handleOpenForm}>Edit {make.name}</button>
                            <button className="btn delete-btn">Delete {make.name}</button>
                        </div>
                    </div>
                </div>

                <MainContainerButtons makeID={makeID} onOpenFormChange={carsStore.handleView} view={carsStore.view} onViewChange={carsStore.handleView}>
                    <button className="btn delete-btn" onClick={handleOpenForm}>Add New Model</button>
                </MainContainerButtons>

                {
                    carsStore.status === 'loading' ? <Loader /> : (
                        <div className="cards-container">
                            {
                                carsStore.carsData.makes.lenght === 0 && <h3>No models found. Add new one.</h3>
                            }
                                <div className={`cards-${carsStore.view}`}>
                                    {Array.isArray(carsStore.modelsData.models) ? carsStore.modelsData.models.map((model) => (
                                            <ModelCard key={model.id} model={model} makeId={makeID} view={carsStore.view} />
                                        )) : (
                                            <div>{carsStore.modelsData.models}</div>
                                        )}
                                        {/* {editModal && <EditMakeForm open={editModalTrigger} make={make} id={makeID} />}
                                        {createModal && <NewModelForm open={createModal} makeID={makeID} close={createModalTrigger} />} */}

                                </div>

                        </div>
                    )
                }
            </main>
            {openForm && (
                <FormContainer open={openForm}>
                    <NewModelForm  onOpenFormChange={handleOpenForm} />
                </FormContainer>
            )}
        </>
    );
});

export default Make;
