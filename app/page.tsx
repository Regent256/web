export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-zinc-50 px-6 text-center font-sans dark:bg-black">
      <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-6xl">
        Hello, world! 👋
      </h1>
      <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
        Next.js + React + Tailwind CSS — první stránka projektu{" "}
        <span className="font-medium text-black dark:text-zinc-50">web</span>.
      </p>
    </div>
  );
}
