import React,{useState,useEffect} from 'react';
import {
    Paper, Typography, Button, TableHead, Table,
    TableRow, TableCell, TableBody, TableContainer, Alert, Stack, Grid, Fab
    } from '@mui/material'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai';
import {NavLink,Link} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ListTable = () => {
    const [rows,setRows] = useState(JSON?.parse(localStorage?.getItem('task')||'[]'));
    const handleDelete =(id)=>{
        confirmAlert({
            title:"Confirm to Delete",
            message:"Are you sure delete.",
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => setRows(rows.filter((item)=>item.id !== id))
                },
                {
                  label: 'No'
                }
            ]
        });
    }
    useEffect(() => {
        localStorage.setItem('task',JSON.stringify(rows)||'[]')
    }, [rows]);
    return (
        <div>
            {
                rows?.length?
                <Grid sx={{display:'flex',justifyContent: 'space-around',mb:'10px'}}>
                    <Typography variant="h5"color='primary'>Data Listed Here</Typography>
                    <NavLink to='/create'>
                        <Button variant='contained'>Create</Button>
                    </NavLink>
                </Grid>
                :""
            }
            {
                rows?.length?
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead sx={{backgroundColor:"#f3e5f5"}}>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                    <TableCell align="right">Edit</TableCell>
                                    <TableCell align="right">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows?.map((row,index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {row.title}
                                        </TableCell>
                                        <TableCell align="right">{row.desc}</TableCell>
                                        <TableCell align="right"><Link to='/create' state={row}><BiEdit style={{ fontSize: "1.3rem", color: '#002984' }}/></Link></TableCell>
                                        <TableCell align="right"><Fab><AiFillDelete style={{ color: "#f44336", fontSize: "1.3rem" }} onClick={()=>handleDelete(row.id)}/></Fab></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <Grid sx={{display:'flex',justifyContent: 'space-around'}}>
                        <Typography variant="h5" mb={1} color='primary'>
                            List is Empty Create the Data
                        </Typography>
                        <NavLink to='/create'>
                            <Button variant='contained'>Create</Button>
                        </NavLink>
                    </Grid>
            }
        </div>
    );
}

export default ListTable;