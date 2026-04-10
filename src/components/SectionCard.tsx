import { ReactNode } from "react";
import clsx from "clsx";

type SectionCardProps = {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

const SectionCard = ({ title, actions, children, className }: SectionCardProps) => (
  <section className={clsx("panel p-4 md:p-5", className)}>
    {(title || actions) && (
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        {title ? <h2 className="text-lg font-bold text-slate-800">{title}</h2> : <div />}
        {actions}
      </header>
    )}
    {children}
  </section>
);

export default SectionCard;
