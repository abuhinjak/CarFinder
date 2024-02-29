import { observer } from 'mobx-react-lite'
import { carsStore } from '../stores/CarsStore'
import { useState } from 'react';

const NewModelForm = observer(({ onOpenFormChange, model, makeId }) => {
    const [formData, setFormData] = useState({
        name: model ? model.name : '',
        desc: model ? model.desc : '',
        image: model ? model.image : ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: formData.name,
            desc: formData.desc,
            image: formData.image === '' ? 'https://source.unsplash.com/random/300×300?car' : formData.image
        }
        if(!data.name || !data.desc ) return alert('Please enter name and description!');
        if(model?.id) {
            carsStore.editModelData(data, model.makeId, model.id);
            console.log(data, model.makeId, model.id);
        } else {
            carsStore.createNewModel(data, makeId);
        }
        
        setFormData({
            name: '',
            desc: '',
            image: ''
        })
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
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="form-control">
                    <label htmlFor="name">Image: </label>
                    <input type="text" name="image" id="image" value={formData.image} onChange={handleInputChange} />
                </div>
                <div className="form-control">
                    <label htmlFor="desc">Description: </label>
                    <textarea name="desc" id="desc" value={formData.desc} onChange={handleInputChange}></textarea>
                </div>
                <div className="buttons-wrapper">
                    <button className='btn delete-btn' type="submit">
                        {model?.id ? 'Save' : 'Add'}
                    </button>
                    <button className='btn secondary-btn' type="button" onClick={onOpenFormChange}>Close</button>
                </div>
            </form>
        </div>
    )
})

export default NewModelForm
