import React, { useState } from 'react';
import PersonalInfoForm from '../Components/PersonalInfo';
import EducationForm from '../Components/Education';
import ExperienceForm from '../Components/ExperienceForm';
import AppLoading from '../Components/AppLoading';
import { usePersonalInfo } from '../Queries/Personalinfofetch';
import ProjectForm from '../Components/Project';
import { useLocation } from 'react-router-dom';

const Myprofile = () => {
    const { data: personalInfo, isLoading } = usePersonalInfo();
    const loc=useLocation()
    const [step, setStep] = useState(loc.state?.step||1);
    const [data, setData] = useState({
        personalInfo: null, educations: [], experiences: [], projects: []
    });
    const handleNext = (key, val) => {
        const nextData = { ...data, [key]: val };
        setData(nextData);
        step < 4 ? setStep(step + 1) : setStep(1);
    };
    if (isLoading) return <AppLoading />;
    const backProps = { onBack: () => setStep(step - 1) };
    return (
        <div className="min-h-screen bg-black">
            {step === 1 && <PersonalInfoForm initialData={personalInfo} onNext={v => handleNext('personalInfo', v)} />}
            {step === 2 && <EducationForm onNext={v => handleNext('educations', v)} {...backProps} />}
            {step === 3 && <ExperienceForm onNext={v => handleNext('experiences', v)} {...backProps} />}
            {step === 4 && <ProjectForm onNext={v => handleNext('projects', v)} {...backProps} />}
        </div>
    );
};

export default Myprofile;