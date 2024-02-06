import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
import { carsStore } from "../stores/CarsStore";
import Form from "../components/Form";
import FormCreate from "../components/FormCreate";

const Model = observer(() => {
    const modelID = useParams().id;
    const model = carsStore.modelsData.models.find((model) => model.id === modelID);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const navigate = useNavigate();

    const editModalTrigger = () => {
        if (createModal) {
            setCreateModal(false);
        }
        setEditModal((prevState) => !prevState);
    }

    const createModalTrigger = () => {
        if (editModal) {
            setEditModal(false);
        }
        setCreateModal((prevState) => !prevState);
    }

    return (
        <div>
            <button onClick={createModalTrigger}>New</button>
            <button onClick={() => navigate(-1)}>Go Back</button>
            {model.name}
            <button onClick={editModalTrigger}>Edit</button>
            {/* <Form model={model} /> */}
            {createModal && <FormCreate model={model} open={createModal} />}
            {editModal && <Form model={model} open={editModal} close={setEditModal} />}

            {/* <FormCreate open={carsStore.modals.createModal} /> */}
        </div>
    );
});

export default Model;
