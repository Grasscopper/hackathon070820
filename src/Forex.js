import React from 'react'

const Forex = (props) => {
  let newCurrency = props.base * props.rate
  return (
    <>
    <p>{newCurrency}</p><p className="currency">{props.currency}</p>
    </>
  )
}

export default Forex
