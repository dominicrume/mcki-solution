import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { TestimonialSection } from '../components/TestimonialSection';
import { Globe, BookOpen, FileCheck, MessageCircle } from 'lucide-react';

export const International: React.FC = () => {
  const navigate = useNavigate();

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "MSc Data Science",
      quote: "The interview preparation was a lifesaver. The mock questions were exactly what the university asked me.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      id: 2,
      name: "Oluwaseun Adebayo",
      role: "MBA International",
      quote: "MCKI helped me sort through the confusion of different university requirements. Highly recommended for Nigerian students.",
      image: "https://images.unsplash.com/photo-1531384441138-2736e62e0f19?auto=format&fit=crop&q=80&w=150&h=150"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-white pt-16 pb-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="inline-flex items-center gap-2 text-mcki-blue font-semibold mb-4 bg-blue-50 px-4 py-1 rounded-full">
             <Globe className="w-4 h-4" /> Global Admissions
           </div>
           <h1 className="text-4xl md:text-6xl font-heading font-bold text-mcki-blue mb-6">
             Study in the <span className="border-b-4 border-mcki-gold">UK & Europe</span>
           </h1>
           <p className="text-xl text-mcki-muted max-w-2xl mx-auto mb-10">
             We help international students navigate complex admissions, visa compliance, and university selection with confidence.
           </p>
           <Button onClick={() => navigate('/apply')} className="px-10 py-4 text-lg shadow-xl shadow-orange-200">
             Start Free Assessment
           </Button>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-mcki-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Globe, title: "University Selection", desc: "Matched to your budget & goals." },
                { icon: FileCheck, title: "Document Check", desc: "Ensure your CAS isn't rejected." },
                { icon: MessageCircle, title: "Interview Prep", desc: "Mock interviews for credibility tests." },
                { icon: BookOpen, title: "Visa Guidance", desc: "Step-by-step application support." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-mcki-blue transition-colors">
                   <item.icon className="w-10 h-10 text-mcki-gold mb-4" />
                   <h3 className="font-bold text-lg text-mcki-text mb-2">{item.title}</h3>
                   <p className="text-sm text-mcki-muted">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Readiness Card */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-mcki-blue rounded-2xl overflow-hidden shadow-2xl grid md:grid-cols-2">
              <div className="p-10 md:p-16 text-white flex flex-col justify-center">
                 <h2 className="text-3xl font-heading font-bold mb-4">Admission Readiness Score</h2>
                 <p className="text-blue-200 mb-8">
                   Unsure if you qualify? Our smart assessment checks your academic background and English proficiency against university requirements.
                 </p>
                 <div className="w-full bg-blue-900 rounded-full h-2 mb-2">
                    <div className="bg-mcki-gold h-2 rounded-full w-3/4"></div>
                 </div>
                 <p className="text-xs text-mcki-gold mb-8">75% of applicants increase their acceptance chance with us.</p>
                 <Button onClick={() => navigate('/apply')} className="self-start">Check My Score</Button>
              </div>
              <div className="hidden md:block relative h-full min-h-[400px]">
                 <img 
                   src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800&h=800" 
                   alt="International Students Group" 
                   className="absolute inset-0 w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-blue-900/30"></div>
              </div>
           </div>
        </div>
      </section>

      <TestimonialSection 
        title="Global Student Success" 
        subtitle="From applications to arrival, here's what our students say."
        testimonials={testimonials} 
      />
    </div>
  );
};