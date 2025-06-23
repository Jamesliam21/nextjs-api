import { NextResponse } from 'next/server';
import * as yup from "yup";

//Validation  schema 
const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    age: yup.number().positive().required("Age is required."),
    gender: yup.string().required("Gender is required."),
    address: yup.string().required("Address is required."),
    major: yup.string().required("Major is required.")

});

// params = id
export async function PUT(req, { params }) {
    try {
    const bookID = params.id; //get URI params field;
    const body = await req.json();
    await schema.validate(body, { abortEarly: false });
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

export async function DELETE(req, { params }) {
    const bookID = params.id; //get URI params field;
    return NextResponse.json({
        message: 'Book is successfully deleted.',
        bookID,
    });
}
//details
export async function GET(req, { params }) {
    const bookID = params.id; //get URI params field;
    const book = {
        id: bookID,
        name: "Su Su",
        age: 18,
        fatherName: "U Maung",
        address: "Hledan",
        major: "Computer Science",
        book: "React-js"

    };
    return NextResponse.json({
        message: 'Book detail is successfully get',
        book,
    });
}