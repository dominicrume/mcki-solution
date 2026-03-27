import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { StudentType } from '../types';
import { Check, ChevronRight, User, MapPin, Book, FileText } from 'lucide-react';
import { CountrySelect } from '../components/CountrySelect';

export const IntakeForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [type, setType] = useState<StudentType | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTypeSelect = (selectedType: StudentType) => {
    setType(selectedType);
    setStep(1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (value: string) => {
    setFormData({ ...formData, country: value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Application submitted! We will contact you shortly.");
      navigate('/');
    }, 2000);
  };

  // Step 0: Selector
  if (step === 0) {
    return (
      <div className="min-h-screen bg-mcki-grey py-20 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-heading font-bold text-mcki-blue mb-4">Let's Get Started</h1>
          <p className="text-mcki-muted">To provide the best advice, please tell us where you are currently based.</p>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <button 
            onClick={() => handleTypeSelect(StudentType.UK)}
            className="bg-white p-10 rounded-xl shadow-md hover:shadow-xl hover:ring-2 hover:ring-mcki-gold transition-all text-left group"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-mcki-gold group-hover:text-white transition-colors">
               <User className="w-6 h-6 text-mcki-blue group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-mcki-blue mb-2">UK/EU Student</h3>
            <p className="text-sm text-mcki-muted">I live in the UK or EU and want to explore study options here.</p>
          </button>
          
          <button 
             onClick={() => handleTypeSelect(StudentType.INTERNATIONAL)}
             className="bg-white p-10 rounded-xl shadow-md hover:shadow-xl hover:ring-2 hover:ring-mcki-gold transition-all text-left group"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-mcki-gold group-hover:text-white transition-colors">
               <MapPin className="w-6 h-6 text-mcki-blue group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-mcki-blue mb-2">International Student</h3>
            <p className="text-sm text-mcki-muted">I live outside the UK/EU and need a visa to study abroad.</p>
          </button>
        </div>
      </div>
    );
  }

  // Common Layout for Steps
  return (
    <div className="min-h-screen bg-mcki-grey py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-semibold text-mcki-muted mb-2 uppercase tracking-wider">
            <span>Details</span>
            <span>Education</span>
            <span>Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-mcki-gold transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            
            {/* STEP 1: Personal Details */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-bold text-mcki-blue">Personal Details</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-mcki-gold">*</span></label>
                    <input required name="firstName" onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-mcki-blue focus:border-mcki-blue" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-mcki-gold">*</span></label>
                    <input required name="lastName" onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-mcki-blue focus:border-mcki-blue" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-mcki-gold">*</span></label>
                  <input required type="email" name="email" onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-mcki-blue focus:border-mcki-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-mcki-gold">*</span></label>
                  <input required type="tel" name="phone" onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-mcki-blue focus:border-mcki-blue" />
                </div>
                {type === StudentType.INTERNATIONAL && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country of Residence <span className="text-mcki-gold">*</span></label>
                    <CountrySelect 
                      value={formData.country || ''} 
                      onChange={handleCountryChange} 
                      required 
                    />
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: Education */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-bold text-mcki-blue">Education & Goals</h2>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Highest Qualification</label>
                   <select name="qualification" onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md">
                     <option value="">Select...</option>
                     <option value="highschool">High School / A-Levels</option>
                     <option value="bachelor">Bachelor's Degree</option>
                     <option value="master">Master's Degree</option>
                     <option value="other">Other</option>
                   </select>
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Interested Course Field</label>
                   <select name="courseInterest" onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md">
                     <option value="">Select...</option>
                     <option value="business">Business & Management</option>
                     <option value="health">Health & Social Care</option>
                     <option value="computing">Computing & IT</option>
                     <option value="law">Law</option>
                   </select>
                </div>
                {type === StudentType.INTERNATIONAL && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">English Proficiency (IELTS/PTE)</label>
                    <select name="english" onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md">
                      <option value="">Not taken yet</option>
                      <option value="passed">Passed</option>
                      <option value="booked">Booked</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Final */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-bold text-mcki-blue">Final Check</h2>
                <div className="bg-blue-50 p-4 rounded-md text-sm text-mcki-blue">
                   <p className="font-bold mb-1">We respect your data.</p>
                   <p>By submitting this form, you agree to our Terms & Conditions and allow MCKI Solutions to contact you regarding your application.</p>
                </div>
                <div className="flex items-start gap-2">
                   <input required type="checkbox" id="consent" className="mt-1" />
                   <label htmlFor="consent" className="text-sm text-gray-600">I agree to the T&Cs and Privacy Policy.</label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between pt-6 border-t border-gray-100">
               {step > 0 && (
                 <Button type="button" variant="text" onClick={prevStep}>Back</Button>
               )}
               {step < 3 ? (
                 <Button type="button" onClick={nextStep} className="ml-auto">Next <ChevronRight className="w-4 h-4 ml-1" /></Button>
               ) : (
                 <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                   {isSubmitting ? 'Submitting...' : 'Submit Application'}
                 </Button>
               )}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};