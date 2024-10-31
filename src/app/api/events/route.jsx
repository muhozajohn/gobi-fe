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
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.date) {
      return NextResponse.json(
        { error: 'Title and date are required' },
        { status: 400 }
      );
    }

    const response = await http.post('/events', body, {
      headers: { Authorization: token }
    });

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}