import { DocsNavigation } from "../DocsNavigation";

export function DocsAside() {
  return (
    // FIXME: Temporary hardcoded header height (73px, measured in browser).
    <aside className="sticky top-[73px] h-[calc(100dvh-73px)] shrink-0 border-r-1 border-slate-300 px-8 py-6 max-xl:hidden dark:border-slate-600">
      <DocsNavigation />
    </aside>
  );
}
