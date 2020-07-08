import React, { useState, useEffect } from 'react'
import Forex from './Forex'
import Select from 'react-select'

const Home = (props) => {
  let [base, setBase] = useState("")
  let [forex, setForex] = useState([])

  useEffect(() => {
    fetch(`https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_API_KEY}`)
    .then((response) => {
      if (response.ok){
        return response
      } else {
        let errorMessage = `${response.status}: ${response.statusText}`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((body) => {
      setForex(Object.entries(body.rates))
    })
    .catch((error) => {
      console.error(`Error fetching Forex: ${error.message}`)
    })
  }, [])

  const update = (event) => {
    event.preventDefault()
    setBase(event.currentTarget.value)
  }

  const clear = (event) => {
    event.preventDefault()
    setBase("")
  }

  let forexComponents = forex.map((rate) => {
    return (
      <div className="small-12 large-3">
        <Forex base={base} currency={rate[0]} rate={rate[1]} />
      </div>
    )
  })

  return (
    <>
    <div className="grid-container">
    <h1 className="text-center">Forex Hack Exchange</h1>
    <form autoComplete="off" onSubmit={clear}>
      <div className="">
        <div className="grid-y">
          <label htmlFor="base">Base Currency in $USD</label>
          <input
          id="base"
          name="base"
          type="text"
          value={base}
          onChange={update}
          />
          <button type="submit" value="Submit">Clear</button>
        </div>
      </div>
    </form>
    </div>

    <div className="grid-container" id="currency-grid">
    <div className="grid-x">
      {forexComponents}
    </div>
    </div>
    </>
  )
}

export default Home
