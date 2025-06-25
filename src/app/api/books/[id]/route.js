import { NextResponse } from 'next/server';
import * as yup from "yup";
import { prisma } from "@/lib/prisma";

//Validation  schema 
const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    age: yup.number().positive().required("Age is required."),
    gender: yup.string().required().oneOf(["male", "female"], "Invalid gender"),
    address: yup.string().required("Address is required."),
    major: yup.string().required("Major is required.")

});

// params = id
// update
export async function PUT(req, { params }) {
    try {
        const bookID = parseInt(params.id); //get URI params field;
        const body = await req.json();
        const validatedData = await schema.validate(body, {
            abortEarly: false,
            stripUnknown: true
        });
        //update prisma student id
        await prisma.book.update({
            where: { id: bookID },
            data: validatedData,
        });
        return NextResponse.json({
            message: 'Book is successfully updated.',
            bookID,
            bodyData: body,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return NextResponse.json(
                {
                    message: "Validation Failed",
                    errors: error.inner.map((e) => ({  //we used map for the output that we want 
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

//delete
export async function DELETE(req, { params }) {
    const bookID = parseInt(params.id); //get URI params field;
    try {
        await prisma.book.delete({
            where: { id: bookID },
        });
        return NextResponse.json(
            { message: "Book is successful deleted." },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: "Book not found or delete failed" },
            { status: 404 }
        );
    }
}


//details
export async function GET(req, { params }) {
    const bookID = parseInt(params.id); //get URI params field;
    const book = await prisma.book.findUnique({
        where: {
            id: bookID,
        },

    });
    return NextResponse.json(book);
}
