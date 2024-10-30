import { NextResponse } from 'next/server';
import http from '@/lib/axios';
import { headers } from 'next/headers';

// GET - Fetch single event
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const response = await http.get(`/events/${id}`);

    if (!response.data) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

// PUT - Update event
export async function PUT(request, { params }) {
  const { id } = params;
  const headersList = headers();
  const token = headersList.get('authorization');

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.date) {
      return NextResponse.json(
        { error: 'Title and date are required' },
        { status: 400 }
      );
    }

    const response = await http.put(`/events/${id}`, body, {
      headers: { Authorization: token }
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE - Delete event
export async function DELETE(request, { params }) {
  const { id } = params;
  const headersList = headers();
  const token = headersList.get('authorization');

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    await http.delete(`/events/${id}`, {
      headers: { Authorization: token }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}