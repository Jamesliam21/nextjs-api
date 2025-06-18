import { NextResponse } from 'next/server';

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
  const body = await req.json();
  return NextResponse.json({
    message: 'Book created successfully.',
    data: body,
  });
}
