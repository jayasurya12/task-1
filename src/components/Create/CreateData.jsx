import React, { useState, useEffect } from 'react'
import { Grid, Paper, Box, TextField, Typography, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'


const CreateData = () => {
    const [data, setData] = useState({ title: null, desc: null, id: new Date().getUTCMilliseconds() });
    const [titleError, setTitleError] = useState(false);
    const [descError, setDescError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [edit, setEdit] = useState(JSON.parse(localStorage.getItem('task')))
    useEffect(() => {
        if (location.state) {
            const title = location.state.title;
            const desc = location.state.desc;
            const id = location.state.id
            setData({ title: title, desc: desc, id: id })
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    };
    const handleClick = () => {
        // save the data localstorage
        if (location.state) {
            localStorage.setItem('task', 
                JSON.stringify(JSON.parse(localStorage.getItem('task'))
                .filter((item) => item.id !== location.state.id))
            )
        };
        if (!data.title) {
            return setTitleError(true)
        }
        if (!data.desc) {
            return setDescError(true)
        };
        localStorage.setItem("task", JSON.stringify(
            [
                ...JSON.parse(localStorage.getItem('task') || "[]"),
                data
            ]
        ))
        navigate('/');
    }
    return (
        <Grid sx={{ maxwidth: '100%', ml: '' }}>
            <Paper elevation={5}>
                <Box sx={{ padding: "2rem" }}>
                    <Typography variant='h4' color="primary">{location.state ? "Edit Your data" : "Create your data"}</Typography>
                    <TextField fullWidth label="Title" id="fullWidth" sx={{ m: '10px' }}
                        value={data?.title}
                        name="title"
                        onChange={handleChange}
                        required
                    />
                    {titleError ? <Typography color='#f44336'>Enter the title</Typography> : ""}
                    <TextField
                        id="outlined-error"
                        name='desc'
                        label='Description'
                        multiline
                        rows={4}
                        fullWidth
                        sx={{ m: '10px' }}
                        value={data?.desc}
                        onChange={handleChange}
                        required
                    />
                    {
                        descError ? <Typography color='#f44336'>Enter the description</Typography> : ""
                    }
                    <Button variant='contained'
                        sx={{ ml: "42%", mt: "10px" }}
                        onClick={handleClick}>
                        {location.state ? "Save" : "Submit"}
                    </Button>
                </Box>
            </Paper>
        </Grid>
    )
}
const Input = styled.input`
    padding:'5rem;
    width:100%
`
export default CreateData