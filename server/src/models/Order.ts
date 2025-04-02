import { Schema, model, Document } from 'mongoose';

// Define an interface for the Address document
interface IAddress extends Document {
  street: string;
  city: string;
  state: string;
  zip: number;
  createdAt: Date;
}

// Define an interface for the Status document
interface IStatus extends Document {
  pending: string;
  scheduled: string;
  completed: string;
  denied: string;
}

// Define an interface for the Order document
interface IOrder extends Document {
  first_name: string;
  last_name: string;
  phone_number: number;
  email: string;
  createdAt: Date;
  start_date: Date;
  end_date: Date;
  atms: number;
  description: string;
  status: IStatus[];
  address: IAddress[];
}

// Define the schema for the Address subdocument
const addressSchema = new Schema<IAddress>(
  {
    street: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
  },
  {
    city: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    }
  },
  {
    state: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    }
  },
  {
    zip: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    }
  },
  {
    createdAt: {
      type: Date,
      default: Date.now,
      required: true
    }
  },
  {
    _id: false,
    toJSON: { getters: true },
    toObject: { getters: true },
    timestamps: true,
  }
);

// Define the schema for the Status subdocument
const statusSchema = new Schema<IStatus>(
  {
    pending: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
  },
  {
    scheduled: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
  },
  {
    completed: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
  },
  {
    denied: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
  },
  {
    _id: false,
    toJSON: { getters: true },
    toObject: { getters: true },
    timestamps: true,
  }
);

// Define the schema for the Order document
const orderSchema = new Schema<IOrder>(
  {
    first_name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    phone_number: {
      type: Number,
      required: true,
      minlength: 1,
      maxlength: 11,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    createdAt: {
      type: Date,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    start_date: {
      type: Date,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    end_date: {
      type: Date,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    atms: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500,
      trim: true,
    },
    address: [addressSchema],
    status: [statusSchema],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Order = model<IOrder>('Order', orderSchema);

export default Order;
