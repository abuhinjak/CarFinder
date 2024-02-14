import { BarLoader } from "react-spinners"

const Loader = () => {
  return (
    <div className="loader">
        <BarLoader color="#08D9D6" />
        <p>Please wait, cars are on the way!</p>
    </div>
  )
}

export default Loader