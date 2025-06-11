

const About = () => {
  return (
    <section className="relative min-h-screen bg-black text-white px-4 md:px-24 py-28 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="relative w-full md:w-[105%] flex justify-end">
        <img
          src="/images/mountain.jpeg"
          alt="Omkumar Solanki Portrait"
          className="max-w-[2000px] w-screen rounded-[10px] grayscale   shadow-2xl object-cover translate-x-4 md:translate-x-16"
        />

        {/* Glass Text Overlay */}
        <div className="absolute top-6 left-4 md:top-60 md:left-140 bg-black/50 backdrop-blur-md p-6 md:p-10 rounded-3xl max-w-xl shadow-xl z-10">
          <h2 className="text-sm md:text-base uppercase tracking-widest text-gray-400 mb-2">
            About
          </h2>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
            Vision. Precision.
          </h1>
          <p className="text-gray-100 text-base md:text-lg leading-relaxed">
            I’m <span className="text-white font-semibold">Omkumar Solanki</span>, a full-stack developer passionate about crafting exceptional digital experiences across mobile, web, AI, and Web3.
          </p>

          <div className="hidden md:block mt-6 text-sm md:text-base text-gray-300">
            <p className="mb-3">I’ve led complex frontend + backend builds including:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                <span className="text-white">Gesture Nav + Face Emotion Tracker</span> — Real-time TensorFlow.js camera interface
              </li>
              <li>
                <span className="text-white">RAG Chatbots (PDFs + Bhagavad Gita)</span> — LangChain + Pinecone embeddings + GPT-4
              </li>
              <li>
                <span className="text-white">Smart Donation Manager</span> — Email workflows, approvals, analytics
              </li>
              <li>
                <span className="text-white">Crypto Wallet Generator</span> — Solana/Ethereum HD wallet generator with keypair export
              </li>
            </ul>
            <p className="mt-5 text-gray-400">
              I’m ultra-fast, aesthetic-obsessed, and committed to quality execution. I ship.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;