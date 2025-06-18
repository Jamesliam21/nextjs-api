import { NextResponse } from 'next/server';
// params = id
export async function PUT(req, { params }) {
    const studentID = params.id; //get URI params field;
    const body = await req.json();
    return NextResponse.json({
        message: 'Student is successfully updated.',
        studentID,
        bodyData: body,
    });
}