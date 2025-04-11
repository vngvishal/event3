// 'use client';

// import { headerLinks } from '@/constants'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React from 'react'

// const NavItems = () => {
//   const pathname = usePathname();

//   return (
//     <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
//       {headerLinks.map((link) => {
//         const isActive = pathname === link.route;
        
//         return (
//           <li
//             key={link.route}
//             className={`${
//               isActive && 'text-primary-500'
//             } flex-center p-medium-16 whitespace-nowrap`}
//           >
//             <Link  href={link.route}>{link.label}</Link>
//           </li>
//         )
//       })}
//     </ul>
//   )
// }

// export default NavItems




'use client';

import { headerLinks } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavItems = () => {
  const pathname = usePathname();

  const navLinkStyles =
    'text-base font-semibold px-3 py-1 rounded-md hover:text-primary transition-colors duration-200';

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li key={link.route}>
            <Link
              href={link.route}
              className={`${navLinkStyles} ${isActive ? 'text-primary-500' : ''}`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;



// NavItems.tsx

// 'use client';

// import { headerLinks } from '@/constants'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React from 'react'

// interface NavItemsProps {
//   userRole: string;
// }

// const NavItems: React.FC<NavItemsProps> = ({ userRole }) => {
//   const pathname = usePathname();

//   const filteredLinks = headerLinks.filter((link) => {
//     if (link.label === 'Create Event' && userRole !== 'admin') return false;
//     return true;
//   });

//   return (
//     <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
//       {filteredLinks.map((link) => {
//         const isActive = pathname === link.route;

//         return (
//           <li
//             key={link.route}
//             className={`${
//               isActive && 'text-primary-500'
//             } flex-center p-medium-16 whitespace-nowrap`}
//           >
//             <Link href={link.route}>{link.label}</Link>
//           </li>
//         )
//       })}
//     </ul>
//   )
// }

// export default NavItems;
