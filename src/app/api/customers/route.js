// src/app/api/customers/route.js
import { NextResponse } from 'next/server';
import axiosInstance from '@/lib/axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  if (!process.env.MOCKAROO_API_KEY) {
    return NextResponse.json(
      { error: 'Missing Mockaroo API key' },
      { status: 500 }
    );
  }
  
  try {
    const response = await axiosInstance.get('/customers.json', {
      params: {
        key: process.env.MOCKAROO_API_KEY,
        page,
        limit
      }
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}