import { useEffect } from 'react'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { createMakesStore } from './stores/MakesStore'
// import { FaTrash } from 'react-icons/fa'

import './App.css'

const App = observer(() => {
  const makesStore = useLocalObservable(createMakesStore);

  useEffect(() => {
    makesStore.getAllMakes(4,1);
  }, [makesStore]);

  return (
    <>
      <h1>Mobx practice</h1>
      <ul>
        {makesStore.makes.map((make) => (
          <li key={make.id}>{make.name} <button onClick={() => makesStore.deleteSingleMake(make.id)}>Delete</button></li>
          ))}
      </ul>
    </>
  )
})

export default App
