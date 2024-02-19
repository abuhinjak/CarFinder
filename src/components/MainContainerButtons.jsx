import { observer } from "mobx-react-lite"
import { carsStore } from "../stores/CarsStore"
import { FaSortAlphaDown, FaSortAlphaUp, FaList } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";

const MainContainerButtons = observer(({children, makeID}) => {
    const orderAsc = carsStore.order === 'asc' ? 'active' : '';
    const orderDesc = carsStore.order === 'desc' ? 'active' : '';
    const grid = carsStore.view === 'grid' ? 'active' : '';
    const list = carsStore.view === 'list' ? 'active' : '';
    
    return (
        <div className="main-container-buttons-wrapper">
            {children}

            <div className="buttons-wrapper">
                <div className="sorting">
                    <span>Sort by: </span>
                    <div className={`sorting-btn down ${orderAsc}`} onClick={() => carsStore.sortMakes('asc', makeID)}>
                        <FaSortAlphaDown />
                    </div>
                    <div className={`sorting-btn up ${orderDesc}`} onClick={() => carsStore.sortMakes('desc', makeID)}>
                        <FaSortAlphaUp />
                    </div>
                </div>
                <div className="view">
                    <span>View: </span>
                    <div className={`sorting-btn down ${grid}`} onClick={() => carsStore.handleView('grid')}>
                        <BsFillGridFill />
                    </div>
                    <div className={`sorting-btn up ${list}`} onClick={() => carsStore.handleView('list')}>
                        <FaList />
                    </div>
                </div>
            </div>
        </div>
    )
})

export default MainContainerButtons