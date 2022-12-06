import React from 'react'

function Loader({ loading = false, text = '' }) {
  return (
    <>
      {loading && (
        <div id="overlay">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  )
}

export default Loader
