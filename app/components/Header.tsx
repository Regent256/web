export default function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-2xl items-center justify-center gap-2 px-6 py-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-semibold text-white dark:bg-white dark:text-black">
          TR
        </span>
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Tomáš Regner
        </span>
      </div>
    </header>
  );
}
