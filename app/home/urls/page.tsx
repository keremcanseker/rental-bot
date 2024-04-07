import { getUrls } from "@/lib/db";
export default async function Urls() {
  const data = await getUrls();

  if ("error" in data) {
    return <p className="text-red-500 text-center">{data.error}</p>;
  }

  return (
    <div className="flex flex-col gap-4 p-8 ">
      <h1 className="text-2xl font-semibold">Applied Links</h1>
      {data.map((url) => (
        <div
          key={url.url}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <a
            href={url.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            {url.url}
          </a>
          <p className="text-sm text-gray-500">
            {new Date(url.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
