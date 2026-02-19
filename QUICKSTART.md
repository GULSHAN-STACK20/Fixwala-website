# Quick Start Guide - Fixwala.com MERN Application

Get your Fixwala MERN app running in 5 minutes!

## 📋 Prerequisites

Before you begin, ensure you have:
- ✅ Node.js (v14 or higher) installed
- ✅ MongoDB installed locally OR MongoDB Atlas account
- ✅ Git installed
- ✅ A code editor (VS Code recommended)

## 🚀 Option 1: Quick Start with Script (Recommended)

### Step 1: Clone & Navigate
```bash
git clone https://github.com/GULSHAN-STACK20/Fixwala-website.git
cd Fixwala-website
```

### Step 2: Set Up Environment
```bash
# Copy environment template
cp .env.example server/.env

# Edit server/.env and add your MongoDB connection string
# For local MongoDB: mongodb://localhost:27017/fixwala
# For Atlas: mongodb+srv://username:password@cluster.mongodb.net/fixwala
```

### Step 3: Run the Application
```bash
# Make start script executable (Linux/Mac)
chmod +x start.sh

# Start everything
./start.sh
```

That's it! 🎉
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## 🔧 Option 2: Manual Setup

### Step 1: Install Dependencies

```bash
# Root dependencies
npm install

# Server dependencies
cd server
npm install
cd ..

# Client dependencies
cd client
npm install
cd ..
```

### Step 2: Configure Environment

Create `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/fixwala
PORT=5000
NODE_ENV=development
```

### Step 3: Seed Database (Optional)

```bash
cd server
npm run seed
cd ..
```

### Step 4: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

## 🌐 Option 3: Deploy to Replit (Easiest!)

### Step 1: Go to Replit
Visit [replit.com](https://replit.com) and sign in

### Step 2: Import Project
1. Click "Create Repl"
2. Select "Import from GitHub"
3. Enter: `https://github.com/GULSHAN-STACK20/Fixwala-website`

### Step 3: Add Secrets (Environment Variables)
1. Click the lock icon 🔒 on the left sidebar
2. Add these secrets:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5000
   ```

### Step 4: Get MongoDB Atlas Connection String
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster (if you don't have one)
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password

### Step 5: Run
Click the big green "Run" button! ▶️

Your app will be live at: `https://your-repl-name.your-username.repl.co`

## 🧪 Testing the Application

### Test Backend API:
```bash
# Health check
curl http://localhost:5000/api/health

# Get services
curl http://localhost:5000/api/services
```

### Test Frontend:
1. Open http://localhost:3000
2. Click "View Services"
3. Try booking a service

## 📦 What's Included?

- ✅ **Backend (Express + MongoDB)**
  - RESTful API
  - Service management
  - Booking system
  - Sample data seeding

- ✅ **Frontend (React)**
  - Modern UI
  - Responsive design
  - Service browsing
  - Booking form

- ✅ **Documentation**
  - README.md - Overview
  - DEPLOYMENT.md - Deploy guides
  - CONTRIBUTING.md - How to contribute
  - This file! 😊

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- **Local**: Make sure MongoDB is running
  ```bash
  # Start MongoDB (varies by OS)
  mongod  # or
  brew services start mongodb-community  # Mac
  sudo systemctl start mongod  # Linux
  ```
- **Atlas**: Check your connection string and IP whitelist

### "Port 3000/5000 already in use"
```bash
# Kill process on port (Mac/Linux)
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

### "npm install fails"
```bash
# Clear cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Frontend can't connect to Backend
- Check if backend is running on port 5000
- Verify proxy in `client/package.json`
- Check CORS settings in `server/server.js`

## 📚 Next Steps

1. **Add Sample Data**: Run `cd server && npm run seed`
2. **Customize Services**: Edit service data in `server/seed.js`
3. **Modify UI**: Update React components in `client/src/`
4. **Add Features**: Check CONTRIBUTING.md for guidelines
5. **Deploy**: Follow DEPLOYMENT.md for production deployment

## 🆘 Need Help?

- 📖 Read the full README.md
- 🚀 Check DEPLOYMENT.md for deployment help
- 🤝 See CONTRIBUTING.md to contribute
- 🐛 Open an issue on GitHub

## 🎓 Learn More

### MERN Stack Resources:
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Docs](https://nodejs.org/docs/)

---

**Enjoy building with Fixwala! 🚀🔧**

Need more help? Open an issue or check the detailed documentation files!
