import { NextResponse } from 'next/server';
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  name: yup.string().required("Name is required"),
  age: yup.number().positive().required("Age is required."),
  address: yup.string().required("Address is required."),

});

// Listing အတွက်
export async function GET() {
  const books = [
    { id: 1, title: 'React Basics', author: 'Dan Abramov' },
    { id: 2, title: 'Next.js Guide', author: 'Vercel' },
  ];
  return NextResponse.json(books);
}

// Create အတွက်
export async function POST(req) {
  try {
    const body = await req.json();
    await schema.validate(body, { abortEarly: false });  //we used await cause the schema is the async function //use abortEarly for testing validate that is true or false
    return NextResponse.json({
      message: "Book is successfully created.",
      bodyData: body
    })
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
      error: error.message,
    }, {
      status: 500
    });
  }
}
