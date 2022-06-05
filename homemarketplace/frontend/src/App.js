import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getHouses } from './features/houses/housesSlice'
import Navbar from './components/Navbar'

import loader from './loader.gif'

function App() {
  const dispatch = useDispatch()

  const houses = useSelector((state) => state.houses)

  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])

  return (
    <div className='App'>
      <Navbar />

      <div className='container px-4'>
        <div className='w-100'>
          <div className='flex justify-center items-center'>
            <div className='w-full md:w-1/2'>
              {houses.isLoading ? (
                <img className='mx-auto my-5' src={loader} alt='loader' />
              ) : (
                houses.houses.map((house) => (
                  <div
                    key={house.id}
                    className='w-100 shadow-md rounded-md p-7 bg-white my-6'>
                    <p className='text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline'>
                      {house.name}
                    </p>
                    <small className='italic text-gray-600'>
                      {house.address} {house.zip_code}
                    </small>

                    <p className='my-2 text-gray-800 text-sm'>
                      {house.description}
                    </p>

                    <p className='my-2 text-gray-800 text-sm font-semibold'>
                      Price: ${house.price}
                    </p>

                    <small className='text-gray-600'>
                      <span>Created at: {house.created_at}</span>
                    </small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
