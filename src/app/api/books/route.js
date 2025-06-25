import { NextResponse } from 'next/server';
import * as yup from "yup";
import { prisma } from '@/lib/prisma';


// Listing အတွက်
export async function GET() {
  const books = [
    {  title: 'React Basics', author: 'Dan Abramov', published_year: "2012" },
    {  title: 'Next.js Guide', author: 'Vercel', published_year: "2015"  },
  ];
  return NextResponse.json(books);
}

const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    author: yup.string().required("Author is required."),
    published_year: yup.number().required("Published is required.")

});


// Create အတွက်
export async function POST(req) {
  try {
    const body = await req.json();
    const validatedData = await schema.validate(body, { abortEarly: false });  //we used await cause the schema is the async function //use abortEarly for testing validate that is true or false

    const book = await prisma.book.create({
            data: validatedData,
        });

    return NextResponse.json({
      message: "Book is successfully created.",
      book: book,
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
      error: error.message || error,
    }, {
      status: 500
    });
  }
}
