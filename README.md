# CRM Dashboard with Next.js

A modern, responsive CRM dashboard built with Next.js, featuring website analytics visualization and customer data management.

- Landing Page Preview
  ![image](https://github.com/user-attachments/assets/f63619c8-dc73-4d9b-a4ed-0b7c89c739f7)
  ![image](https://github.com/user-attachments/assets/4b87038b-9675-4134-9400-d6e04649860d)

- Dashboard Preview
  ![image](https://github.com/user-attachments/assets/a5f676db-c31b-468b-9671-661d3e680ae7)
  ![image](https://github.com/user-attachments/assets/13a97229-eea2-4e7c-ab70-b2808fa83c8e)


## Features

- **Real-time Analytics Dashboard**
  - Website visit statistics
  - Bounce rate tracking
  - Session duration analysis
  - Interactive charts using Recharts

- **Customer Management**
  - Comprehensive customer data table
  - Advanced search and filtering
  - Pagination support
  - Real-time data updates

-  **Key Performance Metrics**
  - Total visitor count
  - Average session duration
  - Bounce rate analytics
  - Customer engagement metrics

## Tech Stack

- **Frontend**: Next.js 14, React
- **Styling**: Tailwind CSS, Shadcn/UI
- **Data Visualization**: Recharts
- **State Management**: React Query
- **Authentication**: NextAuth.js (coming soon)

## Live Demo

[View Live Demo](https://your-demo-url.com) (coming soon)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Mockaroo API key (for data simulation)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/muhozajohn/Bouletteproof-fe.git
cd Bouletteproof-fe
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory:
```env
MOCKAROO_API_KEY=your_mockaroo_api_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.



## API Integration

The application uses Mockaroo API to simulate real CRM data. API endpoints include:

- `/api/visits` - Website visit statistics
- `/api/customers` - Customer data with pagination
- `/api/metrics` - Aggregated metrics

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests (coming soon)

### Environment Variables

Required environment variables:

```env
MOCKAROO_API_KEY=your_api_key
NEXT_PUBLIC_API_URL=your_api_url
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Roadmap

- [ ] Add authentication system
- [ ] Implement real-time updates
- [ ] Add export functionality
- [ ] Enhance search capabilities
- [ ] Add user roles and permissions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Mockaroo](https://www.mockaroo.com/)

## Contact

Portfolio Link:[Muhoza](https://muhoza.vercel.app/)

Project Link: [https://github.com/muhozajohn/Bouletteproof-fe](https://github.com/muhozajohn/Bouletteproof-fe)
