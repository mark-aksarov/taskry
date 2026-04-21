import { Link } from "@/ui/Link";

export function AppFooterLink({ children }: { children: React.ReactNode }) {
  return (
    <Link className="pressed:text-black dark:pressed:text-white mb-3 w-fit text-sm font-normal text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white">
      {children}
    </Link>
  );
}
