// import { Document, Schema, model, models } from "mongoose";

// export interface IEvent extends Document {
//   _id: string;
//   title: string;
//   description?: string;
//   location?: string;
//   createdAt: Date;
//   imageUrl: string;
//   startDateTime: Date;
//   endDateTime: Date;
//   price: string;
//   isFree: boolean;
//   url?: string;
//   category: { _id: string, name: string }
//   organizer: { _id: string, firstName: string, lastName: string }
// }

// const EventSchema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   location: { type: String },
//   createdAt: { type: Date, default: Date.now },
//   imageUrl: { type: String, required: true },
//   startDateTime: { type: Date, default: Date.now },
//   endDateTime: { type: Date, default: Date.now },
//   price: { type: String },
//   isFree: { type: Boolean, default: false },
//   url: { type: String },
//   category: { type: Schema.Types.ObjectId, ref: 'Category' },
//   organizer: { type: Schema.Types.ObjectId, ref: 'User' },
// })

// const Event = models.Event || model('Event', EventSchema);

// export default Event;



// import { Schema, model, models, Document, Types } from 'mongoose';

// // Interface for Event
// export interface IEvent extends Document {
//   title: string;
//   description?: string;
//   location?: string;
//   createdAt: Date;
//   imageUrl: string;
//   startDateTime: Date;
//   endDateTime: Date;
//   price: string;
//   isFree: boolean;
//   url?: string;
//   category: Types.ObjectId;  // Reference to Category
//   organizer: Types.ObjectId;  // Reference to User
// }

// const EventSchema = new Schema<IEvent>({
//   title: { type: String, required: true },
//   description: { type: String },
//   location: { type: String },
//   createdAt: { type: Date, default: Date.now },
//   imageUrl: { type: String, required: true },
//   startDateTime: { type: Date, default: Date.now },
//   endDateTime: { type: Date, default: Date.now },
//   price: { type: String },
//   isFree: { type: Boolean, default: false },
//   url: { type: String },
//   category: { type: Schema.Types.ObjectId, ref: 'Category' },
//   organizer: { type: Schema.Types.ObjectId, ref: 'User' },
// });

// // Model
// const Event = models.Event || model<IEvent>('Event', EventSchema);

// export default Event;

// import '@/lib/database/models/user.model';
import mongoose,{ Schema, model, models, Document, Types } from 'mongoose';

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price: string;
  isFree: boolean;
  url?: string;
  category: { _id: string, name: string }
    organizer: { _id: string, firstName: string, lastName: string }
}

const EventSchema = new Schema<IEvent>({
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String, required: true },
    startDateTime: { type: Date, default: Date.now },
    endDateTime: { type: Date, default: Date.now },
    price: { type: String },
    isFree: { type: Boolean, default: false },
    url: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    organizer: { type: Schema.Types.ObjectId, ref: 'User' },
  });
const Event = models?.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;
