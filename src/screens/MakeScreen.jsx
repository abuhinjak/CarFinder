import { observer } from "mobx-react-lite";
import { useParams, Link, useNavigate } from "react-router-dom";
import { carsStore } from "../stores/CarsStore";
import { useEffect, useState } from "react";

import Loader from "../components/Loader";
import ModelCard from "../components/ModelCard";
import NewModelForm from "../components/NewModelForm";
import NewMakeForm from "../components/NewMakeForm";
import MainContainerButtons from "../components/MainContainerButtons";
import FormContainer from "../components/FormContainer";


const MakeScreen = observer(() => {
    const navigate = useNavigate();
    const makeId = useParams().id;
    const make = carsStore.carsData.makes.find((make) => make.id === makeId);
    const [openForm, setOpenForm] = useState(false);
    const [formType, setFormType] = useState('');
    const order = carsStore.order;

    useEffect(() => {
        carsStore.fetchModels(makeId);
    }, [makeId, order]);

    const handleOpenForm = (type) => {
        setOpenForm((prevState) => !prevState);
        setFormType(type)
    }

    const handleDelete = () => {
        if (!window.confirm(`Are you sure you want to delete ${make.name}?`)) return;
        carsStore.deleteMake(makeId);
        navigate('/');
    }

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
                            <button className="btn secondary-btn" onClick={() => handleOpenForm('edit')}>Edit {make.name}</button>
                            <button className="btn delete-btn" onClick={handleDelete}>Delete {make.name}</button>
                        </div>
                    </div>
                </div>

                <MainContainerButtons makeID={makeId} onOpenFormChange={carsStore.handleView} view={carsStore.view} onViewChange={carsStore.handleView}>
                    <button className="btn delete-btn" onClick={() => handleOpenForm('new')}>Add New Model</button>
                </MainContainerButtons>

                {
                    carsStore.status === 'loading' ? <Loader /> : (
                        <div className="cards-container">
                            {
                                carsStore.carsData.makes.lenght === 0 && <h3>No models found. Add new one.</h3>
                            }
                                <div className={`cards-${carsStore.view}`}>
                                    {Array.isArray(carsStore.modelsData.models) ? carsStore.modelsData.models.map((model) => (
                                            <ModelCard key={model.id} model={model} makeId={makeId} view={carsStore.view} />
                                        )) : (
                                            <div>{carsStore.modelsData.models}</div>
                                        )}
                                </div>

                        </div>
                    )
                }
            </main>
            {openForm && (
                <FormContainer open={openForm}>
                    {
                        formType !== 'edit' ? (
                            <NewModelForm  onOpenFormChange={handleOpenForm} makeId={makeId} /> 
                        ) : (
                            <NewMakeForm  onOpenFormChange={handleOpenForm} make={make} makeId={makeId} />
                        )
                    }
                </FormContainer>
            )}
        </>
    );
});

export default MakeScreen;
