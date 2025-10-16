# Collectify

Collectify is a full-stack web app that lets collectors track and organize their sealed Pokémon cards and other collectible items. Users can add, edit, delete, and filter their items in one central dashboard.

---

## Features
- Create, view, update, and delete collection items  
- Filter by category or search by name  
- Responsive design for mobile and desktop  
- Connected to MongoDB for persistent storage  
- RESTful API built with Express  
- (Optional) Login system with user-specific collections

---

## Technologies Used
- React (Vite)  
- Node.js & Express  
- MongoDB Atlas + Mongoose  
- Axios  
- Render (for server)  
- Netlify (for client)

---

## Installation Instructions

# 1. Clone the repository
git clone https://github.com/ThatguyGage/collectify.git
cd collectify

# 2. Install dependencies
cd server
npm install
cd ../client
npm install

# 3. Run the project (open two terminals)
# Terminal 1 - start server
cd server
npm run dev

# Terminal 2 - start client
cd client
npm run dev

---

## Deployment Links
Frontend (Netlify): https://collectify.netlify.app  
Backend (Render): https://collectify-server.onrender.com  

---

## Usage
- Visit the live frontend to view and manage your collection.  
- Add, edit, or delete items using the interface.  
- Data is stored in MongoDB Atlas for persistence.  

---

## Future Improvements
- Add user authentication (JWT or OAuth)  
- Implement image uploads  
- Add search and sorting features  

## Testing

This project uses Mocha, Chai, and Supertest for API tests.

### Install dev dependencies (server)
```bash
cd server
npm i -D mocha chai supertest

cd server
npm test

