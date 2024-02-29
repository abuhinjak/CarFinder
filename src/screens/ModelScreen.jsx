import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate, Link } from "react-router-dom";
import { carsStore } from "../stores/CarsStore";

import FormContainer from "../components/FormContainer";
import NewModelForm from "../components/NewModelForm";

const ModelScreen = observer(() => {
    const modelId = useParams().id;
    const model = carsStore.modelsData.models.find((model) => model.id === modelId);
    const [openForm, setOpenForm] = useState(false);
    const navigate = useNavigate();

    const handleOpenForm = () => {
        setOpenForm((prevState) => !prevState);
    }

    const handleDelete = () => {
        if (!window.confirm(`Are you sure you want to delete ${model.name}?`)) return;
        carsStore.deleteModel(model.makeId, modelId);
        navigate(-1);
    }
    

    return (
        <>
            <main className="container">
                <div className="make-header">
                    <Link to="#" className="btn secondary-btn" onClick={() => navigate(-1)}>
                        Go Back
                    </Link>
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
                            <button onClick={handleDelete} className="btn delete-btn">Delete {model.name}</button>
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

export default ModelScreen;
