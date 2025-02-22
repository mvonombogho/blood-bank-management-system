# Project Structure Documentation

## Complete Project Tree
```
blood-bank-management/
├── app/                      # Next.js 14 App Router directory
│   ├── page.tsx             # Home page
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── donors/             # Donor management pages
│   │   ├── page.tsx        # Donors list page
│   │   ├── [id]/           # Dynamic donor routes
│   │   │   └── page.tsx    # Individual donor page
│   │   ├── create/         # Create donor page
│   │   │   └── page.tsx
│   │   └── layout.tsx      # Donor pages layout
│   ├── inventory/          # Inventory management pages
│   │   ├── page.tsx
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── recipients/         # Recipient management pages
│   │   ├── page.tsx
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   └── api/                # API Routes
│       ├── auth/           # Authentication endpoints
│       │   └── [...nextauth]/
│       │       └── route.ts
│       ├── donors/         # Donor API endpoints
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       ├── inventory/      # Inventory API endpoints
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       └── recipients/     # Recipient API endpoints
│           ├── route.ts
│           └── [id]/
│               └── route.ts

├── components/             # React components
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── donors/            # Donor-related components
│   │   ├── DonorForm.tsx
│   │   ├── DonorList.tsx
│   │   └── DonorCard.tsx
│   ├── inventory/         # Inventory-related components
│   │   ├── InventoryGrid.tsx
│   │   ├── BloodTypeCard.tsx
│   │   └── StockAlert.tsx
│   ├── recipients/        # Recipient-related components
│   │   ├── RecipientForm.tsx
│   │   └── RecipientList.tsx
│   └── ui/               # Shared UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       └── Table.tsx

├── lib/                   # Shared utilities and configurations
│   ├── mongodb/          # MongoDB configuration
│   │   ├── connection.ts
│   │   └── models/      # Mongoose models
│   │       ├── Donor.ts
│   │       ├── BloodUnit.ts
│   │       └── Recipient.ts
│   └── utils/           # Utility functions
│       ├── validation.ts
│       ├── formatting.ts
│       └── api.ts

├── types/               # TypeScript type definitions
│   ├── donor.ts
│   ├── inventory.ts
│   └── recipient.ts

└── public/             # Static files
    ├── images/
    └── icons/
```

## Frontend Structure (Client-Side)

### Components Organization
```typescript
// components/donors/DonorForm.tsx
import { useState } from 'react';
import { Button, Input } from '../ui';

export const DonorForm = () => {
  // Component logic
};

// components/inventory/InventoryGrid.tsx
import { BloodTypeCard, StockAlert } from './';

export const InventoryGrid = () => {
  // Component logic
};
```

### Page Structure
```typescript
// app/donors/page.tsx
import { DonorList } from '@/components/donors';

export default function DonorsPage() {
  return (
    <div>
      <h1>Donors Management</h1>
      <DonorList />
    </div>
  );
}
```

## Server-Side Structure

### API Routes
```typescript
// app/api/donors/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb/connection';
import { Donor } from '@/lib/mongodb/models/Donor';

export async function GET() {
  try {
    await connectToDatabase();
    const donors = await Donor.find({});
    return NextResponse.json(donors);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch donors' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const donor = await Donor.create(body);
    return NextResponse.json(donor);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create donor' },
      { status: 500 }
    );
  }
}
```

### MongoDB Models
```typescript
// lib/mongodb/models/Donor.ts
import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bloodType: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  lastDonation: Date,
  donations: [{
    date: Date,
    units: Number,
    bloodType: String,
  }],
}, {
  timestamps: true,
});

export const Donor = mongoose.models.Donor || mongoose.model('Donor', donorSchema);

// lib/mongodb/models/BloodUnit.ts
import mongoose from 'mongoose';

const bloodUnitSchema = new mongoose.Schema({
  bloodType: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  units: {
    type: Number,
    required: true,
    min: 0,
  },
  location: String,
  donationDate: Date,
  expiryDate: Date,
  status: {
    type: String,
    enum: ['available', 'reserved', 'used', 'expired'],
    default: 'available',
  },
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',
  },
}, {
  timestamps: true,
});

export const BloodUnit = mongoose.models.BloodUnit || mongoose.model('BloodUnit', bloodUnitSchema);
```

### Database Connection
```typescript
// lib/mongodb/connection.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
```

## Environment Configuration
```env
# .env.local
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```