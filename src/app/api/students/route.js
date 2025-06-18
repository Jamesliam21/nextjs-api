import { NextResponse } from 'next/server';

export async function GET() {

    const StudentData = [
        {
            name: "Su Su",
            age: 17,
            address: "Hlaing",
            major: "Computer Sciences"
        },

        {
            name: "Aung Aung",
            age: 18,
            address: "Hlaing",
            major: "Computer Sciences"
        },

        {
            name: "Kaung Kaung",
            age: 19,
            address: "Hlaing",
            major: "Computer Sciences"
        }
    ];

    return NextResponse.json(StudentData);
}

export async function POST(req) {
     const body = await req.json();
     console.log(body)
    return NextResponse.json({message: "Student is successful created.",
        bodyData: body,
    });
}