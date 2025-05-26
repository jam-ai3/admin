"use client";

import { lato } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { Nav, NavLink } from "./nav";

const LOGO_SIZE = 64;

export default function Header() {
  return (
    <header className="relative flex items-center p-4">
      <Link href="/" className="z-10 flex items-center gap-2">
        <Image
          src="/logo-no-bg.png"
          alt="logo"
          width={LOGO_SIZE}
          height={LOGO_SIZE}
        />
        <span className={`${lato.className} font-semibold text-xl`}>jamAI</span>
      </Link>
      <div className="left-1/2 absolute w-full -translate-x-1/2">
        <Nav>
          <NavLink href="/">Dashboard</NavLink>
          <NavLink href="/users">Users</NavLink>
          <NavLink href="/contact">Messages</NavLink>
        </Nav>
      </div>
    </header>
  );
}

// type HeaderLinkProps = {
//   href: string;
//   text: string;
// };

// function HeaderLink({ href, text }: HeaderLinkProps) {
//   const pathname = usePathname();

//   return (
//     <li>
//       <Link
//         href={href}
//         className={
//           pathname === href ? "font-semibold" : "text-muted-foreground"
//         }
//       >
//         {text}
//       </Link>
//     </li>
//   );
// }
