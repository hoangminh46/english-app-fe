"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle, MoreVertical, Minus } from "lucide-react";
import { usePathname } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import apiClient from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";
import { useUI } from "@/contexts/UIContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Components for ReactMarkdown styling
const MarkdownComponents = {
  h1: ({ ...props }) => <h1 className="text-base font-bold text-blue-800 mt-5 mb-2.5 border-b-2 border-blue-100 pb-1" {...props} />,
  h2: ({ ...props }) => <h2 className="text-sm font-bold text-blue-700 mt-4 mb-1.5" {...props} />,
  h3: ({ ...props }) => <h3 className="text-[13px] font-bold text-blue-600 mt-3 mb-1" {...props} />,
  p: ({ ...props }) => <p className="mb-2.5 last:mb-0 leading-relaxed text-gray-800" {...props} />,
  ul: ({ ...props }) => <ul className="list-disc list-outside ml-5 mb-3.5 space-y-1.5 text-gray-800" {...props} />,
  ol: ({ ...props }) => <ol className="list-decimal list-outside ml-5 mb-3.5 space-y-1.5 text-gray-800" {...props} />,
  li: ({ ...props }) => <li className="pl-1 leading-relaxed [&>p]:mb-0 [&>p]:inline" {...props} />,
  strong: ({ ...props }) => <strong className="font-extrabold text-gray-900" {...props} />,
  em: ({ ...props }) => <em className="italic text-gray-600" {...props} />,
  blockquote: ({ ...props }) => (
    <blockquote className="border-l-4 border-blue-300 pl-3.5 py-1.5 my-3.5 bg-blue-50/50 rounded-r-xl italic text-gray-700 shadow-sm" {...props} />
  ),
  code: ({ ...props }) => (
    <code className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-md text-[12px] font-mono font-medium border border-blue-100/50" {...props} />
  ),
  pre: ({ ...props }) => (
    <pre className="inline-block w-full bg-slate-900 text-slate-100 p-4 rounded-xl my-4 overflow-x-auto text-[13px] font-mono leading-relaxed shadow-lg border border-slate-800" {...props} />
  ),
  table: ({ ...props }) => (
    <div className="my-4 overflow-x-auto rounded-xl border border-blue-100 shadow-md">
      <table className="min-w-full divide-y divide-blue-200 bg-white" {...props} />
    </div>
  ),
  thead: ({ ...props }) => <thead className="bg-blue-100/50" {...props} />,
  th: ({ ...props }) => <th className="px-2.5 py-2 text-left text-[11px] font-bold text-blue-900 uppercase tracking-wider border-b border-blue-100" {...props} />,
  td: ({ ...props }) => <td className="px-2.5 py-2 text-[12px] text-gray-700 border-b border-blue-50/50 min-w-[90px] leading-snug" {...props} />,
  tr: ({ ...props }) => <tr className="even:bg-blue-50/20 hover:bg-blue-50/40 transition-colors" {...props} />,
  hr: () => <hr className="my-6 border-t-2 border-blue-50/50" />,
};

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
}

