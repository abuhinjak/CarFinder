import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { carsStore } from '../stores/CarsStore';

const EditMakeForm = observer(({ open, make, id }) => {
    const [makeName, setMakeName] = useState(make.name);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: makeName
        }
        carsStore.editMakeData(data, id);
        open();
    };

    return (
        <div className={open ? 'show' : 'hide'}>
            Edit Modal
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" value={makeName} onChange={(e) => setMakeName(e.target.value)} />
                <button type="submit">Edit</button>
            </form>
            <button>Save</button>
            <button onClick={open}>Close</button>
        </div>
    );
});

export default EditMakeForm;
