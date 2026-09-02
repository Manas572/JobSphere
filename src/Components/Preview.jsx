import React from 'react'
import { useResumeStore } from '../store'
import { useeduinfo } from '../Queries/Edulist'
import { useexpinfo } from '../Queries/Explist'
import { useproinfo } from '../Queries/Prolist'
import { useSkillinfo } from '../Queries/Skillfetch'
import Classic from './Classic'
import Minimal from './Minimal'
import { usePersonalInfo } from '../Queries/Personalinfofetch'
import Modern from './Modern'

const Preview = () => {
    const {data:edu_list}=useeduinfo()
    const {data:exp_list}=useexpinfo()
    const {data:pro_list}=useproinfo()
    const {data:skill_list}=useSkillinfo()
    const {data:personalInfo}=usePersonalInfo()
    const {template,included_educations,included_projects,included_experiences,included_skills}=useResumeStore()
    const sel_edu= edu_list?.filter(edu=>(included_educations.includes(edu.id)))
    const sel_exp= exp_list?.filter(exp=>(included_experiences.includes(exp.id)))
    const sel_pro= pro_list?.filter(pro=>(included_projects.includes(pro.id)))
    const sel_skill= skill_list?.filter(skill=>(included_skills.includes(skill.id)))
    if(template==='Classic'){
        return <Classic edu_list={sel_edu} exp_list={sel_exp} pro_list={sel_pro} skill_list={sel_skill} per_info={personalInfo}/>
    }else if(template=='Minimal'){
        return <Minimal edu_list={sel_edu} exp_list={sel_exp} pro_list={sel_pro} skill_list={sel_skill} per_info={personalInfo}/>
    }else if(template=='Modern'){
        return <Modern edu_list={sel_edu} exp_list={sel_exp} pro_list={sel_pro} skill_list={sel_skill} per_info={personalInfo}/>
    }
}

export default Preview