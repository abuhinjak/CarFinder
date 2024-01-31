import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { carsStore } from "../stores/CarsStore";

const Model = observer(() => {
    const modelID = useParams().id;
    const model = carsStore.modelsData.models.find((model) => model.id === modelID);


    return (
        <div>
            {model.name}
        </div>
    );
});

export default Model;
