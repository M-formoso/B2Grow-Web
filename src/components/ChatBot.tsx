import { useState, useRef, useEffect } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

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

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    setMessages(prev => [...prev, { sender, text }]);
  };

  const handleBubbleClick = () => {
    console.log('CLICK EN BUBBLE! isOpen:', isOpen);
    setIsOpen(!isOpen);

    if (!isOpen && !hasGreeted) {
      addMessage('¡Hola! Soy Bitu, ¿cómo estás? 💬', 'bot');
      setHasGreeted(true);
    }
  };

  const sendMessage = async () => {
    const message = inputValue.trim();
    if (!message) return;

    console.log('Enviando mensaje:', message);
    addMessage(message, 'user');
    setInputValue('');

    let userId = localStorage.getItem('bitu_user');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem('bitu_user', userId);
    }

    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, user_id: userId })
      });

      const data = await res.json();

      if (data.error) {
        addMessage('Error: ' + data.error, 'bot');
      } else {
        const reply = data.reply || 'No pude generar una respuesta.';
        addMessage(reply, 'bot');
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
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-white hover:bg-gray-100 text-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.25)] hover:scale-110 active:scale-95 transition-all duration-200 z-[9999] flex items-center justify-center cursor-pointer border-2 border-gray-200"
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
        <div className="fixed bottom-24 right-6 w-[340px] h-[480px] bg-[#1c1c1c] rounded-2xl border border-[#2e2e2e] shadow-[0_6px_25px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden z-[10000]">
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
