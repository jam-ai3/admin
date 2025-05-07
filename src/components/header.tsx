"use client";

import { lato } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LOGO_SIZE = 64;

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo-no-bg.png"
          alt="logo"
          width={LOGO_SIZE}
          height={LOGO_SIZE}
        />
        <span className={`${lato.className} font-semibold text-xl`}>jamAI</span>
      </Link>
      <ul className="mr-8">
        <HeaderLink href="/users" text="Users" />
      </ul>
    </header>
  );
}

type HeaderLinkProps = {
  href: string;
  text: string;
};

function HeaderLink({ href, text }: HeaderLinkProps) {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={
          pathname === href ? "font-semibold" : "text-muted-foreground"
        }
      >
        {text}
      </Link>
    </li>
  );
}
