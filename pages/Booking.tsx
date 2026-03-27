import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const Booking: React.FC = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [step, setStep] = useState(1);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isBooking, setIsBooking] = useState(false);

    // Generate days for the current month view
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun
        
        const daysArray = [];
        // Empty slots for previous month
        for(let i = 0; i < firstDay; i++) {
            daysArray.push(null);
        }
        // Days
        for(let i = 1; i <= days; i++) {
            daysArray.push(new Date(year, month, i));
        }
        return daysArray;
    };

    const timeSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"
    ];

    const changeMonth = (delta: number) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(newMonth.getMonth() + delta);
        setCurrentMonth(newMonth);
    };

    const handleDateSelect = (date: Date) => {
        const today = new Date();
        today.setHours(0,0,0,0);
        if (date < today) return; // Disable past dates
        setSelectedDate(date);
    };

    const handleConfirm = () => {
        setIsBooking(true);
        setTimeout(() => {
            setIsBooking(false);
            setStep(3); // Success
        }, 1500);
    };

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysInView = getDaysInMonth(currentMonth);

    // Render Success Step
    if (step === 3) {
        return (
            <div className="min-h-screen bg-mcki-grey py-12 px-4 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-mcki-blue mb-2">Booking Confirmed!</h2>
                    <p className="text-gray-600 mb-6">
                        We have scheduled your call for <br/>
                        <span className="font-semibold text-mcki-text">
                            {selectedDate?.toLocaleDateString()} at {selectedTime}
                        </span>.
                    </p>
                    <p className="text-sm text-mcki-muted mb-8">
                        Check your email for the Google Meet link.
                    </p>
                    <Button fullWidth onClick={() => navigate('/')}>Return Home</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-mcki-grey py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                
                {/* Sidebar Info */}
                <div className="bg-mcki-blue p-8 text-white md:w-1/3 flex flex-col">
                    <div className="mb-auto">
                        <CalendarIcon className="w-10 h-10 mb-6 text-mcki-gold" />
                        <h1 className="text-2xl font-heading font-bold mb-4">Book a Consultation</h1>
                        <p className="text-blue-200 text-sm mb-6">
                            Speak with an admissions expert for 30 minutes. We'll discuss your eligibility, course options, and next steps.
                        </p>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-center gap-3 opacity-90">
                                <Clock className="w-4 h-4" />
                                <span>30 Minutes</span>
                            </div>
                            <div className="flex items-center gap-3 opacity-90">
                                <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                                <span>Free of charge</span>
                            </div>
                        </div>
                    </div>
                    
                    {selectedDate && (
                        <div className="mt-8 pt-8 border-t border-blue-800">
                             <p className="text-xs text-blue-300 uppercase tracking-widest font-semibold mb-1">Selected Date</p>
                             <p className="text-xl font-bold">{selectedDate.toLocaleDateString()}</p>
                             {selectedTime && (
                                 <p className="text-lg text-mcki-gold mt-1">{selectedTime}</p>
                             )}
                        </div>
                    )}
                </div>

                {/* Main Calendar Area */}
                <div className="p-8 md:w-2/3 bg-white">
                    {step === 1 && (
                        <div className="h-full flex flex-col">
                            <h2 className="text-xl font-bold text-mcki-blue mb-6">Select a Date</h2>
                            
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between mb-6">
                                <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                                </button>
                                <span className="font-bold text-lg">
                                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                </span>
                                <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <ChevronRight className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs text-gray-400 font-semibold uppercase tracking-wider">
                                <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                            </div>
                            <div className="grid grid-cols-7 gap-2">
                                {daysInView.map((day, idx) => {
                                    if(!day) return <div key={idx} className="aspect-square"></div>;
                                    
                                    const isSelected = selectedDate?.toDateString() === day.toDateString();
                                    const isToday = new Date().toDateString() === day.toDateString();
                                    const isPast = day < new Date(new Date().setHours(0,0,0,0));

                                    return (
                                        <button
                                            key={idx}
                                            disabled={isPast}
                                            onClick={() => handleDateSelect(day)}
                                            className={`
                                                aspect-square rounded-full flex items-center justify-center text-sm transition-all
                                                ${isSelected ? 'bg-mcki-blue text-white shadow-md transform scale-105' : ''}
                                                ${!isSelected && !isPast ? 'hover:bg-blue-50 text-gray-700' : ''}
                                                ${isPast ? 'text-gray-300 cursor-not-allowed' : ''}
                                                ${isToday && !isSelected ? 'border border-mcki-gold text-mcki-gold font-bold' : ''}
                                            `}
                                        >
                                            {day.getDate()}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-auto pt-6 flex justify-end">
                                <Button 
                                    disabled={!selectedDate} 
                                    onClick={() => setStep(2)}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                         <div className="h-full flex flex-col">
                            <div className="flex items-center gap-2 mb-6">
                                <button onClick={() => setStep(1)} className="text-gray-400 hover:text-mcki-blue text-sm flex items-center">
                                    <ChevronLeft className="w-4 h-4" /> Back
                                </button>
                            </div>
                            <h2 className="text-xl font-bold text-mcki-blue mb-6">Select a Time</h2>
                            
                            <div className="grid grid-cols-3 gap-3 overflow-y-auto max-h-[300px] pr-2">
                                {timeSlots.map(time => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`
                                            py-3 border rounded-lg text-sm font-medium transition-all
                                            ${selectedTime === time 
                                                ? 'border-mcki-blue bg-blue-50 text-mcki-blue ring-1 ring-mcki-blue' 
                                                : 'border-gray-200 text-gray-600 hover:border-mcki-gold hover:text-mcki-blue'}
                                        `}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-auto pt-6 flex justify-end">
                                <Button 
                                    disabled={!selectedTime || isBooking} 
                                    onClick={handleConfirm}
                                >
                                    {isBooking ? 'Confirming...' : 'Confirm Booking'}
                                </Button>
                            </div>
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};