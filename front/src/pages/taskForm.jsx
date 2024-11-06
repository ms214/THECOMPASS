import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

export default function TaskFrom({}){
    const navigate = useNavigate();
    const {state} = useLocation(); // 전달받은 state
    const [tasks, setTask]=useState(state);
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(e);
        const title = e.target[0].value;
        const content = e.target[2].value;
        const priority = e.target[5].value;
        const date = e.target[7].value;
        const task = {title: title, content: content, priority: priority, date: date}
        setTask([...tasks, task]);
        navigate(-1, {state: tasks});
    }

    const [date, setDate] = useState(new Date());

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
                        <DatePicker format="YYYY-MM-DD" label="시험 날짜" onChange={(newValue) => setDate(newValue)}/>
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