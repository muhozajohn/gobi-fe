import { NextResponse } from 'next/server';
import http from '@/lib/axios';


// GET - List events with pagination
export async function GET() {
  try {
    const response = await http.get('/booking');

    return NextResponse.json({
      data: response.data
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}