"use client";
import { createContext, useContext, useState } from "react";

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const showToast = (text, type = "info") => {
    const id = Date.now() + Math.random();
    console.log(`Toast: ${text}`);
    setMessages((prev) => [...prev, { id, text, type }]);
    setTimeout(() => setMessages((prev) => prev.filter((m) => m.id !== id)), 3000);
  };

  return <ToastCtx.Provider value={{ showToast, messages }}>{children}</ToastCtx.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
