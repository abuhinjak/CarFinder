import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate, Link } from "react-router-dom";
import { carsStore } from "../stores/CarsStore";
import Form from "../components/Form";

const Model = observer(() => {
    const modelID = useParams().id;
    const model = carsStore.modelsData.models.find((model) => model.id === modelID);
    const [editModal, setEditModal] = useState(false);


    const navigate = useNavigate();

    const editModalTrigger = () => {
        setEditModal((prevState) => !prevState);
    }
    

    return (
        // <div>
        //     <button onClick={() => navigate(-1)}>Go Back</button>
        //     {model.name}
        //     <button onClick={editModalTrigger}>Edit</button>
        //     {editModal && <Form model={model} open={editModalTrigger} />}
        // </div>
        <>
            <main className="container">
                <div className="make-header">
                    <Link to="/" className="btn secondary-btn">Go Back</Link>
                    <h1 className="title">{model.name}</h1>
                </div>

                <div className="model-info">
                    <div className="make-logo">
                        <img src={model.image} alt={model.name} />
                    </div>
                    <div className="make-desc">
                        <p>{model.desc}</p>
                        <div className="buttons-wrapper">
                            <button className="btn secondary-btn" onClick={editModalTrigger}>Edit {model.name}</button>
                            <button className="btn delete-btn">Delete {model.name}</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
});

export default Model;
