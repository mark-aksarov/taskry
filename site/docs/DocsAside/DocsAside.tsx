import { DocsNavigation } from "../DocsNavigation";

export function DocsAside() {
  return (
    // FIXME: Temporary hardcoded header height (73px, measured in browser).
    <aside className="sticky top-[73px] mr-12 h-[calc(100dvh-73px)] shrink-0 overflow-y-auto border-r-1 border-gray-300 py-4 pr-6 max-xl:hidden dark:border-gray-600">
      <DocsNavigation />
    </aside>
  );
}
