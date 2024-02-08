import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
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
        <div>
            <button onClick={() => navigate(-1)}>Go Back</button>
            {model.name}
            <button onClick={editModalTrigger}>Edit</button>
            {editModal && <Form model={model} open={editModalTrigger} />}
        </div>


    );
});

export default Model;
