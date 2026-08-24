import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Headphones,
  Bot,
  User,
  Truck,
  RotateCcw,
  Tag,
  CreditCard,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Clock,
  PhoneCall,
  ChevronRight,
  Smile
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const CustomerSupportModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const messagesEndRef = useRef(null);

  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'faqs'
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Namaste Rohan! 🙏 Welcome to Kiaan Customer Support. How can we help you today?',
      time: '10:30 AM',
    },
    {
      id: 2,
      sender: 'user',
      text: 'Hi, where is my order #ORD-82942? What time will it arrive?',
      time: '10:31 AM',
    },
    {
      id: 3,
      sender: 'agent',
      agentName: 'Pooja Sharma (Senior Support)',
      text: 'Hello Rohan! Your shipment with BlueDart (AWB #BD-992014) is currently Out for Delivery in Lokhandwala, Mumbai. It will reach your doorstep today between 2:00 PM – 4:00 PM. 🚚',
      time: '10:32 AM',
    },
    {
      id: 4,
      sender: 'user',
      text: 'Great! Also, if the Kurta size does not fit, can I exchange it for Size L?',
      time: '10:33 AM',
    },
    {
      id: 5,
      sender: 'agent',
      agentName: 'Pooja Sharma (Senior Support)',
      text: 'Absolutely! We offer 7-Day Hassle-Free doorstep pickup & instant size exchange at zero extra charge. You can raise a 1-click request right from your dashboard. ✨',
      time: '10:34 AM',
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    { text: 'Track my order #ORD-82942', type: 'track' },
    { text: 'How do I return / exchange?', type: 'return' },
    { text: 'Apply coupon code FESTIVE20', type: 'coupon' },
    { text: 'Refund status for cancelled item', type: 'refund' },
  ];

  const faqs = [
    {
      q: 'How long does standard delivery take?',
      a: 'Orders are dispatched within 24 hours. Metro deliveries take 1-2 days, while rest of India takes 3-4 days.',
    },
    {
      q: 'What is Kiaan 7-Day Return & Exchange Policy?',
      a: 'You can return or exchange any unworn clothing with tags intact within 7 days of delivery with free doorstep pickup.',
    },
    {
      q: 'When will I receive my refund for COD / UPI?',
      a: 'UPI and Card refunds are credited within 24-48 hours. For COD orders, refund is transferred to your bank account or Kiaan Wallet.',
    },
    {
      q: 'Are all products 100% genuine and original?',
      a: 'Yes, 100% authentic pure fabrics sourced directly from verified Indian weavers and manufacturers.',
    }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Simulate smart bot/agent reply
    setIsTyping(true);
    setTimeout(() => {
      let replyText = 'Thank you for contacting us! Our team is reviewing your query and will update you shortly.';

      const lower = text.toLowerCase();
      if (lower.includes('track') || lower.includes('order')) {
        replyText = '📦 Order #ORD-82942 is on vehicle with BlueDart courier. Expected delivery: Today by 4:00 PM. Delivery OTP will be sent to your phone.';
      } else if (lower.includes('return') || lower.includes('exchange')) {
        replyText = '🔄 Return/Exchange initiated! A courier pickup executive will collect the packet tomorrow between 10 AM - 1 PM. Keep the tag intact.';
      } else if (lower.includes('coupon') || lower.includes('discount')) {
        replyText = '🎉 Code "FESTIVE20" is active! You will get flat 20% OFF on all clothing items in your bag at checkout.';
      } else if (lower.includes('refund') || lower.includes('money')) {
        replyText = '💳 Your refund of ₹1,499 has been processed back to your UPI ID (rohan@okhdfcbank). UTR #REF-849201.';
      } else {
        replyText = `Thank you for your message! Senior Support Executive Pooja is on chat and resolving your query on priority.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'agent',
          agentName: 'Pooja Sharma (Senior Support)',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-left">
        {/* 1. Support Header */}
        <div className="p-4 sm:p-5 border-b border-[#E7E0F7] bg-[#F4F0FD] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#6C4DF6] to-[#8A6AF8] text-white flex items-center justify-center shadow-soft-sm">
                <Headphones className="w-5 h-5" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emeraldGreen-500 rounded-full ring-2 ring-white" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slateText-main">Kiaan 24x7 Help Desk</h3>
                <span className="px-2 py-0.5 rounded-full bg-emeraldGreen-100 text-emeraldGreen-800 text-[9px] font-black uppercase">
                  Online
                </span>
              </div>
              <p className="text-xs text-slateText-muted flex items-center gap-1">
                <Clock className="w-3 h-3 text-brand-500" /> Avg. response under 1 min • Ticket #SUP-8921
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center shadow-soft-sm transition-transform hover:scale-105"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Navigation Tabs (Live Chat & FAQs) */}
        <div className="flex border-b border-[#E7E0F7] bg-white px-4 shrink-0">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 text-xs font-black transition-all border-b-2 flex items-center justify-center gap-2 ${
              activeTab === 'chat'
                ? 'border-brand-500 text-brand-600 bg-brand-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Live Chat & Resolution</span>
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`flex-1 py-3 text-xs font-black transition-all border-b-2 flex items-center justify-center gap-2 ${
              activeTab === 'faqs'
                ? 'border-brand-500 text-brand-600 bg-brand-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Instant FAQs & Policy</span>
          </button>
        </div>

        {/* 3. Tab 1: Live Chat Conversation Area */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Quick Prompt Chips */}
            <div className="p-3 bg-[#F4F0FD]/60 border-b border-[#E7E0F7] overflow-x-auto flex gap-2 shrink-0 scrollbar-none">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(q.text)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#E4DAFA] text-slate-700 hover:text-brand-600 border border-[#E7E0F7] text-[11px] font-bold shrink-0 transition-all shadow-soft-sm flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-brand-500" />
                  <span>{q.text}</span>
                </button>
              ))}
            </div>

            {/* Messages Scroll View */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-slate-50/50">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {m.sender !== 'user' && m.agentName && (
                    <span className="text-[10px] font-black text-brand-600 mb-1 px-1 flex items-center gap-1">
                      <Headphones className="w-3 h-3" /> {m.agentName}
                    </span>
                  )}

                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#6C4DF6] text-white rounded-br-none shadow-purple-glow font-medium'
                        : 'bg-white text-slate-800 border border-[#E7E0F7] rounded-bl-none shadow-soft-sm font-normal'
                    }`}
                  >
                    <p>{m.text}</p>
                    <span
                      className={`block text-[9px] mt-1.5 text-right ${
                        m.sender === 'user' ? 'text-white/80' : 'text-slate-400'
                      }`}
                    >
                      {m.time}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-[#E7E0F7] max-w-[120px] shadow-soft-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce delay-100" />
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce delay-200" />
                  <span className="text-[10px] text-slate-400 font-bold ml-1">Typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 sm:p-4 bg-white border-t border-[#E7E0F7] flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                placeholder="Type your question (e.g. return order, track package, coupon)..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold outline-none focus:bg-white focus:border-brand-500"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center shadow-purple-glow transition-all hover:scale-105 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* 4. Tab 2: Instant FAQs & Self-Service Policies */}
        {activeTab === 'faqs' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="p-4 rounded-2xl bg-[#F4F0FD] border border-[#E7E0F7] space-y-2">
              <h4 className="text-xs font-black text-slateText-main flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-500" /> Need Immediate Assistance?
              </h4>
              <p className="text-xs text-slateText-muted">
                Our support team is available Mon-Sat 9 AM – 9 PM. You can also reach our helpline:
              </p>
              <div className="flex items-center gap-2 font-bold text-xs text-brand-600 pt-1">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>+91 1800-200-KIAAN (Toll Free)</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                Frequently Asked Questions
              </h4>

              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-[#E7E0F7] shadow-soft-sm space-y-1.5 hover:border-brand-300 transition-colors"
                >
                  <h5 className="text-xs font-black text-slateText-main flex items-start justify-between gap-2">
                    <span>{faq.q}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  </h5>
                  <p className="text-xs text-slateText-muted leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerSupportModal;
