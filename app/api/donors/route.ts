import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/connection';
import { Donor } from '@/lib/mongodb/models/Donor';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    
    // Build query
    const query = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ]
    } : {};

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const donors = await Donor.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Donor.countDocuments(query);

    return NextResponse.json({
      donors,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching donors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donors' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    // Create new donor
    const donor = await Donor.create(body);

    return NextResponse.json(donor, { status: 201 });
  } catch (error: any) {
    console.error('Error creating donor:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation Error', details: error.errors },
        { status: 400 }
      );
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create donor' },
      { status: 500 }
    );
  }
}