import { Suspense } from "react";
import css from "./LayoutNotes.module.css"

export default function LayoutNotes ({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>
        <Suspense fallback={<div>Loading...</div>}>{sidebar}</Suspense>
      </aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};