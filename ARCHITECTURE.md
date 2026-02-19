# Fixwala.com - Project Architecture

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FIXWALA.COM SYSTEM                        │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────┐
│   CLIENT (React)     │◄───────►│   SERVER (Node.js)   │
│   Port: 3000         │  HTTP   │   Port: 5000         │
└──────────────────────┘         └──────────────────────┘
         │                                  │
         │                                  │
         ▼                                  ▼
┌──────────────────────┐         ┌──────────────────────┐
│  React Components    │         │    Express.js API    │
│  - Navbar            │         │    - /api/services   │
│  - Home              │         │    - /api/bookings   │
│  - Services          │         │    - /api/health     │
│  - BookService       │         └──────────────────────┘
└──────────────────────┘                    │
         │                                  │
         │                                  ▼
         │                        ┌──────────────────────┐
         │                        │   MongoDB (NoSQL)    │
         └───────────────────────►│   Database           │
              (Axios API calls)   │   - services         │
                                  │   - bookings         │
                                  └──────────────────────┘
```

## 🗂️ Detailed File Structure

```
fixwala-website/
│
├── 📱 CLIENT (Frontend - React)
│   ├── public/
│   │   └── index.html              # HTML template
│   │
│   └── src/
│       ├── components/
│       │   ├── Navbar.js           # Navigation component
│       │   └── Navbar.css          # Navigation styles
│       │
│       ├── pages/
│       │   ├── Home.js             # Landing page
│       │   ├── Services.js         # Services listing
│       │   └── BookService.js      # Booking form
│       │
│       ├── services/
│       │   └── api.js              # Axios API configuration
│       │
│       ├── App.js                  # Main app component
│       ├── App.css                 # App styles
│       ├── index.js                # React entry point
│       └── index.css               # Global styles
│
├── 🖥️ SERVER (Backend - Node.js/Express)
│   ├── models/
│   │   ├── Service.js              # Service schema
│   │   └── Booking.js              # Booking schema
│   │
│   ├── routes/
│   │   ├── services.js             # Service endpoints
│   │   └── bookings.js             # Booking endpoints
│   │
│   ├── controllers/                # (Future: Business logic)
│   │
│   ├── server.js                   # Express server setup
│   ├── seed.js                     # Database seeding script
│   ├── .env.example                # Environment template
│   └── package.json                # Server dependencies
│
├── 📚 DOCUMENTATION
│   ├── README.md                   # Project overview
│   ├── QUICKSTART.md               # Quick start guide
│   ├── DEPLOYMENT.md               # Deployment instructions
│   ├── CONTRIBUTING.md             # Contribution guidelines
│   └── ARCHITECTURE.md             # This file!
│
├── ⚙️ CONFIGURATION
│   ├── .replit                     # Replit configuration
│   ├── replit.nix                  # Replit environment
│   ├── .gitignore                  # Git ignore rules
│   ├── .env.example                # Environment template
│   └── package.json                # Root package file
│
├── 🛠️ UTILITIES
│   └── start.sh                    # Development start script
│
└── 📁 STATIC-SITE (Legacy)
    ├── index.html                  # Original static site
    ├── style.css
    ├── script.js
    └── hero-bg.png
```

## 🔄 Data Flow

### 1. Service Browsing Flow
```
User → Home Page → "View Services" Button
         ↓
    Services Page
         ↓
    API Call: GET /api/services
         ↓
    MongoDB Query (Service.find())
         ↓
    JSON Response with Services
         ↓
    Display Service Cards
```

### 2. Booking Creation Flow
```
User → Service Card → "Book Now" Button
         ↓
    Book Service Page (with form)
         ↓
    User fills form & submits
         ↓
    API Call: POST /api/bookings
         ↓
    Validate Data
         ↓
    Create Booking in MongoDB
         ↓
    Success Response
         ↓
    Show confirmation & redirect
```

## 🗄️ Database Schema

### Services Collection
```javascript
{
  _id: ObjectId,
  name: String,           // "AC Repair & Service"
  description: String,    // Service details
  icon: String,           // Emoji icon
  price: Number,          // Price in INR
  duration: String,       // "1-2 hours"
  category: String,       // "appliance" | "electrical" | "plumbing"
  isActive: Boolean,      // true/false
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

### Bookings Collection
```javascript
{
  _id: ObjectId,
  customerName: String,      // "John Doe"
  email: String,             // "john@example.com"
  phone: String,             // "1234567890"
  address: String,           // Full address
  service: ObjectId,         // Reference to Service
  scheduledDate: Date,       // Booking date
  scheduledTime: String,     // "09:00-12:00"
  status: String,            // "pending" | "confirmed" | "completed" | "cancelled"
  notes: String,             // Optional notes
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

## 🔌 API Endpoints

### Services API
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/api/services` | Get all active services | - |
| GET | `/api/services/:id` | Get specific service | - |
| POST | `/api/services` | Create new service | Service object |
| PUT | `/api/services/:id` | Update service | Service object |
| DELETE | `/api/services/:id` | Delete service | - |

### Bookings API
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/api/bookings` | Get all bookings | - |
| GET | `/api/bookings/:id` | Get specific booking | - |
| POST | `/api/bookings` | Create new booking | Booking object |
| PATCH | `/api/bookings/:id/status` | Update status | { status } |
| DELETE | `/api/bookings/:id` | Delete booking | - |

### Utility
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api` | API welcome message |
| GET | `/api/health` | Server health check |

## 🔐 Security Considerations

### Current Implementation
- ✅ CORS enabled for cross-origin requests
- ✅ Body parser with size limits
- ✅ Environment variables for sensitive data
- ✅ Input validation via Mongoose schemas

### Future Enhancements
- 🔜 JWT authentication
- 🔜 Rate limiting
- 🔜 Input sanitization
- 🔜 Password hashing (if user auth added)
- 🔜 HTTPS in production

## 🚀 Deployment Architecture

### Development
```
Local Machine
├── MongoDB (localhost:27017)
├── Node.js Server (localhost:5000)
└── React Dev Server (localhost:3000)
```

### Production (Replit)
```
Replit Container
├── MongoDB Atlas (cloud)
├── Node.js Server
└── React Build (served by Express)
```

### Production (Heroku)
```
Heroku Dyno
├── MongoDB Atlas (cloud)
├── Express Server
└── React Build (static files)
```

## 🔧 Technology Stack

### Frontend
- **React 18**: UI library
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client
- **CSS3**: Styling

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Mongoose**: MongoDB ODM
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variables

### Database
- **MongoDB**: NoSQL database
- **Mongoose**: Schema modeling

### DevOps
- **Git**: Version control
- **GitHub**: Code hosting
- **Replit**: Development & hosting platform
- **npm**: Package manager

## 📈 Future Enhancements

### Phase 1 (Immediate)
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Payment integration

### Phase 2 (Short-term)
- [ ] Real-time chat
- [ ] Technician tracking
- [ ] Rating & reviews
- [ ] Multiple addresses per user

### Phase 3 (Long-term)
- [ ] Mobile app (React Native)
- [ ] AI-powered service recommendations
- [ ] Analytics dashboard
- [ ] Multi-language support

## 🤝 Contributing

To understand how to contribute to this architecture:
1. Read CONTRIBUTING.md for guidelines
2. Follow the existing patterns
3. Add tests for new features
4. Update this document if adding major features

---

**Last Updated**: February 2024
**Version**: 1.0.0
