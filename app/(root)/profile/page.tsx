// import Collection from '@/components/shared/Collection'
// import { Button } from '@/components/ui/button'
// import { getEventsByUser } from '@/lib/actions/event.actions'
// import { getOrdersByUser } from '@/lib/actions/order.actions'
// import { IOrder } from '@/lib/database/models/order.model'
// import { SearchParamProps } from '@/types'
// import { auth } from '@clerk/nextjs/server'; 
// import Link from 'next/link'
// import React from 'react'

// const ProfilePage = async ({ searchParams }: SearchParamProps) => {
//   const { sessionClaims } = auth();
//   const userId = sessionClaims?.userId as string;

//   const ordersPage = Number(searchParams?.ordersPage) || 1;
//   const eventsPage = Number(searchParams?.eventsPage) || 1;

//   const orders = await getOrdersByUser({ userId, page: ordersPage})

//   const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
//   const organizedEvents = await getEventsByUser({ userId, page: eventsPage })

//   return (
//     <>
//       {/* My Tickets */}
//       <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
//         <div className="wrapper flex items-center justify-center sm:justify-between">
//           <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
//           <Button asChild size="lg" className="button hidden sm:flex">
//             <Link href="/#events">
//               Explore More Events
//             </Link>
//           </Button>
//         </div>
//       </section>

//       <section className="wrapper my-8">
//         <Collection 
//           data={orderedEvents}
//           emptyTitle="No event tickets purchased yet"
//           emptyStateSubtext="No worries - plenty of exciting events to explore!"
//           collectionType="My_Tickets"
//           limit={3}
//           page={ordersPage}
//           urlParamName="ordersPage"
//           totalPages={orders?.totalPages}
//         />
//       </section>

//       {/* Events Organized */}
//       <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
//         <div className="wrapper flex items-center justify-center sm:justify-between">
//           <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
//           <Button asChild size="lg" className="button hidden sm:flex">
//             <Link href="/events/create">
//               Create New Event
//             </Link>
//           </Button>
//         </div>
//       </section>

//       <section className="wrapper my-8">
//         <Collection 
//           data={organizedEvents?.data}
//           emptyTitle="No events have been created yet"
//           emptyStateSubtext="Go create some now"
//           collectionType="Events_Organized"
//           limit={3}
//           page={eventsPage}
//           urlParamName="eventsPage"
//           totalPages={organizedEvents?.totalPages}
//         />
//       </section>
//     </>
//   )
// }

// export default ProfilePage


// import Collection from '@/components/shared/Collection';
// import { Button } from '@/components/ui/button';
// import { getEventsByUser } from '@/lib/actions/event.actions';
// import { getOrdersByUser } from '@/lib/actions/order.actions';
// import { IOrder } from '@/lib/database/models/order.model';
// import { SearchParamProps } from '@/types';
// import { auth } from '@clerk/nextjs/server'; 
// import Link from 'next/link';
// import React from 'react';

// const ProfilePage = async ({ searchParams }: SearchParamProps) => {
//   const { sessionClaims } = auth();
//   const userId = sessionClaims?.userId as string;
//   const userRole = sessionClaims?.publicMetadata?.role;

//   const ordersPage = Number(searchParams?.ordersPage) || 1;
//   const eventsPage = Number(searchParams?.eventsPage) || 1;

//   const isAdmin = userRole === 'admin';

//   let orders = null;
//   let orderedEvents = [];

//   if (!isAdmin) {
//     orders = await getOrdersByUser({ userId, page: ordersPage });
//     orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
//   }

//   const organizedEvents = isAdmin
//     ? await getEventsByUser({ userId, page: eventsPage })
//     : null;

//   return (
//     <>
//       {/* My Tickets - for regular users only */}
//       {!isAdmin && (
//         <>
//           <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
//             <div className="wrapper flex items-center justify-center sm:justify-between">
//               <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
//               <Button asChild size="lg" className="button hidden sm:flex">
//                 <Link href="/#events">Explore More Events</Link>
//               </Button>
//             </div>
//           </section>

//           <section className="wrapper my-8">
//             <Collection
//               data={orderedEvents}
//               emptyTitle="No event tickets purchased yet"
//               emptyStateSubtext="No worries - plenty of exciting events to explore!"
//               collectionType="My_Tickets"
//               limit={3}
//               page={ordersPage}
//               urlParamName="ordersPage"
//               totalPages={orders?.totalPages}
//             />
//           </section>
//         </>
//       )}

//       {/* Events Organized - for admins only */}
//       {isAdmin && (
//         <>
//           <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
//             <div className="wrapper flex items-center justify-center sm:justify-between">
//               <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
//               <Button asChild size="lg" className="button hidden sm:flex">
//                 <Link href="/events/create">Create New Event</Link>
//               </Button>
//             </div>
//           </section>

//           <section className="wrapper my-8">
//             <Collection
//               data={organizedEvents?.data}
//               emptyTitle="No events have been created yet"
//               emptyStateSubtext="Go create some now"
//               collectionType="Events_Organized"
//               limit={3}
//               page={eventsPage}
//               urlParamName="eventsPage"
//               totalPages={organizedEvents?.totalPages}
//             />
//           </section>
//         </>
//       )}
//     </>
//   );
// };

