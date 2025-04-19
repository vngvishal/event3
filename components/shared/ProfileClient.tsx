'use client';

import Collection from '@/components/shared/Collection';
import DownloadTicketButton from '@/components/shared/DownloadTicketButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { IOrder } from '@/lib/database/models/order.model';

interface ProfileClientProps {
  dbUser: any;
  userId: string;
  isAdmin: boolean;
  orders: any;
  organizedEvents: any;
  ordersPage: number;
  eventsPage: number;
}

export default function ProfileClient({
  dbUser,
  userId,
  isAdmin,
  orders,
  organizedEvents,
  ordersPage,
  eventsPage,
}: ProfileClientProps) {
  if (!dbUser) {
    return (
      <section className="wrapper py-10">
        <h1 className="font-bold text-red-500 text-4xl">
          Please register through Google (For Authentication purpose)
        </h1>
      </section>
    );
  }

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

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
                          <span className="block w-48 truncate md:inline md:w-auto">
                            {order.stripeId}
                          </span>
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
}
