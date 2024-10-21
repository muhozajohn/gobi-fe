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
    const response = await axiosInstance.get('/metrics.json', {
      params: {
        key: process.env.MOCKAROO_API_KEY
      }
    });

    const data = response.data;

    // Check if response is an array and has valid data
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: 'Invalid data format or no data found' },
        { status: 500 }
      );
    }

    const latestMetric = data.reduce((prev, current) => {
      const prevDate = new Date(prev.timestamp);
      const currentDate = new Date(current.timestamp);
      return currentDate > prevDate ? current : prev;
    });

    return NextResponse.json(latestMetric);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}