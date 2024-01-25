"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

import { runTestAction } from "~/app/_actions/test-server-action";

function TestForm({
  name,
  setName,
}: {
  name: string;
  setName: (value: string) => void;
}) {
  const { pending } = useFormStatus();

  return (
    <>
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={pending}
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
    </>
  );
}

export function ServerActionTest() {
  const [name, setName] = useState("");

  return (
    <div className="pt-4">
      <h1>Posting with server actions</h1>
      <form action={runTestAction} className="mt-4 flex flex-col gap-2">
        <TestForm name={name} setName={setName} />
      </form>
    </div>
  );
}
