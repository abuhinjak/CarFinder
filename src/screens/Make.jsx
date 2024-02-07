import { observer } from "mobx-react-lite";
import { useParams, Link } from "react-router-dom";
import { carsStore } from "../stores/CarsStore";
import { useEffect, useState } from "react";

import FormCreate from "../components/FormCreate";
import EditMakeForm from "../components/EditMakeForm";


const Make = observer(() => {
    const makeID = useParams().id;
    const make = carsStore.carsData.makes.find((make) => make.id === makeID);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const createModalTrigger = () => {
        setCreateModal((prevState) => !prevState);
    }

    const editModalTrigger = () => {
        setEditModal((prevState) => !prevState);
    }


    useEffect(() => {
        carsStore.fetchModels(makeID);
    }, [makeID]);

    return (
        <div>
            <button onClick={createModalTrigger}>New Model</button>
            <Link to="/" className='btn btn-light my-3'>Go Back</Link>
            <button onClick={editModalTrigger}>Edit Make</button>
            {make && <h1>{make.name}</h1>}
            {make && Array.isArray(carsStore.modelsData.models) && carsStore.modelsData.models.map((model) => (
                <div key={model.id}>
                    {model.name}
                    <Link to={`/model/${model.id}`}><button>GO</button></Link>
                </div>
            ))}
            {createModal && <FormCreate open={createModal} />}
            {editModal && <EditMakeForm open={editModalTrigger} make={make} id={makeID} />}
        </div>
    );
});

export default Make;
