import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { carsStore } from "../stores/CarsStore";
import Form from "../components/Form";

const Model = observer(() => {
    const modelID = useParams().id;
    const model = carsStore.modelsData.models.find((model) => model.id === modelID);
    const [showModal, setShowModal] = useState(false);

    const modalTrigger = () => {
        setShowModal((prevState) => !prevState);
    }

    return (
        <div>
            {model.name}
            <button onClick={() => modalTrigger()}>Edit</button>
            <Form model={model} showModal={showModal} modalTrigger={modalTrigger}/>
        </div>
    );
});

export default Model;
