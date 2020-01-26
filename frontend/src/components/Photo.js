import React from 'react'

function Photo() {
  const [states, setStates] = React.useState('')
  const [loader, setLoader] = React.useState(false)
  const [show, toggleShow] = React.useState(false)

  return (
    <section class="browser">
      <h1>Reverse Searching Google Images</h1>
      <div class="browser-content">
        <p class="upper-light">
          Google Crawler to find domain links of uploaded Images.
        </p>
        <div class="file-row">
          <input
            class="image"
            type="file"
            name="image"
            accept="image/*"
            disabled={loader}
          />
          <button
            className="google-btn"
            disabled={loader}
            onClick={() => {
              let a = document.querySelector('.image').files[0]
              if (a) {
                if (show) {
                  toggleShow(false)
                }
                setLoader(true)
                let data = new FormData()
                data.append('image', a)

                fetch('//localhost:3001/google', {
                  method: 'POST',
                  body: data
                })
                  .then((data, err) => data.text())
                  .then((dta) => {
                    setStates(JSON.parse(dta).data)
                    toggleShow(true)
                    setLoader(false)
                  })
              }
            }}
          >
            Upload
          </button>
        </div>
      </div>

      {loader && <span className="loader"></span>}
      <div class="google-search-results">
        {show && (
          <>
            <p class="table-title">TOP DOMAINS</p>
            <p className="table-title">RESULTS</p>
          </>
        )}

        {show &&
          states &&
          states.map((i) => {
            return [<p>{i.name}</p>, <p>{i.status}</p>]
          })}
      </div>
    </section>
  )
}

export default Photo
