import { observer } from 'mobx-react-lite'
import { carsStore } from '../stores/CarsStore'
import { useState } from 'react';

const NewModelForm = observer(({ onOpenFormChange, model, makeId }) => {

    const [name, setName] = useState(model ? model.name : '');
    const [desc, setDesc] = useState(model ? model.desc : '');
    const [image, setImage] = useState(model ? model.image : '');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'desc') {
            setDesc(value);
        } else if (name === 'image') {
            setImage(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            desc: desc,
            image: image === '' ? 'https://source.unsplash.com/random/300×300?car' : image
        }
        carsStore.createNewModel(data, model.makeId);
        console.log(data, model.makeId);
        setName('');
        setDesc('');
        setImage('');
        onOpenFormChange();
    }


    return (
        <div className='form-wrapper'>
            <form onSubmit={handleSubmit}>
                {
                    makeId ? (
                        <h2>Add New Model</h2>
                        ) : (
                        <h2>Edit {model.name}</h2>
                    )
                }
                <div className="form-control">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="name" value={name} onChange={handleInputChange} />
                </div>
                <div className="form-control">
                    <label htmlFor="name">Image: </label>
                    <input type="text" name="image" id="image" value={image} onChange={handleInputChange} />
                </div>
                <div className="form-control">
                    <label htmlFor="desc">Description: </label>
                    <textarea name="desc" id="desc" value={desc} onChange={handleInputChange}></textarea>
                </div>
                <div className="buttons-wrapper">
                    <button className='btn delete-btn' type="submit">
                        {makeId ? 'Save' : 'Add'}
                    </button>
                    <button className='btn secondary-btn' type="button" onClick={onOpenFormChange}>Close</button>
                </div>
            </form>
        </div>
    )
})

export default NewModelForm
