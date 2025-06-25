import { NextResponse } from "next/server";
import * as yup from "yup";
import { prisma } from "@/lib/prisma"; //pisma ချိတ်


const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    father_name: yup.string().required("Father name is required."),
    gender: yup.string().required().oneOf(["male", "female"], "Invalid gender"),
    age: yup.number().required("Age is required."),
    dob: yup.date().nullable().required("Birthday is required."),
    phone: yup.string().required("Phone number is required"),
    address: yup.string().required("Address is required."),
    major: yup.string().required("Major is required.")

});

const StudentData = [
    {
        id: 1,
        name: 'Su Su',
        age: 17,
        address: 'Hlaing',
        major: 'Computer Science',
    }, {
        id: 2,
        name: 'Hla Hla',
        age: 16,
        address: 'Insein',
        major: 'Computer Science',
    }, {
        id: 3,
        name: 'Kyal Sin',
        age: 18,
        address: 'Mya Kan Thar',
        major: 'Computer Technology',
    },
]

// get student list api
export async function GET() {
    const students = await prisma.student.findMany();
    return NextResponse.json(students);
}

// export async function GET() {
//     return NextResponse.json({ StudentData }
//     );
// }


// export async function POST(req) {
//     const body = await req.json();
//     // console.log(body)
//     return NextResponse.json({ message: "Student List is successfully created. ", bodyData: body }
//     );
// }

//create
export async function POST(req) {
    try {
        const body = await req.json();
        const validatedData = await schema.validate(body, { abortEarly: false });  //we used await cause the schema is the async function //use abortEarly for testing validate that is true or false

        const student = await prisma.student.create({
            data: validatedData,
        });

        return NextResponse.json({
            message: "Student is successfully created.",
            student: student,
        })
    } catch (error) {
        // return NextResponse.json({ message: "Internal Server Error" }, { status: 500 }); //we need to mark that error message have the (status) attrubute
        if (error.name === "ValidationError") {
            return NextResponse.json(
                {
                    message: "Validation Failed",
                    errors: error.inner.map((e) => ({       //we used map for the output that we want 
                        path: e.path,
                        message: e.message,
                    })),
                }, { status: 400 }
            );
        }
        return NextResponse.json({
            message: "Unexpected error",
            error: error.message,
        }, {
            status: 500
        });
    }
}