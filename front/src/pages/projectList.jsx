import React from "react";
import { Grid2, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function ProjectList(){
    const projects = [{id: 1, name: '기본프로젝트'}, {id: 2, name: '서브프로젝트'}, {id: 3, name: '3번프로젝트'}];

    const navigate = useNavigate();

    const handleProjectClick = (id) => {
        navigate(`${id}`);
    };
    return <>
        {
            projects.map((project) => (
                <Grid2 size={12} sx={{background: '#ababab', margin: '10px', padding: '10px'}} onClick={()=>handleProjectClick(project.id)}> <Typography variant="h4">{project.name}</Typography></Grid2>
            ))
        }
    </>;
}