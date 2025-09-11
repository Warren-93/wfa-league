"use client";
import { useToast } from "../hooks/useToast";

export default function Toast() {
  const { messages } = useToast();
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {messages.map((m) => (
        <div key={m.id} className="bg-brand-600 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-up">
          {m.text}
        </div>
      ))}
    </div>
  );
}
