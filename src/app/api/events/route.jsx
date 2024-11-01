import { NextResponse } from 'next/server';
import http from '@/lib/axios';
import { headers } from 'next/headers';

// GET - List events with pagination
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const search = searchParams.get('search') || '';

  try {
    const response = await http.get('/events', {
      params: {
        page,
        limit,
        search
      }
    });

    return NextResponse.json({
      data: response.data,
      pagination: {
        page,
        limit,
        total: response.headers['x-total-count'] || 0
      }
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST - Create new event
export async function POST(request) {
  const headersList = headers();
  const token = headersList.get('authorization');

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    
    const apiFormData = new FormData();
    
    for (const [key, value] of formData.entries()) {
      if (key === 'image' && value instanceof File) {
        apiFormData.append('image', value, value.name);
      } else {
        apiFormData.append(key, value);
      }
    }

    const response = await http.post('/events', apiFormData, {
      headers: { 
        Authorization: token,
      }
    });

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    let errorMessage = 'Failed to create event';
    
    // Handle specific error cases
    if (error.response) {
      errorMessage = error.response.data?.error || errorMessage;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: error.response?.status || 500 }
    );
  }
}
