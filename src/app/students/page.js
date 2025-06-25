"use client";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button, IconButton, Stack, colors } from "@mui/material";
import Link from "next/link";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";



export default function StudentList() {
    const getStudentList = async()=>{
        try{
            console.log("getStudentList()");
            const response = await axios.get("/api/students");
            console.log(response.data);
        }catch (error){
            console.error(error)
        }
    };

    return (
        <Box padding={2}>
            <Stack alignItems="flex-end">
            <Link passHref href="/students/create">
                <Button variant="contained" sx={{ mb: 2 }}>ADD STUDENT</Button>
            </Link>
            </Stack>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>DOB</TableCell>
                            <TableCell>Father Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Marjor</TableCell>
                            <TableCell align="center">Action</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>Su Su</TableCell>
                            <TableCell>09771066184</TableCell>
                            <TableCell>5.7.2021</TableCell>
                            <TableCell>U Hla</TableCell>
                            <TableCell>19</TableCell>
                            <TableCell>female</TableCell>
                            <TableCell>Hlaing</TableCell>
                            <TableCell>It</TableCell>
                            <TableCell align="center">
                                <Link href={"/students/1"} passHref>
                                    <IconButton sx={{color:"black"}}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </Link>
                                <Link href={"/students/1/edit"} passHref>
                                    <IconButton sx={{color:"blue"}}>
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                                <IconButton sx={{color:"red"}}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
