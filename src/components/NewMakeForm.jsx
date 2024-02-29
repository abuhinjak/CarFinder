import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { carsStore } from '../stores/CarsStore'

const NewMakeForm = observer(({ onOpenFormChange, make, makeId }) => {
    const navigate = useNavigate();

    const [name, setName] = useState(make ? make.name : '');
    const [desc, setDesc] = useState(make ? make.desc : '');
    const [logo, setLogo] = useState(make ? make.logo : '');
    const [image, setImage] = useState(make ? make.image : '');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'desc') {
            setDesc(value);
        } else if (name === 'logo') {
            setLogo(value);
        } else if (name === 'image') {
            setImage(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            desc: desc,
            image: image === '' ? 'https://source.unsplash.com/random/300×300?car' : image,
            logo: logo
        }
        if(!data.name || !data.desc ) return alert('Please enter name and description!');
        if(makeId) {
            carsStore.editMakeData(data, makeId);
        } else {
            carsStore.createNewMake(data);
        }
        navigate('/')
        setName('');
        setDesc('');
        setLogo('');
        setImage('');
        onOpenFormChange();
    }


    return (
        <div className='form-wrapper'>
            <form onSubmit={handleSubmit}>
                {
                    makeId ? (
                        <h2>Edit {make.name}</h2>
                    ) : (
                        <h2>Add New Make</h2>
                    )
                }
                <div className="form-control">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="name" value={name} onChange={handleInputChange} />
                </div>
                <div className="form-control">
                    <label htmlFor="logo">Logo: </label>
                    <input type="text" name="logo" id="logo" value={logo} onChange={handleInputChange} />
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

export default NewMakeForm
