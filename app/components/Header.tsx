export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <span className="text-lg font-semibold tracking-tight text-black dark:text-zinc-50">
          web
        </span>
        <a
          href="https://github.com/Regent256/web"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
