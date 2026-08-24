import React from 'react'
import { useResumeStore } from '../store'
import { useeduinfo } from '../Queries/Edulist'
import { useexpinfo } from '../Queries/Explist'
import { useproinfo } from '../Queries/Prolist'
import { useSkillinfo } from '../Queries/Skillfetch'
import Classic from './Classic'
import Minimal from './Minimal'


const Preview = () => {
    const {data:edu_list}=useeduinfo()
    const {data:exp_list}=useexpinfo()
    const {data:pro_list}=useproinfo()
    const {data:skill_list}=useSkillinfo()
    const {template}=useResumeStore()
    if(template==='Classic'){
        return <Classic edu_list={edu_list} exp_list={exp_list} pro_list={pro_list} skill_list={skill_list}/>
    }else if(template=='Minimal'){
        return <Minimal edu_list={edu_list} exp_list={exp_list} pro_list={pro_list} skill_list={skill_list}/>
    }else if(template=='Modern'){
        return <Modern edu_list={edu_list} exp_list={exp_list} pro_list={pro_list} skill_list={skill_list}/>
    }
}

export default Preview