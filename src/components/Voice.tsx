/* eslint-disable @typescript-eslint/no-explicit-any */
import { Payment } from "@/types";
import { useState, useEffect } from "react";

interface VoiceAssistantProps {
    visibleUpdatePayment: boolean;
    setVisibleUpdatePayment: (visible: boolean) => void;
    paymentEdit?: Payment;
    setPaymentEdit: (visible: Payment) => void;
}

export default function VoiceAssistant({visibleUpdatePayment, setVisibleUpdatePayment, paymentEdit, setPaymentEdit}: VoiceAssistantProps) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support Speech Recognition");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    // recognition.lang = "en-US";
    recognition.lang = "es-ES";

    recognition.onresult = (event: any) => {
      const text = event.results[event.results.length - 1][0].transcript.trim();
      setTranscript(text);
      handleCommand(text);
    };

    if (listening) recognition.start();
    else recognition.stop();

    return () => recognition.stop();
  }, [listening]);

  useEffect(() => {
    if(transcript === "update payment" || transcript === "crear pago"){
      setVisibleUpdatePayment(true)
    }
    if(visibleUpdatePayment){
      if(transcript.includes(`ID deuda`)){
        const id_debt = transcript.replace("ID deuda ", "")
        setPaymentEdit({...paymentEdit, id_debt} as Payment)
      }
      if(transcript.includes(`cantidad`)){
        const amount = Number(transcript.replace("cantidad ", ""))
        setPaymentEdit({...paymentEdit, amount} as Payment)
      }
      if(transcript.includes(`dólar Google`)){
        const dolar_google = Number(transcript.replace("dólar Google ", ""))
        setPaymentEdit({...paymentEdit, dolar_google} as Payment)
      }
    }
  }, [transcript]);

  const handleCommand = (text: string) => {
    if (text.toLowerCase().includes("open users")) {
      speak("Opening users section");
      // e.g. navigate("/users");
    }
    if (text.toLowerCase().includes("delete user")) {
      speak("Please confirm which user");
    }
  };

  const speak = (text: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    speechSynthesis.speak(utter);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setListening(!listening)}
        className="bg-blue-600 text-white p-2 rounded"
      >
        {listening ? "Stop Listening" : "Start Listening"}
      </button>
      <p className="mt-4 text-gray-800">Heard: {transcript}</p>
    </div>
  );
}