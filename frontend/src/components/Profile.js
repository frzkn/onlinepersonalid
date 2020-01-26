import React from 'react'
import './Profile.css'
import search from '../images/search.svg'
import axios from 'axios'
import { useState } from 'react'

export default function Profile() {
  const [inputBox, setInput] = useState('')
  const [info, setInfo] = useState('')
  const [show, toggleShow] = useState(false)
  const [loader, setLoader] = useState(false)

  const getProfile = () => {
    if (inputBox.length > 4) {
      if (setLoader) {
        setLoader(true)
        toggleShow(false)
      }
      if (!inputBox) return console.log('missing input')
      console.log('breakpoint')
      axios
        .get(
          `//localhost:3001/linkedin?uname=${inputBox}`
        )
        .then(function(response) {
          console.log(response)
          setInfo(response)
          toggleShow(true)
          setLoader(false)
        })
    } else {
      alert('Enter a valid username')
    }
  }

  return (
    <section class="browser">
      <h1>What info your Internet Profiles have on you? </h1>
      <div class="search-row">
        <input
          type="text"
          value={inputBox}
          class="profile-search"
          placeholder="Enter username, try frzkn"
          disabled={loader}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          class="search-icon"
          onClick={() => getProfile()}
          disabled={loader}
        >
          <img src={search} alt="search-ico" />
        </button>
      </div>
      {loader && <span className="loader"></span>}

      {show && (
        <div class="profile-content">
          <p class="upper-light">PERSONAL INFORMATION</p>
          <img class="prof-picture" src={info.data.imageurl} alt="dp" />
          <h3>{info.data.name}</h3>
          <p>{info.data.location}</p>
          <p>{info.data.headline}</p>
        </div>
      )}
    </section>
  )
}
