import React, { useState } from 'react';
import PersonalInfoForm from '../Components/PersonalInfo';
import EducationForm from '../Components/Education';
import ExperienceForm from '../Components/ExperienceForm';
import ProjectForm from '../Components/ProjectForm';
import AppLoading from '../Components/AppLoading';
import { usePersonalInfo } from '../Queries/Personalinfofetch';

const Myprofile = () => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        personalInfo: null, educations: [], experiences: [], projects: []
    });

   const { data: personalInfo, isLoading, error } = usePersonalInfo();

    const handleNext = (key, val) => {
        const nextData = { ...data, [key]: val };
        setData(nextData);
        step < 4 ? setStep(step + 1) : submitToAPI(nextData);
    };

    const submitToAPI = async (finalData) => {
        console.log(" Final Aggregated Payload ready for Django:", finalData);
    };

    if (isLoading) return <AppLoading />;

    const backProps = { onBack: () => setStep(step - 1) };

    return (
        <div className="min-h-screen bg-black">
            {step === 1 && <PersonalInfoForm initialData={personalInfo} onNext={v => handleNext('personalInfo', v)} />}
            {step === 2 && <EducationForm  onNext={v => setStep(3)} {...backProps} />}
            {step === 4 && <ProjectForm  onNext={v => setStep(4)} {...backProps} />}
            {step === 3 && <ExperienceForm  onNext={v => handleNext('projects', v.projects)} {...backProps} />}
        </div>
    );
};

export default Myprofile;