// export default ProfilePage;

// import Collection from '@/components/shared/Collection';
// import { Button } from '@/components/ui/button';
// import { getEventsByUser } from '@/lib/actions/event.actions';
// import { getOrdersByUser } from '@/lib/actions/order.actions';
// import { IOrder } from '@/lib/database/models/order.model';
// import { SearchParamProps } from '@/types';
// import { auth } from '@clerk/nextjs/server'; 
// import Link from 'next/link';
// import React from 'react';

// const ProfilePage = async ({ searchParams }: SearchParamProps) => {
//   const { sessionClaims } = auth();
//   const userId = sessionClaims?.userId as string;

//   const ordersPage = Number(searchParams?.ordersPage) || 1;
//   const eventsPage = Number(searchParams?.eventsPage) || 1;

//   const orders = await getOrdersByUser({ userId, page: ordersPage });
//   const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

//   const showTickets = orderedEvents.length > 0;

//   const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

//   return (
//     <>
//       {/* Show My Tickets if user has bought any */}
//       {showTickets ? (
//         <>
//           <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
//             <div className="wrapper flex items-center justify-center sm:justify-between">
//               <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
//               <Button asChild size="lg" className="button hidden sm:flex">
//                 <Link href="/#events">Explore More Events</Link>
//               </Button>
//             </div>
//           </section>

//           <section className="wrapper my-8">
//             <Collection
//               data={orderedEvents}
//               emptyTitle="No event tickets purchased yet"
//               emptyStateSubtext="No worries - plenty of exciting events to explore!"
//               collectionType="My_Tickets"
//               limit={3}
//               page={ordersPage}
//               urlParamName="ordersPage"
//               totalPages={orders?.totalPages}
//             />
//           </section>
//         </>
//       ) : (
//         <>
//           {/* Show Events Organized if no tickets found */}
//           <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
//             <div className="wrapper flex items-center justify-center sm:justify-between">
//               <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
//               <Button asChild size="lg" className="button hidden sm:flex">
//                 <Link href="/events/create">Create New Event</Link>
//               </Button>
//             </div>
//           </section>

//           <section className="wrapper my-8">
//             <Collection
//               data={organizedEvents?.data}
//               emptyTitle="No events have been created yet"
//               emptyStateSubtext="Go create some now"
//               collectionType="Events_Organized"
//               limit={3}
//               page={eventsPage}
//               urlParamName="eventsPage"
//               totalPages={organizedEvents?.totalPages}
//             />
//           </section>
//         </>
//       )}
//     </>
//   );
// };

// export default ProfilePage;




import Collection from '@/components/shared/Collection';
import { Button } from '@/components/ui/button';
import { getEventsByUser } from '@/lib/actions/event.actions';
import { getOrdersByUser } from '@/lib/actions/order.actions';
import { IOrder } from '@/lib/database/models/order.model';
import { SearchParamProps } from '@/types';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react';

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();

  // Safely extract userId
  const userId = typeof sessionClaims?.userId === 'string' ? sessionClaims.userId : '';

  // Safely extract role from publicMetadata
  const userRole =
    typeof sessionClaims?.publicMetadata === 'object' && sessionClaims?.publicMetadata !== null
      ? (sessionClaims.publicMetadata as { role?: string })?.role
      : undefined;

  const isAdmin = userRole === 'admin';

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  // Get tickets only if not admin
  const orders = !isAdmin ? await getOrdersByUser({ userId, page: ordersPage }) : null;
  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

  // Get events organized (both user/admin can see their organized events)
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

  return (
    <>
      {/* Admins: Show Events Organized */}
      {isAdmin ? (
        <>
          <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
              <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
              <Button asChild size="lg" className="button hidden sm:flex">
                <Link href="/events/create">Create New Event</Link>
              </Button>
            </div>
          </section>

          <section className="wrapper my-8">
            <Collection
              data={organizedEvents?.data}
              emptyTitle="No events have been created yet"
              emptyStateSubtext="Go create some now"
              collectionType="Events_Organized"
              limit={3}
              page={eventsPage}
              urlParamName="eventsPage"
              totalPages={organizedEvents?.totalPages}
            />
          </section>
        </>
      ) : (
        <>
          {/* Users: Show My Tickets */}
          <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
              <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
              <Button asChild size="lg" className="button hidden sm:flex">
                <Link href="/#events">Explore More Events</Link>
              </Button>
            </div>
          </section>

          <section className="wrapper my-8">
            <Collection
              data={orderedEvents}
              emptyTitle="No event tickets purchased yet"
              emptyStateSubtext="No worries - plenty of exciting events to explore!"
              collectionType="My_Tickets"
              limit={3}
              page={ordersPage}
              urlParamName="ordersPage"
              totalPages={orders?.totalPages}
            />
          </section>
        </>
      )}
    </>
  );
};

export default ProfilePage;





