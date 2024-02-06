import { observer } from "mobx-react-lite";
import { useParams, Link } from "react-router-dom";
import { carsStore } from "../stores/CarsStore";
import { useEffect } from "react";

const Make = observer(() => {
    const makeID = useParams().id;
    const make = carsStore.carsData.makes.find((make) => make.id === makeID);

    useEffect(() => {
        carsStore.fetchModels(makeID);
    }, [makeID]);

    return (
        <div>
            <Link to="/" className='btn btn-light my-3'>Go Back</Link>
            {make && <h1>{make.name}</h1>}
            {make && Array.isArray(carsStore.modelsData.models) && carsStore.modelsData.models.map((model) => (
                <div key={model.id}>
                    {model.name}
                    <Link to={`/model/${model.id}`}><button>GO</button></Link>
                </div>
            ))}
        </div>
    );
});

export default Make;
