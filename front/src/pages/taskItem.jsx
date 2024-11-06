import { Box, Button, Grid2, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";


export default function TaskItem({task, handleDelete, inThreeDays=false, inPast=false, isComplete=false}){
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`${id}`);
    }
    if(inPast) //마감일이 지난
        return <Grid2 size={{md:6, xs: 12}} sx={{padding: '10px'}}>
                    <Box sx={{width: '100%', margin: '10px',background: '#ffc150'}}>
                        <Grid2 container>
                            <Grid2 size={8} sx={{padding: '10px'}}>
                                <Typography variant="subtitle1" >이름: {task.name}</Typography>
                                <Typography variant="subtitle1" >내용: {task.content}</Typography>
                                <Typography variant="subtitle1" >마감일: {task.date}</Typography>
                            </Grid2>
                            <Grid2 size={4} sx={{padding: '10px'}}>
                                <Button onClick={()=>handleEdit(task.tid)}>수정</Button>
                                <Button variant="contained" color="error" onClick={() => handleDelete(task.tid)}>삭제</Button>
                            </Grid2>
                        </Grid2>
                    </Box>
                </Grid2>;
    else if(inThreeDays) // 마감 3일전 이내
    return <Grid2 size={{md:6, xs: 12}} sx={{padding: '10px'}}>
                <Box sx={{width: '100%', margin: '10px',background: '#ff9999'}}>
                    <Grid2 container>
                        <Grid2 size={8} sx={{padding: '10px'}}>
                            <Typography variant="subtitle1" >이름: {task.name}</Typography>
                            <Typography variant="subtitle1" >내용: {task.content}</Typography>
                            <Typography variant="subtitle1" >마감일: {task.date}</Typography>
                        </Grid2>
                        <Grid2 size={4} sx={{padding: '10px'}}>
                            <Button onClick={()=>handleEdit(task.tid)}>수정</Button>
                            <Button variant="contained" color="error" onClick={() => handleDelete(task.tid)}>삭제</Button>
                        </Grid2>
                    </Grid2>
                </Box>
            </Grid2>;
    else if(isComplete) // 끝냄
        return <Grid2 size={{md:6, xs: 12}} sx={{padding: '10px'}}>
                    <Box sx={{width: '100%', margin: '10px',background: '#ababab'}}>
                        <Grid2 container>
                            <Grid2 size={8} sx={{padding: '10px'}}>
                                <Typography variant="subtitle1" sx={{textDecoration: 'line-through'}}>이름: {task.name}</Typography>
                                <Typography variant="subtitle1" sx={{textDecoration: 'line-through'}}>내용: {task.content}</Typography>
                                <Typography variant="subtitle1" sx={{textDecoration: 'line-through'}}>마감일: {task.date}</Typography>
                            </Grid2>
                            <Grid2 size={4} sx={{padding: '10px'}}>
                                <Button onClick={()=>handleEdit(task.tid)}>수정</Button>
                                <Button variant="contained" color="error" onClick={() => handleDelete(task.tid)}>삭제</Button>
                            </Grid2>
                        </Grid2>
                    </Box>
                </Grid2>;

    return <Grid2 size={{md:6, xs: 12}} sx={{padding: '10px'}}>
    <Box sx={{width: '100%', margin: '10px',background: '#ababab'}}>
        <Grid2 container>
            <Grid2 size={8} sx={{padding: '10px'}}>
                <Typography variant="subtitle1">이름: {task.name}</Typography>
                <Typography variant="subtitle1">내용: {task.content}</Typography>
                <Typography variant="subtitle1">마감일: {task.date}</Typography>
            </Grid2>
            <Grid2 size={4} sx={{padding: '10px'}}>
                <Button onClick={()=>handleEdit(task.tid)}>수정</Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(task.tid)}>삭제</Button>
            </Grid2>
        </Grid2>
    </Box>
</Grid2>
}