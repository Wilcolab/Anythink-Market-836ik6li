# Copilot Instructions for Anythink Market

## Project Overview
- **Monorepo** with `backend/` (Node.js/Express/MongoDB) and `frontend/` (React) apps. Each has its own Dockerfile and test setup.
- **Backend**: Express app using Mongoose for MongoDB, Passport for authentication, JWT for auth tokens, and modular route/model structure.
- **Frontend**: React app with Redux, custom middleware, and component-based structure. Uses Playwright and Jest for testing.

## Key Workflows
- **Backend**
  - Start: `npm start` or `./start.sh` in `backend/`
  - Seed DB: `npm run seed` or `./seeds.sh`
  - Test: No explicit test script; see `tests/` for Postman collections and e2e tests
  - Docker: Use `docker-compose.yml` at repo root for local dev
- **Frontend**
  - Start: `npm start` or `./start.sh` in `frontend/`
  - Test: `npm test` (Jest), e2e in `frontend/tests/` (Playwright)

## Patterns & Conventions
- **Backend**
  - Models in `models/`, routes in `routes/`, config in `config/`
  - Error handling: Centralized in `routes/api/index.js` for Mongoose validation errors (returns 422)
  - Auth: JWT via Passport, see `config/passport.js`
  - Use `mongoose-unique-validator` for unique constraints
- **Frontend**
  - Redux store in `src/store.js`, reducers in `src/reducers/`
  - Components in `src/components/`, grouped by feature
  - API calls via `src/agent.js`

## Integration Points
- **API**: Frontend talks to backend via REST endpoints defined in `backend/routes/api/`
- **Docker**: Both apps have Dockerfiles; use `docker-compose.yml` for full stack
- **Helm**: `charts/` for Kubernetes deployment templates

## Examples
- Add a backend route: Create file in `backend/routes/api/`, register in `backend/routes/api/index.js`
- Add a model: Create in `backend/models/`, import in `app.js`
- Add a frontend page: Add component in `frontend/src/components/`, route in `frontend/src/index.js`

## Tips
- Use existing scripts (`start.sh`, `seeds.sh`) for setup
- For DB errors, check backend's error middleware
- For new API endpoints, update both backend and frontend agent

---
For more, see `backend/README.md` and `frontend/readme.md`.
