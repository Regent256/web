export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800">
      © {new Date().getFullYear()} Tomáš Regner. Postaveno na Next.js, React a
      Tailwind CSS.
    </footer>
  );
}
