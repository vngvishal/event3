'use client';

import { Button } from '@/components/ui/button';

interface DownloadTicketButtonProps {
  orderId: string;
}

export default function DownloadTicketButton({ orderId }: DownloadTicketButtonProps) {
  const handleDownload = async () => {
    const response = await fetch(`/api/tickets/${orderId}`);

    if (!response.ok) {
      alert('Failed to download ticket');
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket-${orderId}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return <Button onClick={handleDownload}>Download Ticket</Button>;
}
