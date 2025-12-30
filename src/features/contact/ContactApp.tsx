import React, { useState } from 'react';
import { Mail, Send, Linkedin, Globe, CheckCircle } from 'lucide-react';

const ContactApp: React.FC = () => {
  const [isSent, setIsSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const openMailClient = () => {
    const subject = `Portfolio contact from ${name || 'Visitor'}`;
    const body = `${message}\n\nFrom: ${name || 'Visitor'} <${email || 'n/a'}>`;
    const mailto = `mailto:jun.cho00117@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openMailClient();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-8">
      {/* Contact Info Side */}
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Get in Touch</h1>
          <p className="text-white/60">
            Open to opportunities in Software Engineering, Machine Learning, and MLOps. Based in Toronto, ON.
          </p>
        </div>

        <div className="space-y-4">
          <ContactLink icon={Mail} title="Email" value="jun.cho00117@gmail.com" href="mailto:jun.cho00117@gmail.com" />
          <ContactLink icon={Linkedin} title="LinkedIn" value="linkedin.com/in/junghooncho117" href="https://www.linkedin.com/in/junghooncho117" />
          {/* Using McGill or Portfolio URL as placeholder since website wasn't explicitly in resume text besides linkedin */}
          <ContactLink icon={Globe} title="Location" value="Toronto, Ontario" />
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 bg-white/5 p-6 rounded-2xl border border-white/10">
        {isSent ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white">Message Sent!</h3>
            <p className="text-white/60">I'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                placeholder="Recruiter / Visitor Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                placeholder="visitor@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Message</label>
              <textarea 
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
                placeholder="Hi Junghoon, I'd like to discuss a potential role..."
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-white text-black font-medium py-2.5 rounded-lg hover:bg-white/90 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Send Message</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const ContactLink: React.FC<{ icon: any; title: string; value: string; href?: string }> = ({ icon: Icon, title, value, href }) => {
  const content = (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all cursor-pointer group">
      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-xs text-white/40 font-medium uppercase tracking-wider">{title}</p>
        <p className="text-white/90">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
};

export default ContactApp;
