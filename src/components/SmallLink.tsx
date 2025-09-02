import Link from "next/link";

interface SmallLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function SmallLink({ href, children }: SmallLinkProps) {
  return (
    <Link
      href={href}
      className="text-sm text-blue-500 hover:text-blue-700 hover:underline transition-colors duration-200"
    >
      {children}
    </Link>
  );
}
