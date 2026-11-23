import { NextResponse } from "next/server";

const API_SECRET_KEY = process.env.API_SECRET_KEY;

// TODO: replace with a real database query once the DB is connected.
const mockObjects = [
  {
    id: 1,
    name: "Sample Object One",
    description: "Placeholder data returned until the database is connected.",
  },
  {
    id: 2,
    name: "Sample Object Two",
    description: "Served from /api/getobj instead of the frontend querying the DB directly.",
  },
];

export async function GET(request: Request) {
  const requestKey = request.headers.get("x-api-key");

  if (!API_SECRET_KEY || requestKey !== API_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ data: mockObjects });
}
