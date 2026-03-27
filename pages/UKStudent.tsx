import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { TestimonialSection } from '../components/TestimonialSection';
import { CheckCircle, AlertCircle } from 'lucide-react';

export const UKStudent: React.FC = () => {
  const navigate = useNavigate();

  const testimonials = [
    {
      id: 1,
      name: "Michael Thompson",
      role: "HND Construction",
      quote: "I needed a qualification to move up to site manager. MCKI found me a course that ran on weekends.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      id: 2,
      name: "Lisa Wong",
      role: "BA Business Top-Up",
      quote: "After my HND, I wasn't sure how to finish my degree. They guided me through the top-up process smoothly.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150"
    }
  ];

  return (
    <div className="min-h-screen bg-mcki-grey">
      {/* UK Hero */}
      <section className="bg-gradient-to-r from-mcki-blue to-blue-800 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 rounded-full bg-mcki-gold/20 border border-mcki-gold text-mcki-gold text-sm font-semibold mb-4">
            For UK & EU Residents
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Advance Your Career with Higher Education
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mb-8">
            Access HND, HNC, and Bachelor degrees with flexible schedules. We guide you through the entire application process.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => navigate('/eligibility')}>Check Eligibility</Button>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-mcki-blue" onClick={() => navigate('/book')}>
              Book Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-12">
          
          <div className="md:col-span-2 space-y-12">
            
            {/* Eligibility Box */}
            <div className="bg-blue-50 border-l-4 border-mcki-gold p-6 rounded-r-lg">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-mcki-gold shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-mcki-blue mb-2">Eligibility Guidance</h3>
                  <p className="text-mcki-text mb-2">
                    Many courses have funding options available for eligible UK residents. Eligibility depends on residency status, previous education, and current employment.
                  </p>
                  <p className="text-xs text-mcki-muted italic">
                    *We do not provide financial advice. All funding is subject to Student Finance England (SFE) approval.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-mcki-blue mb-6">Available Courses</h2>
              <ul className="space-y-4">
                {['HND Business Management', 'HND Health & Social Care', 'BSc (Hons) Business Management', 'BA (Hons) Health & Social Care'].map((course) => (
                  <li key={course} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                    <CheckCircle className="text-mcki-gold w-5 h-5" />
                    <span className="font-medium text-mcki-text">{course}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
               <h2 className="text-2xl font-heading font-bold text-mcki-blue mb-6">Why Study Now?</h2>
               <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                     <h4 className="font-bold mb-2">Career Progression</h4>
                     <p className="text-sm text-mcki-muted">Unlock higher paying roles and management positions with a degree.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                     <h4 className="font-bold mb-2">Flexible Learning</h4>
                     <p className="text-sm text-mcki-muted">Many partners offer 2-day-a-week schedules to fit around work.</p>
                  </div>
               </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24">
              <h3 className="text-xl font-bold text-mcki-blue mb-4">Ready to start?</h3>
              <p className="text-sm text-mcki-muted mb-6">
                Take our quick pre-check to see if you likely qualify for current intakes.
              </p>
              <Button fullWidth onClick={() => navigate('/eligibility')}>Check Now</Button>
              <div className="mt-4 text-center">
                 <p className="text-sm text-mcki-muted">Prefer to talk?</p>
                 <a href="tel:+44123456789" className="text-mcki-blue font-bold hover:underline">Call Us Today</a>
              </div>
            </div>
          </div>

        </div>
      </section>

      <TestimonialSection 
        title="Local Student Success" 
        subtitle="See how we've helped students in London, Birmingham, and Manchester."
        testimonials={testimonials} 
      />
    </div>
  );
};