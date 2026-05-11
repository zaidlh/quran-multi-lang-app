"use client";

import { useState, useRef, useEffect } from "react";
import { useUILanguage } from "./UILanguageProvider";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface AIAssistantProps {
  surahNumber?: number;
  ayahNumber?: number;
}

// Simulated Quran knowledge base (in production, use RAG with embeddings)
const QURAN_KNOWLEDGE: Record<string, { ar: string; en: string }> = {
  "1": {
    ar: "الحمد لله رب العالمين",
    en: "All praise is due to Allah, Lord of the worlds",
  },
  patience: {
    ar: "إنما الصابرون في apertures الشدة",
    en: "Indeed, the patient will be given their reward without measure",
  },
  mercy: {
    ar: "ورحمتي وسعت كل شيء",
    en: "My mercy encompasses all things",
  },
};

const SURAH_SUMMARIES: Record<number, { name: string; summary: string; theme: string }> = {
  1: {
    name: "Al-Fatiha",
    summary: "The Opening - A prayer for guidance and praise to Allah",
    theme: "Guidance and praise",
  },
  2: {
    name: "Al-Baqarah",
    summary: "The Cow - The longest surah, covering faith, law, and community",
    theme: "Faith and law",
  },
  36: {
    name: "Ya-Sin",
    summary: "A central surah emphasizing Allah's signs and the Quran's truth",
    theme: "Signs of Allah",
  },
  67: {
    name: "Al-Mulk",
    summary: "The Dominion - Allah's sovereignty over creation",
    theme: "Divine sovereignty",
  },
  112: {
    name: "Al-Ikhlas",
    summary: "Sincerity - Allah's oneness",
    theme: "Tawhid (Divine Unity)",
  },
};

