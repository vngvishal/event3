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

//   // Safely extract userId
//   const userId = typeof sessionClaims?.userId === 'string' ? sessionClaims.userId : '';

//   // Safely extract role from publicMetadata
//   const userRole =
//     typeof sessionClaims?.publicMetadata === 'object' && sessionClaims?.publicMetadata !== null
//       ? (sessionClaims.publicMetadata as { role?: string })?.role
//       : undefined;

//   const isAdmin = userRole === 'admin';

//   const ordersPage = Number(searchParams?.ordersPage) || 1;
//   const eventsPage = Number(searchParams?.eventsPage) || 1;

//   // Get tickets only if not admin
//   const orders = !isAdmin ? await getOrdersByUser({ userId, page: ordersPage }) : null;
//   const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

//   // Get events organized (both user/admin can see their organized events)
//   const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

//   return (
//     <>
//       {/* Admins: Show Events Organized */}
//       {isAdmin ? (
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
//       ) : (
//         <>
//           {/* Users: Show My Tickets */}
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

//   // Safely extract userId
//   const userId = typeof sessionClaims?.userId === 'string' ? sessionClaims.userId : '';

//   // Safely extract role from publicMetadata
//   const userRole =
//     typeof sessionClaims?.publicMetadata === 'object' && sessionClaims?.publicMetadata !== null
//       ? (sessionClaims.publicMetadata as { role?: string })?.role
//       : undefined;

//   const isAdmin = userRole === 'admin';

//   const ordersPage = Number(searchParams?.ordersPage) || 1;
//   const eventsPage = Number(searchParams?.eventsPage) || 1;

//   // Get tickets only if not admin
//   const orders = !isAdmin ? await getOrdersByUser({ userId, page: ordersPage }) : null;
//   const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

//   // Get events organized (both user/admin can see their organized events)
//   const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

//   return (
//     <>
//       {/* Admins: Show Events Organized */}
//       {isAdmin ? (
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
//       ) : (
//         <>
//           {/* Users: Show My Tickets */}
//           <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
//             <div className="wrapper flex items-center justify-center sm:justify-between">
//               <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
//               <Button asChild size="lg" className="button hidden sm:flex">
//                 <Link href="/#events">Explore More Events</Link>
//               </Button>
//             </div>
//           </section>

//           <section className="wrapper my-8">
//             {/* Only display ordered events (tickets) if the user has any */}
//             <Collection
//               data={orderedEvents?.length ? orderedEvents : []} // Show tickets only if there are any
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

//   // Safely extract userId
//   const userId = typeof sessionClaims?.userId === 'string' ? sessionClaims.userId : null;

//   // If userId is invalid, return an error page
//   if (!userId) {
//     return (
//       <section className="wrapper py-10">
//         <h1>
//         Please register through the google.
//       </h1>
// {/*   <div className="flex flex-col items-center gap-10">
//   <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
//     <li className="flex justify-center">
//       <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
//         <a
//           className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
//           href="/events/67fd262652d50ad9b2e3b348"
//           style={{
//             backgroundImage:
//               'url("https://utfs.io/f/98d8b9bc-2faa-49d3-8279-0415d358614f-j40c76.jpg")',
//           }}
//         ></a>
//         <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
//           <p className="p-medium-16 p-medium-18 text-grey-500">Mon, Apr 14, 8:40 PM</p>
//           <a href="/events/67fd262652d50ad9b2e3b348">
//             <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
//               Concert
//             </p>
//           </a>
//           <div className="flex-between w-full">
//             <p className="p-medium-14 md:p-medium-16 text-grey-600"></p>
//           </div>
//         </div>
//       </div>
//     </li>
//   </ul>
// </div>*/}

//       </section>
//     );
//   }

//   // Safely extract role from publicMetadata
//   const userRole =
//     typeof sessionClaims?.publicMetadata === 'object' && sessionClaims?.publicMetadata !== null
//       ? (sessionClaims.publicMetadata as { role?: string })?.role
//       : undefined;

//   const isAdmin = userRole === 'admin';

//   const ordersPage = Number(searchParams?.ordersPage) || 1;
//   const eventsPage = Number(searchParams?.eventsPage) || 1;

//   // Get tickets only if not admin
//   const orders = !isAdmin ? await getOrdersByUser({ userId, page: ordersPage }) : null;
//   const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

