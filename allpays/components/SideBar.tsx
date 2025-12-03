"use client";

import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { label: "대시보드", href: "/dashboard", src: "/dashboard.svg" },
  { label: "거래 내역", href: "/transactions", src: "/transactions.svg" },
  { label: "가맹점 목록", href: "/merchants", src: "/merchants.svg" },
];

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <aside className="bg-primary w-64 min-h-screen p-6 flex flex-col">
      <p className="text-lg font-semibold text-white mb-10 mt-4">
        (주)올페이즈
      </p>

      <nav className="flex-1">
        <ul className="flex flex-col gap-2 text-[#E2E8F0]">
          {navItems.map((item) => (
            <li
              key={item.label}
              onClick={() => router.push(item.href)}
              className={`
                flex gap-4 items-center
                cursor-pointer rounded-sm px-4 py-3
                transition-all
                hover:bg-[#1E293B]
                ${isActive(item.href) ? "bg-[#1e293b] font-semibold" : ""}
              `}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <img src={item.src} alt="icon" className="w-5 h-5" />
              </div>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
