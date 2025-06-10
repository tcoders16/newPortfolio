import React from 'react'
import ZoomOnScroll from './components/ZoomOnScroll'
import RevealSection from './components/RevealSection'
import FingerTracker from './components/FingerTracker'

const App = () => {
  return (
    <div className=''>
      <ZoomOnScroll />
      <RevealSection />
      <div className="App">
      <h1>Emotion Detector</h1>
    <div className="App">
      <h1>✋ Live Finger Tracker</h1>
      <FingerTracker />
    </div>
    </div>
    </div>
  )
}

export default App