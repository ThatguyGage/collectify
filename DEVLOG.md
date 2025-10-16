# Collectify Dev Log

## Week 1 – Proposal & Setup
- Decided on project idea: Collectify, a full-stack web app for collectors to manage their sealed Pokémon or other collectible items.
- Wrote proposal and submitted for approval.
- Set up folder structure with `client` and `server`.
- Installed Express, Mongoose, and React (Vite).
- Created and connected MongoDB Atlas cluster.

## Week 2 – Backend Development
- Built `Item` model and CRUD routes.
- Tested API routes with Postman.
- Connected Express to MongoDB using `.env` file.
- Added CORS and Morgan middleware.
- Server running successfully on port 4000.

## Week 3 – Frontend Integration
- Created React components (`App.jsx`, `Item.jsx`).
- Integrated Axios to fetch items from backend.
- Styled layout and added edit/delete buttons.
- Verified data flow from MongoDB → API → React UI.
- Learned how to serve React build from Express.

## Week 4 – Testing, Deployment & Polish
- Built production version of React with Vite.
- Served React static files from Express backend.
- Deployed backend to Render and frontend to Netlify.
- Performed testing and bug fixes.
- Documented setup in README and verified final functionality.

## Future Improvements
- Add login system with JWT authentication.
- Allow image uploads for items.
- Add search, filters, and sort features.
- Create unit tests for API endpoints.
