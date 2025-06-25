"use client";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button} from "@mui/material";
import Link from "next/link";

export default function StudentList(){
    return (
    <Box padding={2}>
        <Link passHref href="/students/create">
            <Button variant="contained" sx={{ mb:2 }}>ADD BOOK</Button>
        </Link>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>

                    <TableRow> 
                    <TableCell>No.</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Published_year</TableCell>
                    </TableRow>

                </TableHead>
                <TableBody>
                    <TableRow> 
                    <TableCell>1</TableCell>
                    <TableCell>React.js</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>2021</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
    )
}
