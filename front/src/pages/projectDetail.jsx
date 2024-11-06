import { Box, Button, Container, Grid, Grid2, MenuItem, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TaskItem from "./taskItem";

const projects = [{id: 1, name: '기본프로젝트'}, {id: 2, name: '서브프로젝트'}, {id: 3, name: '3번프로젝트'}];
let originTasks = [
    {tid: 1, name: 't1', content: 'content n1', priority: 1, date: '2024-11-05', type: 'during'}, // 지나고 끝나지 않음. 빨간색
    {tid: 2, name: 't2', content: 'content n2', priority: 2, date: '2024-11-08', type: 'during'}, //3일 이내 + 끝나지 않음 노란색
    {tid: 3, name: 't3', content: 'content n3', priority: 3, date: '2024-11-10', type: 'during'}, // 3일 이후 + 끝나지 않음.
    {tid: 4, name: 't4', content: 'content n4', priority: 4, date: '2024-11-01', type: 'complete'}, // 지나고 + 끝남.
]

export default function ProjectDetail(){
    const params = useParams();
    const navigate = useNavigate();
    const {state} = useLocation();
    const project = projects.filter((a) => a.id === Number(params.pid))[0];
    if(state !== null){
        originTasks = state.listTask;
    }
    originTasks.sort((a, b) => a.priority - b.priority ) //sort
    const [tasks, setTask] = useState(originTasks);
    const [filter, setFilter] = useState(null);

    const handleDelete = (id) => {
        setTask(tasks.filter((a)=> a.tid !== id));
    }
    const handleEdit = (id) => {
        navigate(`${id}`, {state: {listTask: tasks, editId: id}});
    }

    const handleAddTask = () => {
        navigate(`/${params.pid}/task/add`, {state: {listTask: tasks}});
    }

    const handleFilter = (type) => {
        console.log(type.target);
        type = type.target.value;
        if(type !== 'all')
            setFilter(type);
        else setFilter(null);
    }

    return <Container sx={{padding: '20px'}}>
        <Typography variant="h2">{project.name}</Typography>
        <TextField select defaultValue='all' onChange={handleFilter}>
            <MenuItem key='all' value='all'>All</MenuItem>
            <MenuItem key='during' value='during'>During</MenuItem>
            <MenuItem key='complete' value='complete'>Complete</MenuItem>
        </TextField>
        <Grid2 container>
        {
            tasks.map((task) => {
                if(filter === null){
                    const dt = new Date();
                    const targetDate = new Date(task.date);
                    if((targetDate.getTime() - dt.getTime()) / (1000 * 60 * 60 * 24) > 3 && task.type !== 'complete') // 3일보다 많이 남음
                        return <TaskItem task={task} handleDelete={handleDelete} handleEdit={handleEdit}/>;
                    else if((targetDate.getTime() - dt.getTime()) / (1000 * 60 * 60 * 24) < 0 && task.type !== 'complete') // 마감일 임박 + 끝나지 않음
                        return <TaskItem task={task} handleDelete={handleDelete} handleEdit={handleEdit} inThreeDays={true}/>;
                    else if((targetDate.getTime() - dt.getTime()) / (1000 * 60 * 60 * 24) <= 3  && task.type !== 'complete') // 마감일 지남 + 끝나지 않음
                        return <TaskItem task={task} handleDelete={handleDelete} handleEdit={handleEdit} inPast={true}/>;
                    else
                        return <TaskItem task={task} handleDelete={handleDelete} handleEdit={handleEdit} isComplete={true}/>;
                }else if(task.type === filter){
                    const dt = new Date();
                    const targetDate = new Date(task.date);
                    if((targetDate.getTime() - dt.getTime()) / (1000 * 60 * 60 * 24) >= 3) // 3일보다 많이 남음
                        return <TaskItem task={task} handleDelete={handleDelete} handleEdit={handleEdit}/>;
                    else if((targetDate.getTime() - dt.getTime()) / (1000 * 60 * 60 * 24) < 0 && task.type !== 'complete') // 3일이내로 남음
                        return <TaskItem task={task} handleDelete={handleDelete} handleEdit={handleEdit} inThreeDays={true}/>;
                    else if((targetDate.getTime() - dt.getTime()) / (1000 * 60 * 60 * 24) <= 3  && task.type !== 'complete') // 마감일 지남
                        return <TaskItem task={task} handleDelete={handleDelete} handleEdit={handleEdit} inPast={true}/>;
                    else
                        return <TaskItem task={task} handleDelete={handleDelete} handleEdit={handleEdit} isComplete={true}/>;
                }else return null;
            })           
        }
        </Grid2>
        <Box sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
            <Button size="large" variant="contained" onClick={handleAddTask}>
                Add Task
            </Button>
        </Box>
    </Container>;
}