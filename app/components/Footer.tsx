export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
      <p>© {new Date().getFullYear()} Tomáš Regner. Všechna práva vyhrazena.</p>
      <p className="mt-1">IČO: 03356116 · Nejsem plátcem DPH</p>
    </footer>
  );
}
