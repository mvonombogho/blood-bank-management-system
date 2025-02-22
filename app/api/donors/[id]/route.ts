import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/connection';
import { Donor } from '@/lib/mongodb/models/Donor';

// Get a single donor
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const donor = await Donor.findById(params.id);
    
    if (!donor) {
      return NextResponse.json(
        { error: 'Donor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(donor);
  } catch (error) {
    console.error('Error fetching donor:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donor' },
      { status: 500 }
    );
  }
}

// Update a donor
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const donor = await Donor.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!donor) {
      return NextResponse.json(
        { error: 'Donor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(donor);
  } catch (error: any) {
    console.error('Error updating donor:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation Error', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update donor' },
      { status: 500 }
    );
  }
}

// Delete a donor
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const donor = await Donor.findByIdAndDelete(params.id);

    if (!donor) {
      return NextResponse.json(
        { error: 'Donor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Donor deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting donor:', error);
    return NextResponse.json(
      { error: 'Failed to delete donor' },
      { status: 500 }
    );
  }
}