//   // Get events organized (both user/admin can see their organized events)
//   const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

//   return (
//     <>
//       {/* Admins: Show Events Organized */}
//       {isAdmin ? (
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
//       ) : (
//         <>
//           {/* Users: Show My Tickets */}
//           <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
//             <div className="wrapper flex items-center justify-center sm:justify-between">
//               <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
//               <Button asChild size="lg" className="button hidden sm:flex">
//                 <Link href="/#events">Explore More Events</Link>
//               </Button>
//             </div>
//           </section>

//           <section className="wrapper my-8">
//             {/* Only display ordered events (tickets) if the user has any */}
//             <Collection
//               data={orderedEvents?.length ? orderedEvents : []}
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
//     </>
//   );
// };

// export default ProfilePage;


import Collection from '@/components/shared/Collection';
import DownloadTicketButton from '@/components/shared/DownloadTicketButton';
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

  const userId = typeof sessionClaims?.userId === 'string' ? sessionClaims.userId : null;

  if (!userId) {
    return (
      <section className="wrapper py-10">
        <h1 className="font-bold text-red-500 text-4xl">
          Please register through Google(For Authentication purpose)
        </h1>
      </section>
    );
  }
  
  const userRole =
    typeof sessionClaims?.publicMetadata === 'object' && sessionClaims?.publicMetadata !== null
      ? (sessionClaims.publicMetadata as { role?: string })?.role
      : undefined;

  const isAdmin = userRole === 'admin';

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = !isAdmin ? await getOrdersByUser({ userId, page: ordersPage }) : null;
  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

  return (
    <>
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
          <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
              <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
              <Button asChild size="lg" className="button hidden sm:flex">
                <Link href="/#events">Explore More Events</Link>
              </Button>
            </div>
          </section>

          {/* <section className="wrapper my-8">
            {orders?.data?.length ? (
              <div className="grid grid-cols-1 gap-4">
                {orders.data.map((order: IOrder) => (
                  <div
                    key={String(order._id)}
                    className="border p-4 rounded-md shadow-md flex flex-col md:flex-row justify-between items-start"
                  >



<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-4 border rounded-xl shadow-sm">
  <div className="space-y-1">
    <h4 className="font-bold text-lg">{order.event.title}</h4>
    <p>
      <strong>Stripe ID:</strong> {order.stripeId}
    </p>
    <p>
      <strong>Total Paid:</strong> ₹{order.totalAmount}
    </p>
  </div>
  <div className="md:ml-6">
    <DownloadTicketButton orderId={String(order._id)} />
  </div>
</div>




                  


                  </div>
                ))}
              </div>
            ) : (
              <Collection
                data={[]}
                emptyTitle="No event tickets purchased yet"
                emptyStateSubtext="No worries - plenty of exciting events to explore!"
                collectionType="My_Tickets"
                limit={3}
                page={ordersPage}
                urlParamName="ordersPage"
                totalPages={orders?.totalPages}
              />
            )}
          </section> */}


<section className="wrapper my-8">
  {orders?.data?.length ? (
    <div className="grid grid-cols-1 gap-4">
      {orders.data.map((order: IOrder) => (
        <div
          key={String(order._id)}
          className="p-4 rounded-md shadow-md flex flex-col md:flex-row justify-between items-start"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-4 rounded-xl shadow-sm">
            <div className="space-y-1">
              <h4 className="font-bold text-lg">{order.event.title}</h4>
              <p className="text-sm md:text-base">
                <strong>Stripe ID:</strong>
                <span className="block w-48 truncate md:inline md:w-auto">{order.stripeId}</span>
              </p>
              <p className="text-sm md:text-base">
                <strong>Total Paid:</strong> ₹{order.totalAmount}
              </p>
            </div>
            <div className="md:ml-6 w-full md:w-auto">
              <DownloadTicketButton orderId={String(order._id)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Collection
      data={[]}
      emptyTitle="No event tickets purchased yet"
      emptyStateSubtext="No worries - plenty of exciting events to explore!"
      collectionType="My_Tickets"
      limit={3}
      page={ordersPage}
      urlParamName="ordersPage"
      totalPages={orders?.totalPages}
    />
  )}
</section>


        </>
      )}
    </>
  );
};

export default ProfilePage;
