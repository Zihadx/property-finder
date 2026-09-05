"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SALES_WHATSAPP,
  QUICK_REPLIES,
  GREETING_MESSAGE,
  FALLBACK_REPLY,
  findReply,
} from "@/data/chat";

interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
}

// Kept outside the component: the React Compiler flags any Math.random()/
// Date.now() call found inside a component's function body, even ones that
// only ever run inside a setTimeout after a user action. Module-level plain
// functions aren't subject to that purity check.
let messageSeq = 0;
function createMessage(role: ChatMessage["role"], text: string): ChatMessage {
  messageSeq += 1;
  return { id: `${role}-${messageSeq}`, role, text };
}

function getTypingDelay() {
  return 550 + Math.random() * 400;
}

export function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "greeting",
      role: "bot",
      text: GREETING_MESSAGE,
    },
  ]);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  function pushMessage(role: ChatMessage["role"], text: string) {
    setMessages((prev) => [...prev, createMessage(role, text)]);
  }

  function respondTo(userText: string) {
    const reply = findReply(userText) ?? FALLBACK_REPLY;
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      pushMessage("bot", reply);
    }, getTypingDelay());
  }

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    pushMessage("user", trimmed);
    setInput("");
    respondTo(trimmed);
  }

  function handleQuickReply(label: string) {
    pushMessage("user", label);

    if (label === "Browse properties") {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        pushMessage("bot", "Here you go: /properties has all current listings.");
      }, 500);
      return;
    }
    if (label === "Browse projects") {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        pushMessage("bot", "Here you go: /projects has our developer projects.");
      }, 500);
      return;
    }
    if (label === "Talk to a human") {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        pushMessage("bot", "Tap the WhatsApp button below and an advisor will pick it up right away.");
      }, 500);
      return;
    }
    respondTo(label);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 flex h-[30rem] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-white/40 bg-background/70 shadow-2xl backdrop-blur-xl sm:w-96"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/50 bg-foreground/95 px-5 py-4 text-background backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-background/15">
                  <Bot className="size-4.5" />
                </span>
                <div>
                  <p className="text-sm font-medium">ListEasy Assistant</p>
                  <p className="flex items-center gap-1.5 text-xs text-background/70">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    Online
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="text-background/70 transition-colors hover:text-background"
              >
                <X className="size-4.5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-transparent to-muted/30 px-4 py-4"
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={cn(
                    "flex items-end gap-2",
                    message.role === "user" && "flex-row-reverse"
                  )}
                >
                  {message.role === "bot" && (
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                      <Bot className="size-3.5" />
                    </span>
                  )}
                  <div
                    className={cn(
                      "max-w-[78%] px-3.5 py-2.5 text-sm leading-5 shadow-sm",
                      message.role === "bot"
                        ? "rounded-2xl rounded-bl-sm border border-border/50 bg-background/90 text-foreground backdrop-blur"
                        : "rounded-2xl rounded-br-sm bg-foreground text-background"
                    )}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-end gap-2"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                    <Bot className="size-3.5" />
                  </span>
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-border/50 bg-background/90 px-3.5 py-3 backdrop-blur">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="size-1.5 rounded-full bg-muted-foreground"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick replies */}
            <div className="flex flex-wrap gap-2 border-t border-border/50 bg-background/70 px-4 py-3 backdrop-blur">
              {QUICK_REPLIES.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleQuickReply(label)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* WhatsApp handoff */}
            <a
              href={`https://wa.me/${SALES_WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="border-t border-border/50 bg-background/70 px-4 py-2 text-center text-xs text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
            >
              Prefer WhatsApp? Chat with an advisor →
            </a>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center gap-2 border-t border-border/50 bg-background/80 p-3 backdrop-blur"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="h-10 flex-1 rounded-full border border-border bg-background/80 px-4 text-sm text-foreground focus-visible:border-foreground focus-visible:outline-none"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim()}
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-transform disabled:opacity-40 enabled:hover:scale-105"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex size-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg"
      >
        {!open && (
          <motion.span
            className="absolute inset-0 rounded-full bg-foreground/40"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative flex items-center justify-center"
          >
            {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}