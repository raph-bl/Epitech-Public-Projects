import React, { useState } from "react";

export const SPECIAL_CHARACTERS = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

const AuthInput = ({
    type = "text",
    value: propValue,
    onChange: propOnChange,
    placeholder,
    autoFocus = false,
    showArrow = true,
    showTick = false,
    onSubmit,
    countryCode = "FR"
}) => {
    const [internalValue, setInternalValue] = useState('');

    const isControlled = propValue !== undefined;
    const value = isControlled ? propValue : internalValue;
    const onChange = isControlled ? propOnChange : (e) => setInternalValue(e.target.value);

    const formatPhoneNumber = (input) => {
        const cleaned = input.replace(/\D/g, '');

        if (cleaned.length === 0) return '';
        if (cleaned.length <= 1) return cleaned;
        if (cleaned.length <= 3) return cleaned.slice(0, 1) + ' ' + cleaned.slice(1);
        if (cleaned.length <= 5) return cleaned.slice(0, 1) + ' ' + cleaned.slice(1, 3) + ' ' + cleaned.slice(3);
        if (cleaned.length <= 7) return cleaned.slice(0, 1) + ' ' + cleaned.slice(1, 3) + ' ' + cleaned.slice(3, 5) + ' ' + cleaned.slice(5);
        if (cleaned.length <= 9) return cleaned.slice(0, 1) + ' ' + cleaned.slice(1, 3) + ' ' + cleaned.slice(3, 5) + ' ' + cleaned.slice(5, 7) + ' ' + cleaned.slice(7);
        return cleaned.slice(0, 1) + ' ' + cleaned.slice(1, 3) + ' ' + cleaned.slice(3, 5) + ' ' + cleaned.slice(5, 7) + ' ' + cleaned.slice(7, 9);
    };

    const handlePhoneChange = (e) => {
        if (!onChange) return;

        const formatted = formatPhoneNumber(e.target.value);
        const syntheticEvent = {
            ...e,
            target: {
                ...e.target,
                value: formatted
            }
        };
        onChange(syntheticEvent);
    };

    if (type === "phone") {
        return (
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={handlePhoneChange}
                    placeholder={placeholder || "+1 (000) 000-0000"}
                    className="apple-auth-input w-full bg-transparent text-black dark:text-neutral-50 px-4 py-4 pl-32 border-2 border-[#424245] dark:border-neutral-600 rounded-[12px] focus:border-[#0077ED] dark:focus:border-blue-400 outline-none transition-all duration-200 placeholder:text-[#86868b] dark:placeholder:text-neutral-500 text-[17px]"
                    autoFocus={autoFocus}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <select
                        className="bg-transparent text-black dark:text-neutral-50 border-none outline-none text-[17px] pr-2 cursor-pointer"
                        defaultValue={countryCode}
                    >
                        <option value="US" className="bg-white dark:bg-neutral-800">US (+1)</option>
                        <option value="FR" className="bg-white dark:bg-neutral-800">FR (+33)</option>
                        <option value="UK" className="bg-white dark:bg-neutral-800">UK (+44)</option>
                    </select>
                </div>
                {showArrow && value && (
                    <button
                        type="submit"
                        onClick={onSubmit}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[#424245] dark:bg-neutral-700 hover:bg-[#515154] dark:hover:bg-neutral-600 transition-colors"
                    >
                        <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>
        );
    }

    if (type === "region") {
        const regions = [
            'France', 'United States Of America', 'United Kingdom', 'Italy',
            'Poland', 'Hrvatska', 'Albania', 'Japan'
        ];

        return (
            <div className="relative">
                <select
                    value={value}
                    onChange={onChange}
                    className="w-full bg-transparent text-black dark:text-neutral-50 px-4 py-4 pr-10 border-2 border-[#424245] dark:border-neutral-600 rounded-[12px] focus:border-[#0077ED] dark:focus:border-blue-400 outline-none transition-all duration-200 text-[17px] appearance-none cursor-pointer"
                    style={{ color: value ? '#000' : '#86868b' }}
                    autoFocus={autoFocus}
                >
                    <option value="" disabled className="bg-white dark:bg-neutral-800">Select your region</option>
                    {regions.map((region) => (
                        <option key={region} value={region} className="bg-white dark:bg-neutral-800">{region}</option>
                    ))}
                </select>
                <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b] dark:text-neutral-500 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        );
    }
    
    // TODO:
    // const isPasswordValid = (password) => {
    //     if (!password) return false;


    // }

    const isEmailValid = (email) => {
        if (!email) return false;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validDomains = [
            "gmail.com", "yahoo.com", "hotmail.com", "aol.com", "hotmail.co.uk",
            "msn.com", "yahoo.fr", "wanadoo.fr", "orange.fr"
        ];

        if (!emailRegex.test(email)) return false;

        const domain = email.split('@')[1];
        return validDomains.includes(domain);
    };

    if (type === "birthdate") {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        let selectedMonth = '', selectedDay = '', selectedYear = '';
        if (value) {
            const parts = value.split('-');
            if (parts.length === 3) {
                selectedYear = parts[0];
                selectedMonth = months[parseInt(parts[1]) - 1];
                selectedDay = parts[2];
            }
        }

        const handleSelectChange = (field, newValue) => {
            const current = value ? value.split('-') : ['', '', ''];

            if (field === 'month') {
                current[1] = newValue ? String(months.indexOf(newValue) + 1).padStart(2, '0') : '';
            } else if (field === 'day') {
                current[2] = newValue ? String(newValue).padStart(2, '0') : '';
            } else if (field === 'year') {
                current[0] = newValue;
            }

            const newDate = current.join('-');
            onChange({ target: { value: newDate } });
        };

        return (
            <div className="flex gap-3">
                {/* Month Select */}
                <div className="flex-1 relative">
                    <select
                        value={selectedMonth}
                        onChange={(e) => handleSelectChange('month', e.target.value)}
                        className="w-full bg-transparent text-black dark:text-neutral-50 px-4 py-4 pr-10 border-2 border-[#424245] dark:border-neutral-600 rounded-[12px] focus:border-[#0077ED] dark:focus:border-blue-400 outline-none transition-all duration-200 text-[17px] appearance-none cursor-pointer"
                        style={{ color: selectedMonth ? '#000' : '#86868b' }}
                    >
                        <option value="" disabled className="bg-white dark:bg-neutral-800">Month</option>
                        {months.map((month) => (
                            <option key={month} value={month} className="bg-white dark:bg-neutral-800">{month}</option>
                        ))}
                    </select>
                    <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b] dark:text-neutral-500 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {/* Day Select */}
                <div className="flex-1 relative">
                    <select
                        value={selectedDay}
                        onChange={(e) => handleSelectChange('day', e.target.value)}
                        className="w-full bg-transparent text-black dark:text-neutral-50 px-4 py-4 pr-10 border-2 border-[#424245] dark:border-neutral-600 rounded-[12px] focus:border-[#0077ED] dark:focus:border-blue-400 outline-none transition-all duration-200 text-[17px] appearance-none cursor-pointer"
                        style={{ color: selectedDay ? '#000' : '#86868b' }}
                    >
                        <option value="" disabled className="bg-white dark:bg-neutral-800">Day</option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                            <option key={day} value={day} className="bg-white dark:bg-neutral-800">{day}</option>
                        ))}
                    </select>
                    <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b] dark:text-neutral-500 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {/* Year Select */}
                <div className="flex-1 relative">
                    <select
                        value={selectedYear}
                        onChange={(e) => handleSelectChange('year', e.target.value)}
                        className="w-full bg-transparent text-black dark:text-neutral-50 px-4 py-4 pr-10 border-2 border-[#424245] dark:border-neutral-600 rounded-[12px] focus:border-[#0077ED] dark:focus:border-blue-400 outline-none transition-all duration-200 text-[17px] appearance-none cursor-pointer"
                        style={{ color: selectedYear ? '#000' : '#86868b' }}
                    >
                        <option value="" disabled className="bg-white dark:bg-neutral-800">Year</option>
                        {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b] dark:text-neutral-500 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        );
    }

    const shouldShowTick = placeholder === "Email" ? isEmailValid(value) : showTick && value;

    return (
        <div className="relative">
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="apple-auth-input w-full bg-transparent text-black dark:text-neutral-50 px-4 py-4 border-2 border-[#424245] dark:border-neutral-600 rounded-[12px] focus:border-[#0077ED] dark:focus:border-blue-400 outline-none transition-all duration-200 placeholder:text-[#86868b] dark:placeholder:text-neutral-500 text-[17px]"
                autoFocus={autoFocus}
            />
            {shouldShowTick && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )}
            {showArrow && value && !shouldShowTick && (
                <button
                    type="submit"
                    onClick={onSubmit}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[#424245] dark:bg-neutral-700 hover:bg-[#515154] dark:hover:bg-neutral-600 transition-colors"
                >
                    <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default AuthInput;