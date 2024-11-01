import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import http from "@/lib/axios";

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
    const response = await http.delete(`/booking/${id}`, {
      headers: { Authorization: token }
    });

    if (response.status === 204 || response.status === 200) {
      return NextResponse.json({ message: 'Booking deleted successfully' }, { status: 200 });
    } else {
      throw new Error('Failed to delete booking');
    }
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete booking' },
      { status: error.response?.status || 500 }
    );
  }
}



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
    
    const response = await http.put(`/booking/${id}`, body, {
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
