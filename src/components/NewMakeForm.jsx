import { observer } from 'mobx-react-lite'
import { carsStore } from '../stores/CarsStore'
import { useNavigate } from 'react-router-dom'

const NewMakeForm = observer(({ onOpenFormChange }) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            desc: e.target.desc.value,
            image: 'https://source.unsplash.com/random/300×300?car'
        }
        carsStore.createNewMake(data);
        navigate('/')
    }


    return (
        <div className='form-wrapper'>
            <form onSubmit={handleSubmit}>
                <h3>Create New Make</h3>
                <div className="form-control">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="name" />
                </div>
                <div className="form-control">
                    <label htmlFor="desc">Description: </label>
                    <textarea name="desc" id="desc"></textarea>
                </div>
                <div className="buttons-wrapper">
                    <button className='btn delete-btn' type="submit">Create</button>
                    <button className='btn secondary-btn' type="button" onClick={onOpenFormChange}>Close</button>
                </div>
            </form>
        </div>
    )
})

export default NewMakeForm
