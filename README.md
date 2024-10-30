# Event Management System

## Overview
This project is a simple Event Management System built with Next.js.

## Features
1. **Admin Capabilities**:
   - **Authentication**: Admins can log in to add, edit, or delete events.
   - **Event Creation**: Admins can create new events with a title, description, date, and available seats.

2. **User Capabilities**:
   - **Event Viewing and Booking**: Users can view all events and book available seats without authentication. Seat availability updates in real-time.

## Tech Stack
- **Frontend**: Next.js with server-side rendering
- **Backend**: Next.js API routes
- **Database**: Any database of your choice (SQL, NoSQL, or serverless)
- **Authentication**: NextAuth.js (for admin authentication)
- **Real-time Updates**: WebSockets or a real-time database solution

## Getting Started
1. Clone the repository:
```bash
git clone https://github.com/muhozajohn/gobi-fe.git
cd gobi-fe
```
2. Install dependencies:
```bash
npm install
# or
yarn install
```
3. Set up environment variables:
```
NEXT_PUBLIC_API_URL=your_api_url
```
4. Start the development server:
```bash
npm run dev
# or
yarn dev
```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Roadmap
- [ ] Add authentication system for admins
- [ ] Implement real-time seat availability updates
- [ ] Add export functionality for event data
- [ ] Enhance search and filtering capabilities
- [ ] Implement user roles and permissions

## Contact
Portfolio: [Muhoza](https://muhoza.vercel.app/)
Project Link: [https://github.com/muhozajohn/gobi-fe](https://github.com/muhozajohn/gobi-fe)
