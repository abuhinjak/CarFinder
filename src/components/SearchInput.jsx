import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { carsStore } from "../stores/CarsStore";

import { HiOutlineMagnifyingGlassCircle } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

const SearchInput = observer(() => {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        carsStore.setPage(1);
        carsStore.fetchCars(searchValue);
        navigate(`/${searchValue}`);
    }

    const handleResetInput = () => {
        setSearchValue("");
        carsStore.fetchCars();
    }

    return (
        <form onSubmit={handleSubmit} className="search-field">
            <button className="search-btn">
                <HiOutlineMagnifyingGlassCircle />
            </button>
            <input type="text" name="search" id="search" value={searchValue} onChange={handleSearch} placeholder="Search" />
            {
                searchValue.length > 0 && <button className="reset-btn" onClick={handleResetInput}><IoClose /></button>
            }
        </form>
    )
})

export default SearchInput