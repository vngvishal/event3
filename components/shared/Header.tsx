// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
// import Image from "next/image"
// import Link from "next/link"
// import { Button } from "../ui/button"
// import NavItems from "./NavItems"
// import MobileNav from "./MobileNav"

// const Header = () => {
//   return (
//     <header className="w-full border-b">
//       <div className="wrapper flex items-center justify-between">
//         <Link href="/" className="w-36">
        
//           <Image 
//             src="/assets/images/me_logo.png" width={60} height={25}
//             alt="myEvents logo" 
            
//           />
          
//         </Link>

//         <SignedIn>
//           <nav className="md:flex-between hidden w-full max-w-xs">
//             <NavItems />
//           </nav>
//         </SignedIn>

//         <div className="flex w-32 justify-end gap-3">
//           <SignedIn>
//             <UserButton afterSignOutUrl="/" />
//             <MobileNav />
//           </SignedIn>
//           <SignedOut>
//             <Button asChild className="rounded-full" size="lg">
//               <Link href="/sign-in">
//                 Login
//               </Link>
//             </Button>
//           </SignedOut>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default Header


// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import Link from "next/link";
// import { Button } from "../ui/button";
// import NavItems from "./NavItems";
// import MobileNav from "./MobileNav";

// const Header = () => {
//   return (
//     <header className="w-full border-b">
//       <div className="wrapper flex items-center justify-between">
//         {/* Logo removed by setting div with no content */}
//         <div className="w-36" />

//         {/* Signed-in Navigation */}
//         <SignedIn>
//           <nav className="md:flex-between hidden w-full max-w-md gap-6">
//             <NavItems />
//             <Link href="/orders" className="text-sm font-medium hover:text-primary-500 max-w-md">
//               Orders
//             </Link>
//           </nav>
//         </SignedIn>

//         {/* Right Side Controls */}
//         <div className="flex w-32 justify-end gap-3">
//           <SignedIn>
//             <UserButton afterSignOutUrl="/" />
//             <MobileNav />
//           </SignedIn>
//           <SignedOut>
//             <Button asChild className="rounded-full" size="lg">
//               <Link href="/sign-in">Login</Link>
//             </Button>
//           </SignedOut>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


"use client";

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = () => {
  const { user } = useUser();

  // Check for admin role from Clerk custom claim (you can adjust this path based on your JWT template)
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        {/* Placeholder for logo spacing */}
        <div className="w-36" />

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xl gap-6">
            <NavItems />

            {isAdmin && (
              <>
                <Link href="/orders" className="text-sm font-medium hover:text-primary">
                  Orders
                </Link>
                <Link href="/events/create" className="text-sm font-medium hover:text-primary">
                  Create Event
                </Link>
              </>
            )}
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;


