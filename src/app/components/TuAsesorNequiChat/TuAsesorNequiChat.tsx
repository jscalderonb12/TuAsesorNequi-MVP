'use client';

import { useState, useEffect, useRef } from 'react';
import { useAssistant } from '@/hooks/useAssistant';
import './styles.css';

export default function TuAsesorNequiChat() {
  const { history, loading, sendMessage } = useAssistant();
  const [input, setInput] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    await sendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="chat-section">
      <div className="chat-header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712104.png"
          alt="Asistente"
        />
        <h3 className="text-center font-semibold  w-full text-fuchsia-200">
          TuAsesorNequi
        </h3>
      </div>
      <div className="chat-box" ref={chatRef}>
        {history.map((entry, idx) => (
          <div key={idx} className={`message ${entry.role}`}>
            {entry.message}
          </div>
        ))}
        {loading && <div className="message bot">✍️ Cargando...</div>}
      </div>
      <form onSubmit={handleSubmit} className="chat-input-wrapper">
        <textarea
          ref={textareaRef}
          className="chat-textarea"
          placeholder="Preguntale a TuAsesorNequi..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={loading}
        />
        <button
          type="submit"
          className="send-button"
          disabled={loading || !input.trim()}
        >
          ➤
        </button>
      </form>
    </div>
  );
}
