import React, { useState } from 'react';
import { useSkillinfo } from '../Queries/Skillfetch';

const Skilldropdown = ({ onSelect }) => {
    const { data: skills } = useSkillinfo();
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Select");
    const handleSelect = (skillObj) => {
        setSelected(skillObj.name);
        if (onSelect) onSelect(skillObj);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col w-44 text-sm relative">
            <button type="button" onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-4 pr-2 py-2 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none"
            >
                <span>{selected}</span>
                <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <ul className="absolute top-full left-0 w-[32rem] bg-white border border-gray-300 rounded shadow-md mt-1 py-2 z-10 grid grid-cols-4 gap-1 max-h-64 overflow-y-auto">
                    {(skills || []).map((skill) => {
                        const name = skill.name || skill;
                        const id = skill.id || skill;
                        return (
                            <li key={id} className="px-3 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer truncate" title={name} onClick={() => handleSelect({ id, name })} >
                                {name}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    );
}

export default Skilldropdown;