import ZoomOnScroll from './components/ZoomOnScroll';
import RevealSection from './components/RevealSection';
import { FloatingNav } from './components/FloatingNav';
import About from './components/About';
import ContactMe from './components/ContactMe';
import ProjectSlider from './components/ProjectSlider';
import { projectData } from './shared/data';

const App = () => {
  return (
    <div>
      {/* Scroll-based animation section */}
      <ZoomOnScroll />

      {/* Section reveal on scroll */}
      <RevealSection />

      {/* Main Finger Tracker area */}
      <div className="App" style={{ position: 'relative', height: '100vh' }}>
        {/* <FingerTracker /> */}
        <div
          style={{
            position: 'fixed',
            bottom: -200,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
          }}
          className="font-sfpro"
        >
          <FloatingNav />
        </div>
      </div>

      <div>
        <About />
      </div>

      <div>
        <ContactMe />
      </div>

      <div>
        <ProjectSlider projects={projectData} />
      </div>
    </div>
  );
};

export default App;