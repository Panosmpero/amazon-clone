import React from 'react'
import { Link } from 'react-router-dom'

const Default = () => {
  return (
    <div className="default">
      <h1>404</h1>
      <h2>There is noone here!</h2>
      <h2>Back to <Link to="/">MAIN</Link></h2>
    </div>
  )
}

export default Default
