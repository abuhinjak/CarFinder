import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { carsStore } from '../stores/CarsStore';

const Form = observer(({ open, model }) => {
    const [modelName, setModelName] = useState(model.name);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: modelName
        }
        carsStore.editModelData(data, model.makeId, model.id);
        open();
    };

    return (
        <div className={open ? 'show' : 'hide'}>
            Edit Modal
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" value={modelName} onChange={(e) => setModelName(e.target.value)} />
                <button type="submit">Edit</button>
            </form>
            <button>Save</button>
            <button onClick={open}>Close</button>
        </div>
    );
});

export default Form;
