import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SERVICES = [
  'Web Development',
  'Linux Development',
  'App Development',
  'UI/UX Design',
  'Maintenance',
  'Custom Solutions',
];

const CODE_HASH = 'deb3d256fde0a2aac4ed37d719b0ac62c8380cd79ad4b51b7fabc5190ad5de82';

function sha256(str) {
  // Simple browser SHA-256
  return window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)).then(buf =>
    Array.from(new Uint8Array(buf)).map(x => x.toString(16).padStart(2, '0')).join('')
  );
}

const Admin = ({ setGlobalUiHidden }) => {
  const [step, setStep] = useState(1); // Start at services selection
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [thankState, setThankState] = useState(0); // 0: nothing, 1: thank you, 2: contact soon, 3: show button
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 3) {
      setGlobalUiHidden && setGlobalUiHidden(true);
      setThankState(1);
      setTimeout(() => setThankState(2), 1800);
      setTimeout(() => setThankState(3), 3400);
    } else {
      setGlobalUiHidden && setGlobalUiHidden(false);
    }
    // eslint-disable-next-line
  }, [step]);

  useEffect(() => {
    if (thankState === 3) {
      setGlobalUiHidden && setGlobalUiHidden(false);
    }
    // eslint-disable-next-line
  }, [thankState]);

  const handleServiceToggle = (service) => {
    setSelected((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Use the user's Formspree endpoint
    const formId = 'mjkryzdg';
    await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        services: selected.join(', '),
      }),
    });
    setSubmitting(false);
    setStep(3);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8 relative overflow-hidden">
      {step === 1 && (
        <div className="w-full flex flex-col items-center animate-fade-in">
          <h2 className="text-4xl font-extrabold mb-10 text-center tracking-tight">Select Services</h2>
          <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            {SERVICES.map((service) => {
              const isSelected = selected.includes(service);
              return (
                <label
                  key={service}
                  className={`w-full cursor-pointer transition-all duration-200 select-none service-btn2 ${isSelected ? 'service-btn2-selected' : ''}`}
                  style={{ borderWidth: isSelected ? 2 : 1, borderColor: isSelected ? '#fff' : 'rgba(255,255,255,0.15)' }}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleServiceToggle(service)}
                    className="accent-white w-5 h-5 hidden"
                  />
                  <span className={`block w-full text-2xl font-bold text-center py-8 transition-all duration-200 ${isSelected ? 'silver-gradient-text' : 'text-white'}`}>{service}</span>
                </label>
              );
            })}
          </div>
          {selected.length > 0 && (
            <button
              className="px-16 py-5 rounded-full font-extrabold text-2xl next-btn-gradient mx-auto block shadow-xl"
              style={{ minWidth: 200 }}
              onClick={() => setStep(2)}
            >
              Next
            </button>
          )}
        </div>
      )}
      {step === 2 && (
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 animate-fade-in w-full max-w-md mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-2 text-center">Contact Details</h2>
          <input
            type="text"
            className="px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-lg focus:outline-none focus:border-white/50"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            className="px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-lg focus:outline-none focus:border-white/50"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your Email"
            required
          />
          <button
            type="submit"
            className="mt-2 px-10 py-4 rounded-full font-extrabold text-xl next-btn-gradient mx-auto block disabled:opacity-40"
            disabled={!name || !email || submitting}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
      {step === 3 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black">
          <div className="w-full flex flex-col items-center">
            <div className={`thank-fade ${thankState === 1 ? 'thank-fade-in' : thankState > 1 ? 'thank-fade-out' : ''}`}>
              <h2 className="thank-text">Thank You</h2>
            </div>
            <div className={`thank-fade ${thankState === 2 ? 'thank-fade-in' : thankState > 2 ? 'thank-fade-out' : ''}`}
                 style={{ transitionDelay: '0.2s' }}>
              <h2 className="thank-text">I will contact you soon</h2>
            </div>
            {thankState === 3 && (
              <button
                className="mt-16 px-16 py-5 rounded-full font-extrabold text-2xl next-btn-gradient mx-auto block shadow-xl animate-fade-in"
                style={{ minWidth: 200 }}
                onClick={() => navigate('/')}
              >
                Go Home
              </button>
            )}
          </div>
        </div>
      )}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .service-btn2 {
          border-style: solid;
          border-radius: 9999px;
          background: rgba(0,0,0,0.15);
          min-height: 90px;
          min-width: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding-left: 0;
          padding-right: 0;
          box-shadow: 0 2px 16px 0 rgba(160,160,160,0.08);
        }
        .service-btn2-selected {
          border-color: #fff !important;
          background: rgba(255,255,255,0.08) !important;
        }
        .silver-gradient-text {
          background: linear-gradient(120deg, #e0e0e0 10%, #b0b0b0 30%, #f5f5f5 50%, #a3a3a3 70%, #e0e0e0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
        .next-btn-gradient {
          background: linear-gradient(120deg, #e0e0e0 10%, #b0b0b0 30%, #f5f5f5 50%, #a3a3a3 70%, #e0e0e0 100%);
          color: #111;
          border: 2px solid #fff;
          box-shadow: 0 4px 24px 0 rgba(160,160,160,0.12);
          transition: background 0.2s;
        }
        .next-btn-gradient:hover {
          background: linear-gradient(120deg, #f5f5f5 10%, #e0e0e0 30%, #b0b0b0 50%, #e0e0e0 70%, #f5f5f5 100%);
        }
        .thank-fade {
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          pointer-events: none;
        }
        .thank-fade-in {
          opacity: 1;
          animation: thankFadeIn 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        .thank-fade-out {
          opacity: 0;
          animation: thankFadeOut 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes thankFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes thankFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .thank-text {
          font-size: 7vw;
          font-weight: 900;
          letter-spacing: -0.04em;
          text-align: center;
          width: 100vw;
          background: linear-gradient(120deg, #e0e0e0 10%, #b0b0b0 30%, #f5f5f5 50%, #a3a3a3 70%, #e0e0e0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 32px #b0b0b0, 0 0 64px #fff8;
        }
      `}</style>
    </div>
  );
};

export default Admin; 