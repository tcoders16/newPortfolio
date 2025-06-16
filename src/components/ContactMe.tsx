import { useState } from "react";

const ContactMe = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("Hello, Omkumar");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSend = async () => {
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setSent(true);
        setTimeout(() => {
          setName("");
          setEmail("");
          setMessage("Hello, Omkumar");
          setSent(false);
        }, 4000);
      } else {
        alert(" Failed to send email. Please try again.");
      }
    } catch (err) {
      alert(" Server error. Try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative h-screen bg-black/90 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 ">
        <img
          src="/images/ContactMe.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="relative z-10 px-6 md:px-24 py-28 flex flex-col items-center justify-center pt-2 md:pt-0 md:mt-20 mt-92">
        <div className="w-full max-w-2xl text-left mb-4">
          <h2 className="text-sm md:text-base uppercase tracking-widest text-gray-400">
            Contact Me
          </h2>
        </div>

        <div className="w-full max-w-2xl relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full mb-3 p-4 bg-black/10 text-white placeholder-gray-500 border border-white/20 rounded-xl backdrop-blur-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full mb-4 p-4 bg-black/10 text-white placeholder-gray-500 border border-white/20 rounded-xl backdrop-blur-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Start typing here..."
            className="w-full p-6 bg-black/10 text-white placeholder-gray-500 border border-white/20 rounded-2xl backdrop-blur-md shadow-md resize-none focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className={`mt-4 px-6 py-3 ${
              loading ? "bg-gray-500" : "bg-white"
            } text-black font-medium rounded-xl hover:bg-gray-200 transition-transform active:scale-95`}
          >
            {loading ? "Sending..." : "Send"}
          </button>

          {/* 🎉 Floating Dots Animation on Send */}
          {sent && (
            <div className="absolute inset-0 overflow-visible z-50 pointer-events-none">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white opacity-80 animate-floatUp"
                  style={{
                    width: `${4 + Math.random() * 4}px`,
                    height: `${4 + Math.random() * 4}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.5}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* 📨 Mail Preview */}
          <div
            className={`absolute top-full mt-10 w-full bg-white/10 text-white border border-white/10 rounded-2xl p-6 backdrop-blur-lg shadow-lg min-h-[150px] transform-gpu transition-transform duration-1000 ease-in-out ${
              sent ? "animate-mailLaunch" : ""
            }`}
          >
            <p className="font-semibold text-lg mb-2">To: Omkumar Solanki</p>
            <p className="text-sm text-gray-300 mb-1">
              From: {email || "your@email.com"}
            </p>
            <p className="text-sm text-gray-300 mb-4 italic">
              Subject: Message from {name || "Anonymous"}
            </p>
            <div className="whitespace-pre-wrap text-gray-200 text-sm">
              <p>{message || "Your message preview will appear here..."}</p>
              {name && (
                <p className="mt-6 text-gray-400 italic">
                  Regards,<br />
                  <span className="text-white">{name}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ✨ Keyframe Styles */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-120px) scale(0.2);
            opacity: 0;
          }
        }

        .animate-floatUp {
          animation: floatUp 1.6s ease-out forwards;
        }

        @keyframes mailLaunch {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0) translateX(0) rotate(0deg);
          }
          30% {
            transform: scale(0.95) translateY(-10px) translateX(10px) rotate(5deg);
          }
          60% {
            transform: scale(0.85) translateY(-50px) translateX(80px) rotate(20deg);
            opacity: 0.8;
          }
          85% {
            transform: scale(0.7) translateY(-120px) translateX(150px) rotate(45deg);
            opacity: 0.5;
          }
          100% {
            transform: scale(0.6) translateY(-200px) translateX(250px) rotate(60deg);
            opacity: 0;
          }
        }

        .animate-mailLaunch {
          animation: mailLaunch 2s ease-in-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ContactMe;