import { useState, useRef, useEffect } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  showWhatsAppButton?: boolean;
}

const WHATSAPP_NUMBER = '5491178980848';
const WHATSAPP_TEXT = 'Hola, quiero más información sobre los productos B2Grow';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

const INTENT_KEYWORDS = [
  'contactar',
  'contacto',
  'hablar con',
  'hablar por',
  'hablar con alguien',
  'hablar con una persona',
  'hablar con un asesor',
  'asesor',
  'vendedor',
  'una persona',
  'comprar',
  'quiero comprar',
  'donde compro',
  'dónde compro',
  'donde consigo',
  'dónde consigo',
  'como compro',
  'cómo compro',
  'precio',
  'presupuesto',
  'cotizar',
  'cotización',
  'cotizacion',
  'mas info',
  'más info',
  'mas informacion',
  'más información',
  'mas información',
  'más informacion',
  'whatsapp',
  'wsp',
  'wpp',
];

const detectWhatsAppIntent = (text: string): boolean => {
  const normalized = text.toLowerCase();
  return INTENT_KEYWORDS.some((kw) => normalized.includes(kw));
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, sender: 'user' | 'bot', showWhatsAppButton = false) => {
    setMessages((prev) => [...prev, { sender, text, showWhatsAppButton }]);
  };

  const handleBubbleClick = () => {
    setIsOpen(!isOpen);

    if (!isOpen && !hasGreeted) {
      addMessage('¡Hola! Soy Bitu, ¿cómo estás? 💬', 'bot');
      setHasGreeted(true);
    }
  };

  const sendMessage = async () => {
    const message = inputValue.trim();
    if (!message) return;

    addMessage(message, 'user');
    setInputValue('');

    const userWantsContact = detectWhatsAppIntent(message);

    let userId = localStorage.getItem('bitu_user');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem('bitu_user', userId);
    }

    try {
      const res = await fetch('https://b2grow-chatbot.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, user_id: userId }),
      });

      const data = await res.json();

      if (data.error) {
        addMessage('Error: ' + data.error, 'bot');
      } else {
        const reply = data.reply || 'No pude generar una respuesta.';
        const botWantsContact = detectWhatsAppIntent(reply);
        addMessage(reply, 'bot', userWantsContact || botWantsContact);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      addMessage('No se pudo conectar con el servidor. Asegúrate de que el servidor esté corriendo.', 'bot');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={handleBubbleClick}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white hover:bg-gray-100 text-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.25)] hover:scale-110 active:scale-95 transition-all duration-200 z-[9999] flex items-center justify-center cursor-pointer border-2 border-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[340px] max-w-[340px] h-[70vh] max-h-[480px] sm:h-[480px] bg-[#1c1c1c] rounded-2xl border border-[#2e2e2e] shadow-[0_6px_25px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden z-[10000]">
          {/* Chat Header */}
          <div className="bg-[#2f2f2f] text-white p-4 text-center font-semibold border-b border-[#3b3b3b]">
            Bitu 🤖
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto text-[0.95rem]">
            {messages.map((msg, idx) => (
              <div key={idx} className="mb-3 clear-both">
                <div
                  className={`
                    p-3 rounded-lg w-fit max-w-[80%] leading-relaxed
                    ${msg.sender === 'user'
                      ? 'bg-white text-gray-800 float-right border border-gray-200'
                      : 'bg-[#2f2f2f] text-white float-left'
                    }
                  `}
                >
                  {msg.text}
                </div>
                <div className="clear-both"></div>
                {msg.sender === 'bot' && msg.showWhatsAppButton && (
                  <div className="mt-2 float-left clear-both">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      Hablar por WhatsApp
                    </a>
                  </div>
                )}
                {msg.sender === 'bot' && msg.showWhatsAppButton && <div className="clear-both"></div>}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="flex border-t border-[#333] bg-[#1b1b1b] p-2 gap-2">
            <input
              type="text"
              placeholder="Escribí tu mensaje..."
              className="flex-1 px-4 py-3 rounded-lg border-none bg-[#2a2a2a] text-white placeholder-[#777] outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={sendMessage}
              className="bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 font-semibold px-5 py-3 rounded-lg border-2 border-gray-200 cursor-pointer transition-all duration-300"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
