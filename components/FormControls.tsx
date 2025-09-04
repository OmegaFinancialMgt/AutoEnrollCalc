
import React from 'react';

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    help?: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({ label, name, help, ...props }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-400 mb-1.5">{label}</label>
            <input
                id={name}
                name={name}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-700 bg-[#0a1020] text-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                {...props}
            />
            {help && <p className="text-xs text-blue-300 mt-1.5">{help}</p>}
        </div>
    );
};

interface SelectGroupProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    options: { value: string | number; label: string }[];
}

export const SelectGroup: React.FC<SelectGroupProps> = ({ label, name, options, ...props }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-400 mb-1.5">{label}</label>
            <select
                id={name}
                name={name}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-700 bg-[#0a1020] text-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition appearance-none bg-no-repeat bg-right pr-8"
                style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em'}}
                {...props}
            >
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        </div>
    );
};


interface SwitchGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    help?: string;
}
export const SwitchGroup: React.FC<SwitchGroupProps> = ({ label, name, help, ...props }) => {
    return (
        <div>
             <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    id={name}
                    name={name}
                    className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-gray-900"
                    {...props}
                />
                <label htmlFor={name} className="text-sm font-medium text-gray-300">{label}</label>
            </div>
            {help && <p className="text-xs text-blue-300 mt-1.5 pl-7">{help}</p>}
        </div>
    );
};
