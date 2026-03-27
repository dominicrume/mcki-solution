import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { TestimonialSection } from '../components/TestimonialSection';
import { ArrowRight, BookOpen, CheckCircle, Globe, Users } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const testimonials = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "HND Business Student",
      quote: "I didn't think I could go back to education while working. MCKI showed me the 2-day schedule options and helped with the finance application.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      id: 2,
      name: "Ahmed Al-Fayed",
      role: "MSc Management",
      quote: "The visa guidance was critical. They checked every document before I submitted, and I got my CAS without any delays.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      id: 3,
      name: "Elena Popova",
      role: "BSc Health & Social Care",
      quote: "Very professional team. They were honest about my eligibility from the start and didn't make false promises.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-mcki-blue overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-mcki-blue to-blue-900 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
              Your Gateway to Higher Education <span className="text-mcki-gold italic">Success</span>
            </h1>
            <p className="text-lg text-gray-200 max-w-lg">
              Expert guidance for UK, EU, and International students. We simplify the admissions process so you can focus on your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={() => navigate('/apply')}>Start Application</Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-mcki-blue" onClick={() => navigate('/book')}>
                Book Free Call
              </Button>
            </div>
            <p className="text-xs text-gray-400 pt-2">*Subject to eligibility & T&Cs apply</p>
          </div>
          <div className="hidden md:block relative">
             <img 
               src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600&h=400" 
               alt="University Campus Life" 
               className="rounded-lg shadow-2xl border-4 border-white/10"
             />
             <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="text-green-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-mcki-text">95% Satisfaction</p>
                    <p className="text-xs text-mcki-muted">From supported students</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Segmentation Section */}
      <section className="py-20 bg-mcki-grey relative -mt-10 z-10 rounded-t-[2.5rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-mcki-blue">Choose Your Path</h2>
            <p className="text-mcki-muted mt-4">Select the option that best describes you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* UK Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-transparent hover:border-mcki-gold transition-all duration-300 group cursor-pointer" onClick={() => navigate('/uk')}>
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-mcki-gold/10 transition-colors">
                <Users className="w-8 h-8 text-mcki-blue group-hover:text-mcki-gold" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-mcki-text mb-3">UK & EU Students</h3>
              <p className="text-mcki-muted mb-6">
                Already in the UK? Explore HND/HNC and Bachelor degree options with guided funding support advice.
              </p>
              <span className="text-mcki-blue font-semibold flex items-center gap-2 group-hover:text-mcki-gold">
                View UK Options <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            {/* International Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-transparent hover:border-mcki-gold transition-all duration-300 group cursor-pointer" onClick={() => navigate('/international')}>
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-mcki-gold/10 transition-colors">
                <Globe className="w-8 h-8 text-mcki-blue group-hover:text-mcki-gold" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-mcki-text mb-3">International Students</h3>
              <p className="text-mcki-muted mb-6">
                Applying from abroad? Get full visa guidance, document checks, and interview preparation.
              </p>
              <span className="text-mcki-blue font-semibold flex items-center gap-2 group-hover:text-mcki-gold">
                View Global Options <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
             <div className="text-center p-6">
               <div className="inline-flex p-4 rounded-full bg-blue-50 text-mcki-blue mb-4">
                 <BookOpen className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold mb-2">Course Consultation</h3>
               <p className="text-mcki-muted">Find the right course that matches your career goals and academic background.</p>
             </div>
             <div className="text-center p-6">
               <div className="inline-flex p-4 rounded-full bg-blue-50 text-mcki-blue mb-4">
                 <CheckCircle className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold mb-2">Document Review</h3>
               <p className="text-mcki-muted">We check your personal statements and CVs to ensure they meet university standards.</p>
             </div>
             <div className="text-center p-6">
               <div className="inline-flex p-4 rounded-full bg-blue-50 text-mcki-blue mb-4">
                 <Users className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold mb-2">Interview Prep</h3>
               <p className="text-mcki-muted">Mock interviews and guidance to help you pass credibility interviews with confidence.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection testimonials={testimonials} className="bg-mcki-grey/30" />

      {/* How it Works */}
      <section className="py-20 bg-mcki-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-center text-mcki-blue mb-16">How It Works</h2>
          
          <div className="hidden md:flex justify-between items-center relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-0 -translate-y-1/2"></div>
            
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="relative z-10 bg-mcki-grey px-4 text-center">
                <div className="w-12 h-12 bg-mcki-gold text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg">
                  {step}
                </div>
                <h4 className="font-bold text-mcki-blue">
                  {step === 1 ? 'Check Eligibility' : step === 2 ? 'Consultation' : step === 3 ? 'Submit Docs' : 'Get Offer'}
                </h4>
              </div>
            ))}
          </div>

          <div className="md:hidden space-y-8">
             {[
               { s: 1, t: 'Check Eligibility', d: 'Fill out our quick intake form.' },
               { s: 2, t: 'Consultation', d: 'Speak with an expert advisor.' },
               { s: 3, t: 'Submit Docs', d: 'We help you prepare your application.' },
               { s: 4, t: 'Get Offer', d: 'Receive your university offer.' }
             ].map((item) => (
               <div key={item.s} className="flex gap-4 items-start">
                 <div className="w-10 h-10 bg-mcki-gold text-white rounded-full flex items-center justify-center font-bold shrink-0">
                   {item.s}
                 </div>
                 <div>
                   <h4 className="font-bold text-mcki-blue text-lg">{item.t}</h4>
                   <p className="text-mcki-muted text-sm">{item.d}</p>
                 </div>
               </div>
             ))}
          </div>

          <div className="mt-16 text-center">
            <Button onClick={() => navigate('/apply')} className="px-12">Start Your Journey</Button>
          </div>
        </div>
      </section>
    </div>
  );
};