// src/app/api/visits/route.js
import { NextResponse } from 'next/server';
import axiosInstance from '@/lib/axios';

export async function GET() {
  if (!process.env.MOCKAROO_API_KEY) {
    return NextResponse.json(
      { error: 'Missing Mockaroo API key' },
      { status: 500 }
    );
  }

  try {
    const response = await axiosInstance.get('/visits.json', {
      params: {
        key: process.env.MOCKAROO_API_KEY
      }
    });

    // Process and validate the data
    const visits = Array.isArray(response.data) ? response.data : [];
    
    // Process the data to ensure all required fields are present and formatted correctly
    const processedVisits = visits.map(visit => ({
      id: visit.id,
      date: new Date(visit.date).toISOString().split('T')[0],
      visitors: Number(visit.visitors) || 0,
      page_views: Number(visit.page_views) || 0,
      bounce_rate: Number(visit.bounce_rate) || 0,
      avg_session_duration: Number(visit.avg_session_duration) || 0
    }));

    // Add cache headers
    const headers = {
      'Cache-Control': 'private, max-age=300',
      'Content-Type': 'application/json',
    };

    return NextResponse.json(processedVisits, { headers });
  } catch (error) {
    console.error('Error fetching visits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visits data' },
      { status: 500 }
    );
  }
}