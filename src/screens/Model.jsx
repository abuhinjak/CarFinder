import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
import { carsStore } from "../stores/CarsStore";

import FormContainer from "../components/FormContainer";
import NewModelForm from "../components/NewModelForm";

const Model = observer(() => {
    const modelId = useParams().id;
    const model = carsStore.modelsData.models.find((model) => model.id === modelId);
    const [openForm, setOpenForm] = useState(false);
    const navigate = useNavigate();

    const handleOpenForm = () => {
        setOpenForm((prevState) => !prevState);
    }
    

    return (
        <>
            <main className="container">
                <div className="make-header">
                    <button className="btn secondary-btn" onClick={() => navigate(-1)}>Go Back</button>
                    <h1 className="title">{model.name}</h1>
                </div>

                <div className="model-info">
                    <div className="make-logo">
                        <img src={model.image} alt={model.name} />
                    </div>
                    <div className="make-desc">
                        <p>{model.desc}</p>
                        <div className="buttons-wrapper">
                            <button className="btn secondary-btn" onClick={handleOpenForm}>Edit {model.name}</button>
                            <button className="btn delete-btn">Delete {model.name}</button>
                        </div>
                    </div>
                </div>
            </main>
            {openForm && (
                <FormContainer open={openForm}>
                    <NewModelForm  onOpenFormChange={handleOpenForm} modelId={modelId}  model={model} />
                </FormContainer>
            )}
        </>
    );
});

export default Model;
