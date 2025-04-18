// models/Ticket.ts
import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  stripeId: { type: String, required: true, unique: true },
  totalAmount: { type: String, required: true },
  event: {
    _id: String,
    title: String,
  },
  buyer: {
    _id: String,
    firstName: String,
    lastName: String,
  },
}, { timestamps: true });

export default mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);