export const FloatingAssistant: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { activeWidget, openWidget, closeWidget } = useUI();
  const isOpen = activeWidget === "assistant";
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Chào anh! Em là Mine đây. Anh cần em hỗ trợ gì về tiếng Anh hôm nay không ạ? ✨",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Helper to get quiz context from localStorage
  const getQuizContext = () => {
    if (pathname !== "/quiz") return null;
    
    try {
      const quizDataStr = localStorage.getItem("quizData");
      const quizProgressStr = localStorage.getItem("quizProgress");
      
      if (!quizDataStr) return null;
      
      const quizData = JSON.parse(quizDataStr);
      const quizProgress = quizProgressStr ? JSON.parse(quizProgressStr) : { currentQuestionIndex: 0 };
      
      const currentQuestion = quizData.questions[quizProgress.currentQuestionIndex];
      
      return {
        type: "quiz",
        data: {
          question: currentQuestion?.question,
          options: currentQuestion?.options,
          correctAnswer: currentQuestion?.correctAnswer,
          explanation: currentQuestion?.explanation,
        }
      };
    } catch (e) {
      console.error("Error reading quiz context:", e);
      return null;
    }
  };

  const quickPrompts = [
    { label: "Giải thích câu này", icon: "🤔" },
    { label: "Cảm ơn em nhé!", icon: "💖" },
  ];

  // No need for useEffect scroll anymore due to flex-col-reverse

  const handleSend = async (customMessage?: string) => {
    const textToSend = customMessage || inputValue;
    if (!textToSend.trim() || isTyping) return;

    const context = getQuizContext();
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!customMessage) setInputValue("");
    
    // Start typing
    setIsTyping(true);
    
    try {
      // Prepare history for API (excluding the current user message)
      const history = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await apiClient.post<{ success: boolean; data: { answer: string } }>(
        "/api/v1/chat/ask",
        {
          message: textToSend,
          context: context || { type: "general", data: {} },
          history: history
        }
      );
      
      if (response.data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.data.data.answer,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error("API responded with success: false");
      }
    } catch (error) {
      console.error("Chat API Error:", error);
      // Fallback message for user
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Hic, có chút lỗi kết nối rồi anh ơi. Anh thử lại giúp em nhé! 😿",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }

  };

  if (!isAuthenticated || authLoading) return null;

  return (
    <div className="fixed bottom-18 right-4 sm:bottom-28 sm:right-6 z-40 flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="mb-4 w-[380px] h-[70dvh] min-h-[400px] max-h-[calc(100dvh-120px)] sm:h-[620px] max-w-[calc(100vw-32px)] flex flex-col overflow-hidden bg-white/80 backdrop-blur-xl border border-blue-100 shadow-2xl rounded-[24px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 flex items-center justify-between shadow-lg relative z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                  <Image
                    src="/images/avatar.png"
                    alt="Mine Assistant"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold text-[16px] flex items-center gap-1.5">
                    Trợ lý Mine
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-blue-100 text-[11px] font-medium tracking-wide">Sẵn sàng giúp đỡ anh</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={closeWidget}
                  className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <Minus size={20} />
                </button>
                <button
                  onClick={closeWidget}
                  className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth flex flex-col-reverse"
            >
              {isTyping && (
                <div className="flex justify-start items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-200 shadow-sm">
                    <Image src="/images/avatar.png" alt="Mine" width={32} height={32} />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm border border-blue-50 shadow-sm flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
              
              {[...messages].reverse().map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.role === "assistant" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex w-full mb-1",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div className={cn(
                    "flex max-w-[85%] items-end gap-2",
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}>
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-200 flex-shrink-0 mb-1 shadow-sm">
                        <Image
                          src="/images/avatar.png"
                          alt="Mine"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className={cn(
                      "px-4 py-2.5 shadow-sm text-[14px] leading-relaxed overflow-hidden",
                      msg.role === "assistant" 
                        ? "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-blue-50" 
                        : "bg-blue-600 text-white rounded-2xl rounded-br-sm shadow-blue-100"
                    )}>
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={msg.role === "assistant" ? MarkdownComponents : {
                          p: ({ ...props }) => <p className="mb-0 leading-relaxed" {...props} />,
                        }}
                      >
                        {msg.content
                          // Đảm bảo Table luôn có dòng trống phía trước để Markdown có thể parse
                          .replace(/([^\n])(\n\|)/g, '$1\n\n|')
                          // Đảm bảo Headers luôn có dòng trống phía trước
                          .replace(/([^\n])(\n#)/g, '$1\n\n#')
                          // Đảm bảo Lists luôn có dòng trống phía trước
                          .replace(/([^\n])(\n[-*]\s)/g, '$1\n\n$2')
                          // Xóa các từ thừa như 'text' trong code block mà AI thường thêm vào
                          .replace(/^text\s?/gm, '')
                        }
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
              
            {/* Removed duplicate isTyping block here */}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-blue-50">
              {/* Quick Prompts */}
              <div className="flex flex-wrap gap-2 mb-4">
                {quickPrompts.map((prompt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend(prompt.label)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full text-[13px] font-medium transition-colors border border-blue-100"
                  >
                    <span>{prompt.icon}</span>
                    {prompt.label}
                  </motion.button>
                ))}
              </div>

              <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-inner border border-gray-100 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Gửi tin nhắn cho Mine..."
                  className="flex-1 bg-transparent border-none focus:outline-none px-2 text-[14px] text-gray-700 placeholder:text-gray-400"
                />
                <button
                  onClick={() => handleSend()}
                  className={cn(
                    "p-2 rounded-xl transition-all",
                    inputValue.trim() 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200 transform scale-100" 
                      : "bg-gray-200 text-gray-400 scale-95 cursor-not-allowed"
                  )}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => isOpen ? closeWidget() : openWidget("assistant")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-2xl relative overflow-hidden transition-all duration-300",
          isOpen ? "ring-4 ring-blue-100 rotate-12" : "hover:ring-4 hover:ring-blue-50"
        )}
      >
        <Image
          src="/images/avatar.png"
          alt="Chat with Mine"
          fill
          className="object-cover"
        />
      </motion.button>
    </div>
  );
};
