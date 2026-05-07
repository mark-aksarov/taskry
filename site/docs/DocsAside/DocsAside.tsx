import { DocsNavigation } from "../DocsNavigation";

export function DocsAside() {
  return (
    // FIXME: Temporary hardcoded header height (73px, measured in browser).
    <aside className="sticky top-[73px] mr-12 max-h-[calc(100dvh-73px)] shrink-0 overflow-y-auto border-r-1 border-(--border-primary) py-4 pr-6 max-xl:hidden">
      <DocsNavigation />
    </aside>
  );
}
