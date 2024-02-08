import { observer } from 'mobx-react-lite'
import { carsStore } from '../stores/CarsStore'

const NewMakeForm = observer(({ open, close, makeID }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            // desc: e.target.desc.value
        }
        carsStore.createNewModel(data, makeID);
        close();
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
            </form>
        </div>
    )
})

export default NewMakeForm
