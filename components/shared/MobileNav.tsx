// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"
// import Image from "next/image"
// import { Separator } from "../ui/separator"
// import NavItems from "./NavItems"


// const MobileNav = () => {
//   return (
//     <nav className="md:hidden">
//       <Sheet>
//         <SheetTrigger className="align-middle">
//           <Image 
//             src="/assets/icons/menu.svg"
//             alt="menu"
//             width={24}
//             height={24}
//             className="cursor-pointer"
//           />
//         </SheetTrigger>
//         <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
//           <Image 
//             src="/assets/images/me_logo.png"
//             alt="logo"
//             width={60}
//             height={25}
//           />
//           <Separator className="border border-gray-50" />
//           <NavItems />
//         </SheetContent>
//       </Sheet>
//     </nav>
//   )
// }

// export default MobileNav


import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";
import Link from "next/link";

interface MobileNavProps {
  isAdmin: boolean;
}

const MobileNav = ({ isAdmin }: MobileNavProps) => {
  // Define consistent link styles for mobile nav
  const navLinkStyles =
    "text-base font-semibold px-3 py-1 rounded-md hover:text-primary transition-colors duration-200";

  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden p-4">
          <div className="flex justify-left">
            <Image
              src="/assets/images/mlg.png"
              alt="logo"
              width={60}
              height={25}
            />
          </div>
          <Separator className="border border-gray-50" />
          
          {/* Standard NavItems */}
          <NavItems />

          {/* Conditional rendering for Admin with similar layout */}
          {isAdmin && (
            <ul className="flex flex-col items-start gap-5 md:flex-row">
              <li>
                <Link
                  href="/orders"
                  className={navLinkStyles} // Applying the same style
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/events/create"
                  className={navLinkStyles} // Applying the same style
                >
                  Create Event
                </Link>
              </li>
            </ul>
          )}
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
