import Link from "next/link";
import SearchBar from "@/components/navbar/SearchBar";
import UserButton from "@/components/navbar/UserButton";

import { validateUser } from "@/actions/auth/validate-user";

const Navbar = async () => {
  const user = await validateUser();

  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
        <Link href="/" className="text-xl md:text-2xl font-bold text-primary">
          Z-SYNC
        </Link>

        <SearchBar />

        <UserButton user={user} />
      </div>
    </header>
  );
};
export default Navbar;
