import Image from "next/image";

const contacts = [
  { label: "Email", value: "info@tomasregner.cz", href: "mailto:info@tomasregner.cz" },
  { label: "Telefon", value: "+420 739 418 088", href: "tel:+420739418088" },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/tomas-regner",
    href: "https://www.linkedin.com/in/tomas-regner/",
  },
];

export default function Home() {
  return (
    <section className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="animate-fade-in-up flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl border border-zinc-200 p-8 text-center dark:border-zinc-800">
        <Image
          src="/tomas-regner.png"
          alt="Tomáš Regner"
          width={128}
          height={128}
          priority
          className="h-32 w-32 rounded-full object-cover"
        />

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Tomáš Regner
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            UX Designer &amp; E-commerce konzultant
          </p>
        </div>

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
          17+ let zkušeností v UX designu
        </span>

        <dl className="flex w-full flex-col gap-3 text-left">
          {contacts.map((contact) => (
            <div
              key={contact.label}
              className="flex items-center justify-between gap-4 border-t border-zinc-100 pt-3 dark:border-zinc-900"
            >
              <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                {contact.label}
              </dt>
              <dd>
                <a
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-sm font-semibold text-zinc-900 hover:underline dark:text-white"
                >
                  {contact.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
