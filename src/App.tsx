
import ZoomOnScroll from './components/ZoomOnScroll'
import RevealSection from './components/RevealSection'
import FingerTracker from './components/FingerTracker'
import { FloatingNav } from './components/FloatingNav'

const App = () => {
  return (
    <div>
      {/* Scroll-based animation section */}
      <ZoomOnScroll />

      {/* Section reveal on scroll */}
      <RevealSection />

      {/* Main Finger Tracker area */}
      <div className="App" style={{ position: 'relative', height: '100vh' }}>
        {/* Live hand detection and canvas */}
        <FingerTracker />

          {/* Floating Nav Bar fixed below the screen bottom */}
          <div
            style={{
              position: 'fixed',
              bottom: -200, // Increase this value to move it lower
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
            }}
            className="font-sfpro"
          >
            <FloatingNav />
        </div>
      </div>
    </div>
  )
}

export default App