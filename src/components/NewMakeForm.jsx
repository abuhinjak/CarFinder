import { observer } from 'mobx-react-lite'
import { carsStore } from '../stores/CarsStore'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

const NewMakeForm = observer(({ onOpenFormChange }) => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [logo, setLogo] = useState('');
    const [image, setImage] = useState('');

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
            logo: logo === '' ? 'https://source.unsplash.com/random/100×100?brand' : logo 
        }
        carsStore.createNewMake(data);
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
                <h3>Create New Make</h3>
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
                    <button disabled={true} className='btn delete-btn' type="submit">Create</button>
                    <button className='btn secondary-btn' type="button" onClick={onOpenFormChange}>Close</button>
                </div>
            </form>
        </div>
    )
})

export default NewMakeForm
