import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import { ServerActionTest } from "./_components/server-action-test";

interface Todo {
  title: string;
  id: number;

}
async function PlaceholderData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json() as Todo[];
  const todos = data.slice(0, 10);

  console.log({ todos });

  return (
    <ul className="mt-3 list-disc pl-5">
      {todos.map((post) => (
        <li
          key={post.id}
          className="text-lg text-white transition-colors hover:text-blue-800"
        >
          {post.title}
        </li>
      ))}
    </ul>
  );
}

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>
        </div>

        <PlaceholderData />
        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
      <ServerActionTest />
    </div>
  );
}
