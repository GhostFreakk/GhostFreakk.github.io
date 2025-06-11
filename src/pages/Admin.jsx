import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../context/MessageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { TextAnimate } from "../components/magicui/text-animate";

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
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [thankState, setThankState] = useState(0); // 0: nothing, 1: thank you, 2: contact soon, 3: show button
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  useEffect(() => {
    if (step === 3) {
      setGlobalUiHidden && setGlobalUiHidden(true);
      setThankState(1);
      setTimeout(() => setThankState(2), 2000);
      setTimeout(() => setThankState(3), 4000);
    } else {
      setGlobalUiHidden && setGlobalUiHidden(false);
    }
  }, [step, setGlobalUiHidden]);

  useEffect(() => {
    if (thankState === 3) {
      setGlobalUiHidden && setGlobalUiHidden(false);
    }
  }, [thankState, setGlobalUiHidden]);

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
    try {
      // Use the user's Formspree endpoint
      const formId = 'mjkryzdg';
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          services: selected.join(', '),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitting(false);
      setStep(3);
      showMessage('Request submitted successfully!', 'success');
    } catch (error) {
      setSubmitting(false);
      showMessage('Failed to submit request. Please try again.', 'error');
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    const input = e.target.elements.code.value;
    const hash = await sha256(input);
    
    if (hash === CODE_HASH) {
      setTimeout(() => setStep(1), 2000);
    } else {
      showMessage('Invalid code. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8 relative overflow-hidden">
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full flex flex-col items-center"
        >
          <div className="w-full max-w-5xl flex justify-between items-center mb-10">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-full font-bold text-lg border border-white/20 hover:bg-white/10 transition-colors"
            >
              Back to Home
            </motion.button>
            <h2 className="text-4xl font-extrabold text-center tracking-tight">Select Services</h2>
            <div className="w-[120px]"></div> {/* Spacer for alignment */}
          </div>
          <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            {SERVICES.map((service) => {
              const isSelected = selected.includes(service);
              return (
                <motion.label
                  key={service}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: SERVICES.indexOf(service) * 0.1 }}
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
                </motion.label>
              );
            })}
          </div>
          {selected.length > 0 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="px-16 py-5 rounded-full font-extrabold text-2xl next-btn-gradient mx-auto block shadow-xl"
              style={{ minWidth: 200 }}
              onClick={() => setStep(2)}
            >
              Next
            </motion.button>
          )}
        </motion.div>
      )}

      {step === 2 && (
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-6 w-full max-w-md mx-auto mt-16"
        >
          <div className="flex justify-between items-center mb-2">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-full font-bold text-lg border border-white/20 hover:bg-white/10 transition-colors"
            >
              Back
            </motion.button>
            <h2 className="text-2xl font-bold text-center">Contact Details</h2>
            <div className="w-[120px]"></div> {/* Spacer for alignment */}
          </div>
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
        </motion.form>
      )}

      {step === 3 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black">
          <div className="w-full flex flex-col items-center">
            <AnimatePresence mode="wait">
              {thankState === 1 && (
                <motion.div
                  key="thank-you"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <TextAnimate animation="slideUp" by="word" className="text-4xl md:text-6xl font-bold mb-4">
                    Thank You
                  </TextAnimate>
                  <TextAnimate animation="slideUp" by="word" className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                    Your request has been received.
                  </TextAnimate>
                </motion.div>
              )}
              {thankState === 2 && (
                <motion.div
                  key="contact-soon"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <TextAnimate animation="slideUp" by="word" className="text-4xl md:text-6xl font-bold mb-4">
                    I'll Contact You Soon
                  </TextAnimate>
                  <TextAnimate animation="slideUp" by="word" className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                    Looking forward to working with you.
                  </TextAnimate>
                </motion.div>
              )}
              {thankState === 3 && (
                <motion.div
                  key="return-home"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-center"
                >
                  <button
                    className="mt-8 px-16 py-5 rounded-full font-extrabold text-2xl next-btn-gradient mx-auto block shadow-xl"
                    style={{ minWidth: 200 }}
                    onClick={() => navigate('/')}
                  >
                    Return Home
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
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
          transition: all 0.3s ease;
        }
        .next-btn-gradient:hover {
          background: linear-gradient(120deg, #f5f5f5 10%, #e0e0e0 30%, #b0b0b0 50%, #e0e0e0 70%, #f5f5f5 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 32px 0 rgba(160,160,160,0.2);
        }
      `}</style>
    </div>
  );
};

export default Admin; 