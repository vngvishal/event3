// import { Schema, model, models } from "mongoose";

// const UserSchema = new Schema({
//   clerkId: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   username: { type: String, required: true, unique: true },
//   firstName: { type: String, required: true },
//   lastName: {type: String, required: true },
//   photo: { type: String, required: true },
// })

// const User = models.User || model('User', UserSchema);

// export default User;

// import { Schema, model, models } from "mongoose";

// const UserSchema = new Schema({
//   clerkId: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   username: { type: String, required: true, unique: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   photo: { type: String, required: false }, // <-- optional now
// });


// const User = models.User || model('User', UserSchema);

// export default User;


// lib/database/models/user.model.ts
// lib/database/models/user.model.ts

// import { Schema, model, models, Document, Types } from 'mongoose'
// import { IUser } from '@/types'

// interface IUserDocument extends IUser, Document {}

// const UserSchema = new Schema<IUserDocument>({
//   clerkId: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   username: { type: String, required: true, unique: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   photo: { type: String }, // optional
//   orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
//   events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
// })

// const User = models.User || model<IUserDocument>('User', UserSchema)

// export default User



// import { Schema, model, models, Document, Types } from 'mongoose'
// import { IUser } from '@/types'

// export interface IUserDocument extends IUser, Document {}

// const UserSchema = new Schema<IUserDocument>({
//   clerkId: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   username: { type: String, required: true, unique: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   photo: { type: String }, // optional
//   orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
//   events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
// })

// const User = models.User || model<IUserDocument>('User', UserSchema)

// export default User


import '@/lib/database/models/user.model';
import { Schema, model, models, Document, Types } from 'mongoose';

// Interface for User Document
export interface IUserDocument extends Document {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo?: string;
  orders: Types.ObjectId[];
  events: Types.ObjectId[];
}

const UserSchema = new Schema<IUserDocument>({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String }, // Optional
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
});

// Model
const User = models.User || model<IUserDocument>('User', UserSchema);

export default User;
