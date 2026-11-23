// Data comes from /api/getobj on every request, so this page can't be prerendered.
export const instant = false;

type ApiObject = {
  id: number;
  name: string;
  description: string;
};

async function getObjects(): Promise<ApiObject[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/getobj`, {
    headers: { "x-api-key": process.env.API_SECRET_KEY ?? "" },
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const { data } = await res.json();
  return data as ApiObject[];
}

export default async function Home() {
  const objects = await getObjects();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <p className="mt-4">Welcome to my Next.js website.</p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Data from API</h2>
        <ul className="mt-2 space-y-2">
          {objects.map((obj) => (
            <li key={obj.id} className="rounded border p-3">
              <p className="font-medium">{obj.name}</p>
              <p className="text-sm text-gray-500">{obj.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
