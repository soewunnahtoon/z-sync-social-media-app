import Navbar from "@/components/navbar";
import MenuBar from "@/components/menu-bar";

import { redirect } from "next/navigation";
import { validateUser } from "@/actions/auth/validate-user";

const RootLayout = async ({ children }: ChildrenProp) => {
  const user = await validateUser();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="mx-auto flex w-full max-w-7xl grow gap-2 p-2">
        <MenuBar className="sticky top-16 hidden h-fit flex-none space-y-2 rounded-2xl bg-card p-2 shadow-sm sm:block lg:px-4 xl:w-60" />

        {children}
      </div>

      <MenuBar className="sticky bottom-0 flex w-full justify-center gap-4 border-t bg-card p-2 sm:hidden" />
    </div>
  );
};
export default RootLayout;
