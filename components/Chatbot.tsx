import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm the MCKI Advisor. Are you currently based in the UK/EU, or applying from overseas?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const chatHistory = messages.slice(1).map(m => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        history: chatHistory,
        config: {
          systemInstruction: `You are an AI advisor for MCKI Solutions, an education consultancy.
          
          YOUR GOALS:
          1. **Segment**: Determine if the user is a "UK/EU Student" or "International Student". If you don't know, ASK.
          2. **Pre-Qualify**: 
             - If UK/EU: Ask "Have you lived in the UK/EU for the last 3 years?" to help gauge funding eligibility context.
             - If International: Ask "What is your highest academic qualification so far?"
          3. **Route**:
             - Direct UK students to '/uk' or '/eligibility'.
             - Direct International students to '/international'.
             - If they seem ready, send them to '/apply'.
             - If they have complex issues, tell them to '/book' a call.

          COMPLIANCE & TONE:
          - **CRITICAL**: NEVER guarantee admission, visas, or funding. Always use "subject to eligibility" or "decisions rest with the provider".
          - Be professional, encouraging, but realistic.
          - Keep answers short (max 3-4 sentences).

          Example Flow 1:
          User: "I want to do a business course."
          You: "Great choice. To guide you best, are you currently living in the UK or applying from another country?"
          User: "I'm in London."
          You: "Excellent. Have you lived in the UK/EU for the last 3 years? This is important for funding eligibility."

          Example Flow 2:
          User: "Can you get me a visa?"
          You: "We provide expert guidance on documentation to maximize your success, but the final decision is with UKVI. We cannot guarantee a visa. Check our '/international' page for details."`,
        },
      });

      const result = await chat.sendMessage({ message: userMessage });
      const responseText = result.text;

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having a little trouble connecting. Please try again or book a call directly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-mcki-blue hover:bg-blue-800'
        }`}
        aria-label="Toggle Chat"
      >
        {isOpen ? <X className="text-white w-6 h-6" /> : <MessageCircle className="text-white w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-36 md:bottom-24 right-4 md:right-8 z-50 w-[90vw] md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[500px] animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="bg-mcki-blue p-4 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Bot className="text-white w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">MCKI Assistant</h3>
              <p className="text-blue-200 text-xs">Online • AI Powered</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-mcki-blue text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 text-mcki-text rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-mcki-blue focus:ring-1 focus:ring-mcki-blue"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-mcki-gold text-white p-2 rounded-full hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};