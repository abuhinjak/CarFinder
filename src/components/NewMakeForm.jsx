import { observer } from 'mobx-react-lite'
import { carsStore } from '../stores/CarsStore'
import { useNavigate } from 'react-router-dom'

const NewMakeForm = observer(({ open, close }) => {
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
        <div className={open ? 'show' : 'hide'}>
            <form onSubmit={handleSubmit}>
                <h1>New Make</h1>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" />
                <label htmlFor="desc">Desc</label>
                <textarea name="desc" id="desc"></textarea>
                <button type="submit">Create</button>
                <button type="button" onClick={close}>Close</button>
            </form>
        </div>
    )
})

export default NewMakeForm
