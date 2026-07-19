const features = [
  {
    title: "Next.js",
    description: "React framework s App Routerem a serverovým renderováním.",
  },
  {
    title: "React",
    description: "Komponentová knihovna pro stavbu uživatelských rozhraní.",
  },
  {
    title: "Tailwind CSS",
    description: "Utility-first styly bez psaní vlastního CSS souboru.",
  },
];

export default function Home() {
  return (
    <>
      <section className="flex flex-1 flex-col items-center justify-center gap-4 bg-zinc-50 px-6 py-24 text-center dark:bg-black">
        <h1 className="animate-fade-in-up text-4xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-6xl">
          Hello, world! 👋
        </h1>
        <p className="animate-fade-in-up max-w-md text-lg text-zinc-600 [animation-delay:150ms] dark:text-zinc-400">
          Next.js + React + Tailwind CSS — první stránka projektu{" "}
          <span className="font-medium text-black dark:text-zinc-50">web</span>.
        </p>
      </section>

      <section className="border-t border-zinc-200 bg-white px-6 py-20 dark:border-zinc-800 dark:bg-black">
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="animate-fade-in-up rounded-xl border border-zinc-200 p-6 text-left dark:border-zinc-800"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <h2 className="text-lg font-semibold text-black dark:text-zinc-50">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
