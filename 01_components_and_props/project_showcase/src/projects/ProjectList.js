import React from 'react'
import ProjectItem from './ProjectItem'

const ProjectList = ({projects}) => {
    // debugger
    // const mappedProjects = projects.map((projectObj) => <ProjectItem projectObj={projectObj} key={projectObj.id}/>)
    const mappedProjects = projects.map((projectObj) => <ProjectItem {...projectObj} key={projectObj.id}/>)


    return (
        <>
            <div>{mappedProjects}</div>
        </>
    )
}

export default ProjectList