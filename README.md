# Fixwala.com - MERN Stack Application

A full-stack web application for booking home repair services built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Features

- **Service Booking System**: Browse and book various home repair services
- **Real-time Updates**: Instant booking confirmations and status updates
- **RESTful API**: Well-structured backend API for service and booking management
- **Responsive Design**: Mobile-friendly user interface
- **Database Integration**: MongoDB for persistent data storage

## 📋 Services Offered

- Appliance Repair (AC, Washing Machines, Refrigerators)
- Electrical Work (Wiring, Installations, Safety Checks)
- Plumbing (Leak Fixes, Installations, Drainage Solutions)

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM for navigation
- Axios for API calls
- CSS3 for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS for cross-origin requests
- dotenv for environment variables

## 📁 Project Structure

```
fixwala-website/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── services/      # API service functions
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── controllers/       # Route controllers
│   ├── server.js          # Server entry point
│   └── package.json
├── .replit                # Replit configuration
├── replit.nix            # Replit environment
└── package.json          # Root package file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GULSHAN-STACK20/Fixwala-website.git
   cd Fixwala-website
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**

   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/fixwala
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the development servers**

   For concurrent frontend and backend:
   ```bash
   npm run dev
   ```

   Or run them separately:
   ```bash
   # Terminal 1 - Backend
   npm run server

   # Terminal 2 - Frontend
   npm run client
   ```

### Running on Replit

1. **Import the project to Replit**
   - Go to [Replit](https://replit.com)
   - Click "Create Repl"
   - Select "Import from GitHub"
   - Enter the repository URL: `https://github.com/GULSHAN-STACK20/Fixwala-website`

2. **Set up secrets (environment variables)**
   - Click on the "Secrets" tab (lock icon) in Replit
   - Add the following secrets:
     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=5000
     ```

3. **Run the application**
   - Click the "Run" button
   - Replit will automatically execute the commands defined in `.replit`

## 🔌 API Endpoints

### Services
- `GET /api/services` - Get all active services
- `GET /api/services/:id` - Get a specific service
- `POST /api/services` - Create a new service
- `PUT /api/services/:id` - Update a service
- `DELETE /api/services/:id` - Delete a service

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get a specific booking
- `POST /api/bookings` - Create a new booking
- `PATCH /api/bookings/:id/status` - Update booking status
- `DELETE /api/bookings/:id` - Delete a booking

### Health Check
- `GET /api/health` - Check server status

## 🗄️ Database Schema

### Service Model
```javascript
{
  name: String,
  description: String,
  icon: String,
  price: Number,
  duration: String,
  category: String,
  isActive: Boolean,
  timestamps: true
}
```

### Booking Model
```javascript
{
  customerName: String,
  email: String,
  phone: String,
  address: String,
  service: ObjectId (ref: 'Service'),
  scheduledDate: Date,
  scheduledTime: String,
  status: String,
  notes: String,
  timestamps: true
}
```

## 🌐 Deployment

### Deploying to Heroku

1. Create a Heroku account and install the Heroku CLI
2. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```

3. Set up MongoDB (MongoDB Atlas recommended)
4. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   ```

5. Deploy:
   ```bash
   git push heroku main
   ```

### Deploying on Replit

Replit deployment is straightforward:
1. Ensure all environment variables are set in Secrets
2. Click "Deploy" in the Replit interface
3. Follow the deployment wizard

## 🧪 Testing the API

You can test the API endpoints using tools like:
- Postman
- Thunder Client (VS Code extension)
- curl commands

Example curl request:
```bash
# Get all services
curl http://localhost:5000/api/services

# Create a booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "123 Main St",
    "service": "service_id_here",
    "scheduledDate": "2024-03-20",
    "scheduledTime": "09:00-12:00"
  }'
```

## 📝 Seeding the Database (Optional)

To populate the database with sample services, you can create a seed script or use the API to add services manually.

Example service creation:
```bash
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "AC Repair",
    "description": "Expert AC repair and maintenance services",
    "icon": "❄️",
    "price": 500,
    "duration": "1-2 hours",
    "category": "appliance"
  }'
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👥 Contact

For any queries or support, please contact through GitHub issues.

## 🙏 Acknowledgments

- Built with the MERN stack
- Designed for easy deployment on Replit
- Inspired by modern home service platforms

---

**Happy Coding! 🚀**
