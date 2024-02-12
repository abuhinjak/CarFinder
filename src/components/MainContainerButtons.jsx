import { observer } from "mobx-react-lite"
import { carsStore } from "../stores/CarsStore"
import { FaSortAlphaDown, FaSortAlphaUp, FaList } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";

const MainContainerButtons = observer(({createModalTrigger, view, onViewChange}) => {
    const orderAsc = carsStore.carsData.order === 'asc' ? 'active' : '';
    const orderDesc = carsStore.carsData.order === 'desc' ? 'active' : '';
    const grid = view === 'grid' ? 'active' : '';
    const list = view === 'list' ? 'active' : '';
    
    return (
        <div className="main-container-buttons-wrapper">
            <button className="btn delete-btn" onClick={createModalTrigger}>New Make</button>

            <div className="buttons-wrapper">
                <div className="sorting">
                    <span>Sort by: </span>
                    <div className={`sorting-btn down ${orderAsc}`} onClick={() => carsStore.sortMakes('asc')}>
                        <FaSortAlphaDown />
                    </div>
                    <div className={`sorting-btn up ${orderDesc}`} onClick={() => carsStore.sortMakes('desc')}>
                        <FaSortAlphaUp />
                    </div>
                </div>
                <div className="view">
                    <span>View: </span>
                    <div className={`sorting-btn down ${grid}`} onClick={() => onViewChange('grid')}>
                        <BsFillGridFill />
                    </div>
                    <div className={`sorting-btn up ${list}`} onClick={() => onViewChange('list')}>
                        <FaList />
                    </div>
                </div>
            </div>
        </div>
    )
})

export default MainContainerButtons