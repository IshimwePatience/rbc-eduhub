import React, { useState, useEffect, useRef } from 'react';
import { callAI } from './util/api';

export default function AIWidget() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations, loading]);

  const submit = async () => {
    if (!prompt.trim()) return;
    
    const userMessage = prompt;
    setPrompt('');
    
    setConversations(prev => [...prev, { type: 'user', content: userMessage }]);
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await callAI(userMessage, {});
      setConversations(prev => [...prev, { type: 'ai', content: res.generated || JSON.stringify(res, null, 2) }]);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes float-dance {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
          }
          25% { 
            transform: translateY(-12px) rotate(5deg) scale(1.05); 
          }
          50% { 
            transform: translateY(-6px) rotate(-5deg) scale(1.02); 
          }
          75% { 
            transform: translateY(-15px) rotate(3deg) scale(1.08); 
          }
        }
        
        @keyframes pulse-ring {
          0% { 
            transform: scale(0.95); 
            opacity: 0.7; 
          }
          50% { 
            transform: scale(1.1); 
            opacity: 0.3; 
          }
          100% { 
            transform: scale(1.3); 
            opacity: 0; 
          }
        }
        
        .floating-btn {
          animation: float-dance 3.5s ease-in-out infinite;
        }
        
        .floating-btn:hover {
          animation: float-dance 1.5s ease-in-out infinite;
        }
        
        .pulse-ring {
          animation: pulse-ring 2.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }
        
        .response-content {
          overflow-y: auto;
        }
        
        .response-content::-webkit-scrollbar {
          width: 6px;
        }
        
        .response-content::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        .response-content::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        
        .response-content::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>

      {/* Floating Action Button */}
      <div className="fixed right-4 md:right-8 bottom-4 md:bottom-8 z-50">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#004370] pulse-ring"></div>
          <div className="absolute inset-0 rounded-full bg-[#004370] pulse-ring" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-0 rounded-full bg-[#004370] pulse-ring" style={{ animationDelay: '1s' }}></div>
          
          <button
            className="floating-btn relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#004370] text-white flex items-center justify-center shadow-2xl hover:shadow-[#004370]/50 transition-shadow duration-300 border-4 border-white/30"
            onClick={() => setOpen((s) => !s)}
            aria-label="AI Assistant"
          >
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-ping"></div>
              <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            </div>
            
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4-.86L3 20l1.2-3.2A8.012 8.012 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      </div>

      {/* AI Panel */}
      <div
        className={`fixed inset-x-4 md:inset-x-auto md:right-8 bottom-24 md:bottom-32 z-50 md:w-96 transform transition-all duration-500 ${
          open ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="bg-[#004370] rounded-2xl shadow-2xl border border-white/20 overflow-hidden backdrop-blur-lg" style={{ height: '75vh', maxHeight: '650px' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-[#003256] text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold border-2 border-white/30">
                AI
              </div>
              <div>
                <div className="text-base font-bold">AI Assistant</div>
                <div className="text-xs text-white/80">Powered by Claude</div>
              </div>
            </div>
            <button 
              className="text-white/90 hover:text-white hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all duration-200 text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex flex-col overflow-hidden" style={{ height: 'calc(75vh - 80px)', maxHeight: '570px' }}>
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto response-content space-y-4">
              {/* Input Section */}
              <div className="sticky top-0 bg-[#004370] z-10 pb-4 pt-5 px-5">
                <label className="text-sm font-semibold text-white mb-2 block">Ask the assistant</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="w-full p-4 bg-white/10 border-2 border-white/20 text-white placeholder-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200 resize-none text-sm"
                  placeholder="E.g. Summarize this course in two sentences..."
                />

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={submit}
                    disabled={loading}
                    className="flex-1 px-5 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105 transform transition-all duration-200"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Thinking…
                      </span>
                    ) : 'Ask'}
                  </button>
                  <button 
                    onClick={() => { setPrompt(''); setConversations([]); setError(null); }} 
                    className="px-5 py-3 bg-white/10 hover:bg-white/20 border-2 border-white/20 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Conversation History */}
              {(error || conversations.length > 0) && (
                <div className="space-y-3 pb-4">
                  {error && (
                    <div className="bg-red-500/20 border-l-4 border-red-400 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-300 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <div className="text-sm font-semibold text-red-200">Error</div>
                          <div className="text-sm text-red-100 mt-1">{error}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {conversations.map((msg, idx) => (
                    <div key={idx}>
                      {msg.type === 'user' ? (
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center text-white text-xs font-bold">
                              You
                            </div>
                            <span className="text-xs font-semibold text-white/80">Your Question</span>
                          </div>
                          <div className="whitespace-pre-wrap text-sm text-white leading-relaxed pl-9">
                            {msg.content}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white/20 backdrop-blur-sm border border-white/30 p-4 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-full bg-white/40 flex items-center justify-center text-white text-xs font-bold">
                              AI
                            </div>
                            <span className="text-xs font-semibold text-white">Response</span>
                          </div>
                          <div className="whitespace-pre-wrap text-sm text-white leading-relaxed pl-9">
                            {msg.content}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {loading && (
                    <div className="bg-white/20 backdrop-blur-sm border border-white/30 p-4 rounded-xl">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-white/40 flex items-center justify-center text-white text-xs font-bold">
                          AI
                        </div>
                        <span className="text-xs font-semibold text-white">Typing...</span>
                        <div className="flex gap-1 ml-2">
                          <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Empty State */}
              {!error && conversations.length === 0 && !loading && (
                <div className="text-center py-12 px-4">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <p className="text-white/70 text-sm">Ask me anything! I'm here to help.</p>
                </div>
              )}
              
              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}