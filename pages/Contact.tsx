import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '../components/Button';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
        setSubmitted(false);
        alert("Message sent! We'll get back to you shortly.");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
       <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-heading font-bold text-mcki-blue mb-8 text-center">Get in Touch</h1>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
             <div className="text-center p-6 bg-blue-50 rounded-lg hover:shadow-md transition-shadow">
                <Phone className="w-8 h-8 text-mcki-gold mx-auto mb-3" />
                <h3 className="font-bold mb-1">Phone</h3>
                <a href="tel:+442012345678" className="text-mcki-muted text-sm hover:text-mcki-blue transition-colors">+44 20 1234 5678</a>
             </div>
             <div className="text-center p-6 bg-blue-50 rounded-lg hover:shadow-md transition-shadow">
                <Mail className="w-8 h-8 text-mcki-gold mx-auto mb-3" />
                <h3 className="font-bold mb-1">Email</h3>
                <a href="mailto:admissions@mcki.com" className="text-mcki-muted text-sm hover:text-mcki-blue transition-colors">admissions@mcki.com</a>
             </div>
             <div className="text-center p-6 bg-blue-50 rounded-lg hover:shadow-md transition-shadow">
                <MapPin className="w-8 h-8 text-mcki-gold mx-auto mb-3" />
                <h3 className="font-bold mb-1">Office</h3>
                <p className="text-mcki-muted text-sm">123 Education Lane, London</p>
             </div>
          </div>

          <div className="bg-mcki-grey p-8 rounded-xl shadow-inner">
             <h2 className="text-xl font-bold text-mcki-blue mb-6">Send us a message</h2>
             <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                   <input required placeholder="Name" className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-mcki-blue focus:outline-none" />
                   <input placeholder="Phone" className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-mcki-blue focus:outline-none" />
                </div>
                <input required type="email" placeholder="Email" className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-mcki-blue focus:outline-none" />
                <textarea required placeholder="How can we help?" rows={4} className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-mcki-blue focus:outline-none"></textarea>
                <Button type="submit" disabled={submitted} fullWidth={false} className="w-full md:w-auto">
                    {submitted ? "Sending..." : "Send Message"}
                </Button>
             </form>
          </div>
       </div>
    </div>
  );
};