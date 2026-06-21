import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import profileImg from '../assets/profile.webp';
import { IoChatbubblesOutline, IoClose, IoSend } from 'react-icons/io5';
import { FAQ, QUICK_REPLIES, SYSTEM_PROMPT, UNKNOWN_RESPONSE, WELCOME_MESSAGE } from '../data/chatbotConfig';

type MessageRole = 'bot' | 'user' | 'chips';

interface Message {
  id: string;
  role: MessageRole;
  text?: string;
  chips?: string[];
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function matchFaq(input: string) {
  const trimmed = input.trim();
  for (const entry of FAQ) {
    if (entry.patterns.some((p) => p.test(trimmed))) {
      return entry;
    }
  }
  return null;
}

async function callGemini(history: Message[], userInput: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  if (!apiKey) return UNKNOWN_RESPONSE;

  // Gemini requires contents to start with a 'user' role — drop any leading bot messages
  const firstUserIdx = history.findIndex((m) => m.role === 'user');
  const trimmed = firstUserIdx === -1 ? [] : history.slice(firstUserIdx);

  const contents = [
    ...trimmed.slice(-10).map((m) => ({
      role: m.role === 'bot' ? 'model' : 'user',
      parts: [{ text: m.text ?? '' }],
    })),
    { role: 'user', parts: [{ text: userInput }] },
  ];

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { maxOutputTokens: 300, temperature: 0.75 },
      }),
    },
  );

  if (!res.ok) return UNKNOWN_RESPONSE;
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? UNKNOWN_RESPONSE;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonControls = useAnimation();

  // Periodic wiggle until the chat is first opened
  useEffect(() => {
    if (initialized) {
      buttonControls.stop();
      return;
    }
    let cancelled = false;
    const trigger = () => {
      if (cancelled) return;
      buttonControls.start({
        rotate: [0, -14, 14, -10, 10, -5, 5, 0],
        scale: [1, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1],
        transition: { duration: 0.65, ease: 'easeInOut' as const },
      });
    };
    const initial = setTimeout(trigger, 2000);
    const interval = setInterval(trigger, 4000);
    return () => {
      cancelled = true;
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, [initialized, buttonControls]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const open = () => {
    setIsOpen(true);
    if (!initialized) {
      setInitialized(true);
      setTimeout(() => {
        setMessages([
          { id: uid(), role: 'bot', text: WELCOME_MESSAGE },
          { id: uid(), role: 'chips', chips: QUICK_REPLIES },
        ]);
      }, 200);
    }
    setTimeout(() => inputRef.current?.focus(), 350);
  };

  const botReply = useCallback(async (userInput: string, history: Message[]) => {
    const match = matchFaq(userInput);

    if (match) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => {
          const next: Message[] = [...prev, { id: uid(), role: 'bot', text: match.response }];
          if (match.followUps?.length) {
            next.push({ id: uid(), role: 'chips', chips: match.followUps });
          }
          return next;
        });
      }, 750);
    } else {
      setIsTyping(true);
      try {
        const text = await callGemini(history, userInput);
        setIsTyping(false);
        setMessages((prev) => [...prev, { id: uid(), role: 'bot', text }]);
      } catch {
        setIsTyping(false);
        setMessages((prev) => [...prev, { id: uid(), role: 'bot', text: UNKNOWN_RESPONSE }]);
      }
    }
  }, []);

  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      let history: Message[] = [];
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        const base = last?.role === 'chips' ? prev.slice(0, -1) : prev;
        history = base.filter((m) => m.role !== 'chips');
        return [...base, { id: uid(), role: 'user', text: trimmed }];
      });
      setInput('');
      botReply(trimmed, history);
    },
    [isTyping, botReply],
  );

  const handleChip = useCallback(
    (chip: string) => {
      if (isTyping) return;
      let history: Message[] = [];
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        const base = last?.role === 'chips' ? prev.slice(0, -1) : prev;
        history = base.filter((m) => m.role !== 'chips');
        return [...base, { id: uid(), role: 'user', text: chip }];
      });
      botReply(chip, history);
    },
    [isTyping, botReply],
  );

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    send(input);
  };

  const canSend = input.trim().length > 0 && !isTyping;

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ type: 'spring', damping: 22, stiffness: 320 }}
            style={{
              position: 'absolute',
              bottom: 64,
              right: 0,
              width: 'min(360px, calc(100vw - 32px))',
              height: 'min(520px, calc(100dvh - 120px))',
              background: '#0D1221',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '14px 18px',
                background: 'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(139,92,246,0.12))',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: 11,
                flexShrink: 0,
              }}
            >
              <img
                src={profileImg}
                alt="Rijan Acharya"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid rgba(6,182,212,0.4)',
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    color: '#F1F5F9',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  Ask Rijan
                </div>
                <div
                  style={{
                    color: '#06B6D4',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  <motion.span
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#06B6D4',
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                  Online
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(241,245,249,0.45)',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 6,
                  flexShrink: 0,
                }}
              >
                <IoClose size={19} />
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '14px 14px 6px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {messages.map((msg, idx) => {
                if (msg.role === 'chips') {
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22 }}
                      style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingLeft: 2 }}
                    >
                      {msg.chips?.map((chip, ci) => (
                        <ChipButton key={chip} label={chip} onClick={() => handleChip(chip)} disabled={isTyping} delay={ci * 0.06} />
                      ))}
                    </motion.div>
                  );
                }

                const isBot = msg.role === 'bot';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: isBot ? -18 : 18, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 280, delay: idx === 0 ? 0.05 : 0 }}
                    style={{
                      alignSelf: isBot ? 'flex-start' : 'flex-end',
                      maxWidth: '86%',
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        padding: '9px 13px',
                        borderRadius: isBot ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                        background: isBot
                          ? 'rgba(255,255,255,0.04)'
                          : 'linear-gradient(135deg, #06B6D4, #8B5CF6)',
                        border: isBot ? '1px solid rgba(255,255,255,0.07)' : 'none',
                        color: '#F1F5F9',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13.5,
                        lineHeight: 1.65,
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {msg.text}
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Typing indicator — wave bounce */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, x: -14, scale: 0.92 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.92 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    style={{ alignSelf: 'flex-start' }}
                  >
                    <div
                      style={{
                        padding: '11px 16px',
                        borderRadius: '4px 14px 14px 14px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        display: 'flex',
                        gap: 5,
                        alignItems: 'center',
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: '#06B6D4',
                            display: 'inline-block',
                          }}
                          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' as const }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              style={{
                padding: '10px 12px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                gap: 8,
                alignItems: 'center',
                background: 'rgba(0,0,0,0.18)',
                flexShrink: 0,
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isTyping}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: 10,
                  padding: '8px 12px',
                  color: '#F1F5F9',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13.5,
                  outline: 'none',
                  minWidth: 0,
                }}
              />
              <motion.button
                type="submit"
                disabled={!canSend}
                whileHover={{ scale: canSend ? 1.1 : 1 }}
                whileTap={{ scale: canSend ? 0.88 : 1 }}
                transition={{ type: 'spring', damping: 16, stiffness: 380 }}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: canSend
                    ? 'linear-gradient(135deg, #06B6D4, #8B5CF6)'
                    : 'rgba(255,255,255,0.05)',
                  border: 'none',
                  cursor: canSend ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: canSend ? '#fff' : 'rgba(255,255,255,0.25)',
                  flexShrink: 0,
                  transition: 'background 0.15s',
                }}
              >
                <IoSend size={15} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Float button */}
      <motion.button
        onClick={isOpen ? () => setIsOpen(false) : open}
        animate={buttonControls}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #06B6D4, #8B5CF6)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: '0 8px 28px rgba(6,182,212,0.35)',
          position: 'relative',
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              <IoClose size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.15 }}
            >
              <IoChatbubblesOutline size={22} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badge dot */}
        {!initialized && (
          <motion.span
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 13,
              height: 13,
              borderRadius: '50%',
              background: '#EF4444',
              border: '2px solid #060A14',
              pointerEvents: 'none',
            }}
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' as const }}
          />
        )}

        {/* Pulse ring (shown before first open) */}
        {!initialized && (
          <motion.span
            style={{
              position: 'absolute',
              inset: -4,
              borderRadius: '50%',
              border: '2px solid rgba(6,182,212,0.5)',
              pointerEvents: 'none',
            }}
            animate={{ scale: [1, 1.4], opacity: [0.7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' as const }}
          />
        )}
      </motion.button>
    </div>
  );
}

function ChipButton({
  label,
  onClick,
  disabled,
  delay = 0,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  delay?: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: disabled ? 1 : 1.06, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: 'spring', damping: 18, stiffness: 300, delay }}
      style={{
        padding: '5px 12px',
        borderRadius: 20,
        border: '1px solid rgba(6,182,212,0.35)',
        background: 'rgba(6,182,212,0.05)',
        color: '#06B6D4',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {label}
    </motion.button>
  );
}
