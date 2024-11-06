import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

export default function TaskFrom(){
    const params = useParams();
    const navigate = useNavigate();
    const {state} = useLocation(); // 전달받은 state
    const tasks = state?.listTask;
    let t;
    console.log('params',params);

    console.log("state", state);
    if(params.tid!==null){
        t = tasks.filter((t) => t.tid === Number(params.tid))[0];
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        const title = e.target[0].value;
        const content = e.target[2].value;
        const priority = e.target[5].value;
        const date = e.target[7].value;
        if(params.tid === undefined){
            const task = {tid: tasks[tasks.length-1].tid+1, name: title, content: content, priority: priority, date: date, type:'during'}
            navigate(`/${params.pid}`, {state: {listTask: [...tasks, task]}});
        }else{
            t.name= title
            t.content = content;
            t.priority = priority;
            t.date = date;
            const reTask = [];
            for(let i = 0; i<tasks.length; i++){
                if(tasks[i].tid === params.tid){
                    reTask.push(t);
                }else{
                    reTask.push(tasks[i]);
                }
            }
            navigate(`/${params.pid}`, {state: {listTask: [...reTask]}})
        }
    }

    if(params.tid === undefined){
        return <>
            <Typography variant="h4">Task 추가하기</Typography>
            <Grid2 component="form" sx={{width: '100%'}} onSubmit={handleSubmit}>    
                <Grid2 container sx={{margin: '20px'}}>
                    <TextField required name="title" variant="outlined" label="제목" sx={{width: '50vw'}}/>
                </Grid2>
                <Grid2 container sx={{margin: '20px'}}>
                    <TextField required name="content" label="내용" rows={5} multiline sx={{width: '50vw'}}/>
                </Grid2>
                <Grid2 container sx={{margin: '20px', width:' 50vw'}} spacing={2}>
                    <Grid2 size={5}>
                        <TextField required name="priority" label="우선순위" sx={{mt: '8px', mr: '10px'}} fullWidth/>
                    </Grid2>
                    <Grid2 size={5}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} sx={{width:'100%'}}>
                            <DatePicker format="YYYY-MM-DD" label="마감 날짜"/>
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid2>
                    <Grid2 size={2}>
                        <Button variant="contained" fullWidth size="large" type="submit">Submit</Button>
                    </Grid2>
                </Grid2>
                <Grid2 container sx={{margin: '20px'}}>
                    
                </Grid2>
            </Grid2>
        </>;
    }else{
        return <>
            <Typography variant="h4">Task 수정하기</Typography>
            <Grid2 component="form" sx={{width: '100%'}} onSubmit={handleSubmit}>    
                <Grid2 container sx={{margin: '20px'}}>
                    <TextField required name="title" variant="outlined" label="제목" sx={{width: '50vw'}} defaultValue={t.name}/>
                </Grid2>
                <Grid2 container sx={{margin: '20px'}}>
                    <TextField required name="content" label="내용" rows={5} multiline sx={{width: '50vw'}} defaultValue={t.content}/>
                </Grid2>
                <Grid2 container sx={{margin: '20px', width:' 50vw'}} spacing={2}>
                    <Grid2 size={5}>
                        <TextField required name="priority" label="우선순위" sx={{mt: '8px', mr: '10px'}} fullWidth defaultValue={t.priority}/>
                    </Grid2>
                    <Grid2 size={5}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} sx={{width:'100%'}}>
                            <DatePicker format="YYYY-MM-DD" label="마감 날짜" value={dayjs(t.date)}/>
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid2>
                    <Grid2 size={2}>
                        <Button variant="contained" fullWidth size="large" type="submit">Submit</Button>
                    </Grid2>
                </Grid2>
                <Grid2 container sx={{margin: '20px'}}>
                    
                </Grid2>
            </Grid2>
        </>;
    }
}