export function AIAssistant({ surahNumber, ayahNumber }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, uiLang, dir } = useUILanguage();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    const query = userMessage.toLowerCase();

    // Handle specific surah questions
    if (surahNumber) {
      const summary = SURAH_SUMMARIES[surahNumber];
      if (summary) {
        if (query.includes("summary") || query.includes("about")) {
          return `${summary.summary}\n\nTheme: ${summary.theme}`;
        }
        if (query.includes("explain") || query.includes("meaning")) {
          return `Surah ${summary.name} addresses ${summary.theme}. It calls believers to reflect on Allah's signs and live according to His guidance.`;
        }
      }
    }

    // Handle verse-specific questions
    if (surahNumber && ayahNumber) {
      if (query.includes("tafsir") || query.includes("explain")) {
        return `Regarding this verse, classical scholars explain that it emphasizes the importance of remembrance and gratitude. The context was revealed during a time when the Prophet (peace be upon him) and his companions faced difficulties.`;
      }
    }

    // Handle thematic searches
    if (query.includes("patience")) {
      return `The Quran emphasizes patience extensively. Key verses include:\n\n• Surah Al-Baqarah 2:153 - "O you who have believed, seek help through patience and prayer"\n\n• Surah Al-An'am 6:34 - "Indeed, those patient upon distress"\n\nThe concept of Sabr (patience) in Islam is not passive endurance but active perseverance in faith.`;
    }

    if (query.includes("mercy") || query.includes("رحم")) {
      return `Allah's mercy is a central theme in the Quran. Key verses include:\n\n• Surah Al-A'raf 7:156 - "My mercy encompasses all things"\n\n• Surah Al-Anbya 21:107 - "We have not sent you except as a mercy to the worlds"\n\n\nAllah's mercy precedes His wrath, and believers are encouraged to show mercy to others.`;
    }

    if (query.includes("prophet") || query.includes("نبي")) {
      return `The Quran mentions 25 prophets by name, including Adam, Noah, Abraham, Moses, Jesus, and Muhammad (peace be upon them all). Each was sent as a messenger to guide their people. Common themes include: monotheism, moral conduct, and submission to Allah.`;
    }

    if (query.includes("jannah") || query.includes("paradise") || query.includes("جنة")) {
      return `Jannah (Paradise) is described in the Quran as a place of eternal bliss:\n\n• No sorrow or grief (35:34)\n\n• Gardens and rivers (2:25)\n\n• Close to Allah's presence (9:72)\n\n\nEntry is granted by faith, good deeds, and Allah's mercy.`;
    }

    if (query.includes("halaal") || query.includes("haram")) {
      return `The Quran establishes clear guidelines for halal (permissible) and haram (forbidden):\n\n• Pork and alcohol are explicitly forbidden\n\n• Interest (riba) is prohibited\n\n• Murder and adultery are major sins\n\nThe principle is that everything is halal unless explicitly made haram.`;
    }

    if (query.includes("quran") || query.includes("قرآن")) {
      return `The Quran is Allah's final revelation, revealed in Arabic over 23 years. It contains 114 surahs and approximately 6,236 verses. Key purposes:\n\n• Guidance for humanity\n\n• Clear evidence of the truth\n\n• Mercy and healing\n\n• Warning and good news`;
    }

    // Default responses
    if (query.includes("hello") || query.includes("hi") || query.includes("السلام")) {
      return uiLang === "ar"
        ? "السلام عليكم! كيف يمكنني مساعدتك في فهم القرآن اليوم؟"
        : "Peace be upon you! How can I help you understand the Quran today?";
    }

    if (query.includes("help") || query.includes("مساعدة")) {
      return uiLang === "ar"
        ? "يمكنني مساعدتك في:\n\n• تفسير الآيات\n• شرح معاني_words\n• تلخيص السور\n• المواضيع القرآنية\n• القصص القرآني\n• أسئلة حول الإيمان\n\nما الذي تريد معرفته؟"
        : "I can help you with:\n\n• Verse explanations\n• Word meanings\n• Surah summaries\n• Quranic themes\n• Islamic stories\n• Faith questions\n\nWhat would you like to know?";
    }

    // Fallback
    return uiLang === "ar"
      ? "شكراً لسؤالك. هذا موضوع深入的 يمكنك أولاً trying to rephrase your question, or ask about:\n\n• آية eller versspecific\n• Surah summary\n• Quranic theme\n• Islamic concept"
      : "Thank you for your question. This is a deep topic. You could try rephrasing or ask about:\n\n• Specific verses\n• Surah summaries\n• Quranic themes\n• Islamic concepts";
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: inputValue,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await generateResponse(inputValue);
      const assistantMessage: Message = {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 lg:bottom-4 lg:right-20 z-40 w-14 h-14 rounded-full bg-primary-container text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        aria-label={uiLang === "ar" ? "المساعد الذكي" : "AI Assistant"}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 lg:items-center lg:justify-end lg:p-8 pointer-events-none">
          <div className="absolute inset-0 bg-black/20 lg:bg-transparent" onClick={() => setIsOpen(false)} />

          <div
            className={`relative w-full max-w-md h-[70vh] lg:h-[600px] bg-surface-container-lowest rounded-3xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto ${
              dir === "rtl" ? "lg:ml-auto" : "lg:mr-auto"
            }`}
            style={{ animation: "slideUp 0.3s ease-out" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/20 bg-surface-container">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-on-surface">
                    {uiLang === "ar" ? "المساعد القرآني" : "Quran Assistant"}
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    {uiLang === "ar"
                      ? "اسأل عن القرآن والإسلام"
                      : "Ask about the Quran & Islam"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors"
                aria-label={uiLang === "ar" ? "إغلاق" : "Close"}
              >
                <svg
                  className="w-5 h-5 text-on-surface-variant"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-on-surface-variant">
                    {uiLang === "ar"
                      ? "اسأل أي سؤال عن القرآن"
                      : "Ask any question about the Quran"}
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {[
                      uiLang === "ar"
                        ? ["ما معنى...", "تلخص سورة...", "آيات عن...", "شرح..."]
                        : ["What does...", "Summarize...", "Verses about...", "Explain..."],
                    ][0].map((example, i) => (
                      <button
                        key={i}
                        onClick={() => setInputValue(example)}
                        className="px-3 py-1.5 text-xs bg-surface-container rounded-full hover:bg-primary-fixed/20 transition-colors text-on-surface-variant"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "user"
                      ? dir === "rtl"
                        ? "justify-end"
                        : "justify-end"
                      : dir === "rtl"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-primary-container text-white rounded-br-md"
                        : "bg-surface-container rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-surface-container px-4 py-2.5 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce" />
                      <span
                        className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <span
                        className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-outline-variant/20 bg-surface-container">
              <div className="flex items-end gap-2">
                <div className="flex-1 relative">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      uiLang === "ar"
                        ? "اكتب سؤالك..."
                        : "Ask a question..."
                    }
                    className="w-full px-4 py-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 text-sm resize-none focus:outline-none focus:border-primary-container"
                    rows={1}
                    style={{ maxHeight: "100px" }}
                  />
                </div>
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-10 h-10 flex-shrink-0 rounded-full bg-primary-container text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-11"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}