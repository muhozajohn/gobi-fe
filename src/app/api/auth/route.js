// src/api/auth.js
import { NextResponse } from 'next/server';
import http from '@/lib/axios';

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const response = await http.post('/users/auth', {
      email: body.email,
      password: body.password,
    });


    return NextResponse.json({
      message: 'Login Successful',
      user: response.data.data,
      token: response.data.token,
    }, { status: 200 });

  } catch (error) {
    if (error.response) {
      return NextResponse.json(
        { error: error.response.data.message || 'Login failed' },
        { status: error.response.status || 401 }
      );
    }

    return NextResponse.json(
      { error: 'Authentication service unavailable' },
      { status: 503 }
    );
  }
}
