
import { NextResponse } from "next/server";
import * as yup from "yup";
import { prisma } from "@/lib/prisma";


//Validation  schema 
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

//Update student API
export async function PUT(req, { params }) {
    try {
        const studentId = parseInt(params.id); // parseInt
        const body = await req.json();
        const validatedData = await schema.validate(body, {
            abortEarly: false,
            stripUnknown: true
        });
        //update prisma student id
        await prisma.student.update({
            where: { id: studentId },
            data: validatedData,
        });

        return NextResponse.json({
            message: "Student is successfully updated.",
            studentId,
            bodyData: body
        });
    } catch (error) {
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
            error: error.message || error,
        }, {
            status: 500
        });
    }

}

// delete
export async function DELETE(req, { params }) {
    const studentId = parseInt(params.id);

    try {
        await prisma.student.delete({
            where: { id: studentId },
        });
        return NextResponse.json(
            { message: "Student is successful deleted." },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: "Student not found or delete failed" },
            { status: 404 }
        );
    }
}

//Get student Detail API
export async function GET(req, { params }) {
    const studentId = parseInt(params.id);
    //prisma findUnique query to find studen

    const student = await prisma.student.findUnique({
        where: {
            id: studentId,
        },
    });

    // if (student == null){
    //     return NextResponse.json(
    //     { message: "This student id is not found."},
    //     { status: 404}
    //     );
    return NextResponse.json(student);
    // }

}