import { observer } from "mobx-react-lite";
import { useParams, Link } from "react-router-dom";
import { carsStore } from "../stores/CarsStore";
import { useEffect, useState } from "react";

import EditMakeForm from "../components/EditMakeForm";
import NewModelForm from "../components/NewModelForm";


const Make = observer(() => {
    const makeID = useParams().id;
    const make = carsStore.carsData.makes.find((make) => make.id === makeID);
    const [editModal, setEditModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);

    useEffect(() => {
        carsStore.fetchModels(makeID);
    }, [makeID]);


    const editModalTrigger = () => {
        setEditModal((prevState) => !prevState);
    }

    const createModalTrigger = () => {
        setCreateModal((prevState) => !prevState);
    }

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
                    <button onClick={() => carsStore.deleteModel(makeID, model.id)}>Delete</button>
                </div>
            ))}
            {editModal && <EditMakeForm open={editModalTrigger} make={make} id={makeID} />}
            {createModal && <NewModelForm open={createModal} makeID={makeID} close={createModalTrigger} />}

        </div>
    );
});

export default Make;
