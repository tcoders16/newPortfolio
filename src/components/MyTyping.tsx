import { Typewriter } from 'react-simple-typewriter';

const MyTyping = () => {
  return (
    <h1 className="text-4xl font-bold">
      Web,{' '}
      <span className="text-red-500">
        <Typewriter
          words={['Web', 'Web3.0', 'AI', 'ML']}
          loop={0} // 0 = infinite
          cursor
          cursorStyle="|"
          typeSpeed={100}
          deleteSpeed={60}
          delaySpeed={2000}
        />
      </span>{' '}
      – stitched with system-level 💡.
    </h1>
  );
};
export default MyTyping;