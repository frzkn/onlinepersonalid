/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import browserLogo from '../images/browser.svg'
import cog from '../images/cog.svg'
import backwards from '../images/backwards.svg'

function Browser() {
  const [fbflag, setFbFlag] = React.useState(false)

  

  const browserInfo = () => {
    let sUsrAg = navigator.userAgent
    let sBrowser
    if (sUsrAg.indexOf('Firefox') > -1) {
      sBrowser = 'Mozilla Firefox'
    } else if (sUsrAg.indexOf('SamsungBrowser') > -1) {
      sBrowser = 'Samsung Internet'
    } else if (sUsrAg.indexOf('Opera') > -1 || sUsrAg.indexOf('OPR') > -1) {
      sBrowser = 'Opera'
    } else if (sUsrAg.indexOf('Trident') > -1) {
      sBrowser = 'Microsoft Internet Explorer'
    } else if (sUsrAg.indexOf('Edge') > -1) {
      sBrowser = 'Microsoft Edge'
    } else if (sUsrAg.indexOf('Chrome') > -1) {
      sBrowser = 'Google Chrome/ Chromium'
    } else if (sUsrAg.indexOf('Safari') > -1) {
      sBrowser = 'Apple Safari'
    } else {
      sBrowser = 'unknown'
    }
    return sBrowser
  }

  const osNames = () => {
    let osName = 'Not known'
    if (navigator.appVersion.indexOf('Win') != -1) osName = 'Windows OS'
    if (navigator.appVersion.indexOf('Mac') != -1) osName = 'Mac OS'
    if (navigator.appVersion.indexOf('X11') != -1) osName = 'UNIX '
    if (navigator.appVersion.indexOf('Linux') != -1) osName = 'GNU/ Linux '
    return osName
  }

  return (
    <section class="browser">
      <h1>What info your browser leaks of you?</h1>
      <div class="browser-content">
        <p class="upper-light">GENERAL INFORMATION</p>
        <div class="browser-row">
          <div class="item">
            <img src={browserLogo} alt="browserLogo"></img>
            <p class>{browserInfo()}</p>
          </div>
          <div class="item">
            <img src={cog} alt="browserLogo"></img>
            <p class>{osNames()}</p>
          </div>
          <div class="item">
            <img src={backwards} alt="browserLogo"></img>
            <p class>{navigator.referrer || 'No previous page'}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Browser
