import React from 'react';
import { Quote } from 'lucide-react';

export interface Testimonial {
  id: number;
  name: string;
  role: string; // e.g., "BSc Business at Uni of Bolton"
  quote: string;
  image?: string;
}

interface TestimonialSectionProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  className?: string;
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({ 
  title = "Student Success Stories", 
  subtitle = "Don't just take our word for it. Hear from students we've helped.",
  testimonials,
  className = ""
}) => {
  return (
    <section className={`py-20 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-mcki-blue">{title}</h2>
          <p className="text-mcki-muted mt-4 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-mcki-grey p-8 rounded-xl relative hover:shadow-lg transition-shadow duration-300">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-mcki-gold opacity-30" />
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={t.image || `https://ui-avatars.com/api/?name=${t.name}&background=1F4FA3&color=fff`} 
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-mcki-gold"
                />
                <div>
                  <h4 className="font-bold text-mcki-blue">{t.name}</h4>
                  <p className="text-xs text-mcki-muted font-medium uppercase tracking-wide">{t.role}</p>
                </div>
              </div>
              
              <p className="text-mcki-text text-sm leading-relaxed italic">
                "{t.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};