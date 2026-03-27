import React, { useState } from 'react';
import { Button } from '../components/Button';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Eligibility: React.FC = () => {
    const navigate = useNavigate();
    const [score, setScore] = useState(0);
    const [step, setStep] = useState(0);
    const [finished, setFinished] = useState(false);

    const questions = [
        { q: "Are you currently living in the UK?", points: 1 },
        { q: "Have you lived in the UK/EU for the last 3 years?", points: 1 },
        { q: "Do you have a National Insurance number?", points: 1 },
        { q: "Are you currently employed?", points: 1 },
        { q: "Are you looking for an HND or Bachelor Degree?", points: 1 },
    ];

    const answer = (val: boolean) => {
        if(val) setScore(score + 1);
        if(step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setFinished(true);
        }
    }

    if(finished) {
        const isEligible = score >= 4;
        return (
            <div className="min-h-screen bg-mcki-grey flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                    {isEligible ? (
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    ) : (
                        <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                    )}
                    <h2 className="text-2xl font-bold mb-2">{isEligible ? "You Likely Qualify!" : "Needs Review"}</h2>
                    <p className="text-mcki-muted mb-6">
                        {isEligible 
                            ? "Based on your answers, you appear to meet the core criteria for our partner universities." 
                            : "We might need more information to find the right path for you."}
                    </p>
                    <Button onClick={() => navigate('/apply')} fullWidth>Proceed to Application</Button>
                    <p className="text-xs text-gray-400 mt-4">*This is a preliminary check, not a guarantee of admission or funding.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-mcki-grey py-12 px-4">
             <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">
                 <h1 className="text-2xl font-bold text-mcki-blue mb-2">Eligibility Pre-Check</h1>
                 <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
                     <div className="bg-mcki-gold h-2 rounded-full transition-all" style={{ width: `${((step)/questions.length)*100}%`}}></div>
                 </div>
                 
                 <div className="mb-8">
                     <h3 className="text-xl font-medium mb-8">{questions[step].q}</h3>
                     <div className="grid grid-cols-2 gap-4">
                         <Button onClick={() => answer(true)} variant="outline">Yes</Button>
                         <Button onClick={() => answer(false)} variant="outline">No</Button>
                     </div>
                 </div>
             </div>
        </div>
    );
};