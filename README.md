# IAS Company Login Application

A multi-tenant authentication and module management system built with Laravel 12, React, and PostgreSQL. This application provides company-specific theming, role-based module access, and a hierarchical navigation system.

## 🎯 Project Overview

This application demonstrates a complete full-stack solution featuring:
- Multi-company authentication with dynamic theming
- Role-based access control (RBAC) with module permissions
- Hierarchical navigation system (System → Module → Submodule)
- Token-based authentication using Laravel Sanctum
- Dockerized development environment
- Responsive and searchable UI

## 🏗️ Architecture

### Technology Stack

**Backend:**
- Laravel 12 (PHP 8.3+)
- Laravel Sanctum for authentication
- PostgreSQL database
- RESTful API architecture

**Frontend:**
- React 18+ (Vite/Create React App)
- Axios for API communication
- CSS Variables for dynamic theming
- Context API for state management

**Infrastructure:**
- Docker & Docker Compose
- Nginx (optional reverse proxy)

## 📋 Features

### Core Features (Must-Have)
✅ **Authentication System**
- Username/password login
- Company selection via dropdown
- Token-based session management
- Bcrypt password hashing

✅ **Dynamic Theming**
- Company-specific color schemes
- CSS variable-based theming
- Real-time theme application

✅ **Hierarchical Navigation**
- Three-level structure: System → Module → Submodule
- Expandable/collapsible tree view
- Permission-filtered display

✅ **Module Permissions**
- User-specific module access
- Database-driven permission system
- Secure API filtering

✅ **Search Functionality**
- Real-time module search
- Case-insensitive filtering
- Hierarchical result display

### Bonus Features
- ⭐ Persistent company selection
- ⭐ Logout functionality with token revocation
- ⭐ Smooth expand/collapse animations
- ⭐ Responsive mobile design

## 🗄️ Database Schema

### Tables Overview

**companies**
- Stores company information and branding
- Fields: `id`, `name`, `code`, `primary_color`, `accent_color`, `logo_url`

**users**
- User credentials and company association
- Fields: `id`, `username`, `email`, `password`, `full_name`, `company_id`, `is_active`

**systems**
- Top-level navigation categories
- Fields: `id`, `name`, `code`

**modules**
- Second-level navigation items
- Fields: `id`, `system_id`, `name`, `code`, `icon`

**submodules**
- Third-level navigation items with routes
- Fields: `id`, `module_id`, `name`, `code`, `route`

**user_submodule**
- Permission pivot table
- Fields: `id`, `user_id`, `submodule_id`, `granted_at`, `created_by`

### Entity Relationship Diagram

```
companies
    ↓ (1:N)
users ←→ user_submodule ←→ submodules
                              ↓ (N:1)
                           modules
                              ↓ (N:1)
                           systems
```

## 🚀 Quick Start

### Prerequisites

- Docker Desktop (latest version)
- Docker Compose v2.0+
- Git
- 8GB RAM minimum
- Ports 3000, 8000, and 5432 available

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Renwoldd/ias-company-login-application.git
cd ias-company-login-application
```

2. **Start Docker containers**
```bash
docker compose up --build
```

3. **Run database migrations and seeders**
```bash
# Access the backend container
docker exec -it backend_app sh

# Run migrations and seed data
php artisan migrate --seed

# Exit container
exit
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Database: localhost:5432

### Sample Credentials

Use these credentials to test the application:

| Username | Password    | Company | Role          |
|----------|-------------|---------|---------------|
| alice    | Passw0rd!   | ACME    | Admin         |
| bob      | Passw0rd!   | BETA    | Manager       |
| charlie  | Passw0rd!   | GAMMA   | Employee      |
| diana    | Passw0rd!   | ACME    | Employee      |
| edward   | Passw0rd!   | BETA    | Admin         |

**Note:** All passwords follow the format `Passw0rd!` for demo purposes.

## 🔧 Development

### Project Structure

```
ias-company-login-application/
├── backend/                  # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   ├── Models/
│   │   └── ...
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   └── api.php
│   └── ...
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── ...
│   └── ...
├── docker-compose.yml
└── README.md
```

### Backend Development

**Install dependencies**
```bash
docker exec -it backend_app sh
composer install
```

**Create new migration**
```bash
php artisan make:migration create_table_name
```

**Run specific seeder**
```bash
php artisan db:seed --class=CompanySeeder
```

**Clear cache**
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

### Frontend Development

**Install dependencies**
```bash
docker exec -it frontend_app sh
npm install
```

**Run tests**
```bash
npm test
```

**Build for production**
```bash
npm run build
```

## 📡 API Endpoints

### Authentication
```http
POST /api/login
Content-Type: application/json

{
  "username": "alice",
  "password": "Passw0rd!",
  "company_code": "ACME"
}

Response: { "token", "user", "company" }
```

```http
POST /api/logout
Authorization: Bearer {token}
```

### Data Retrieval
```http
GET /api/companies
Response: [{ "id", "name", "code", "primary_color", ... }]
```

```http
GET /api/modules
Authorization: Bearer {token}
Response: [{ "system_id", "system_name", "modules": [...] }]
```

```http
GET /api/user
Authorization: Bearer {token}
Response: { "id", "username", "full_name", ... }
```

### Health Check
```http
GET /api/validate
Response: { "status": "ok" }
```

## 🎨 Theming Implementation

The application uses CSS variables for dynamic theming:

```javascript
// Apply theme on login
function applyTheme(company) {
  document.documentElement.style.setProperty('--primary', company.primary_color);
  document.documentElement.style.setProperty('--accent', company.accent_color);
}
```

**Default CSS Variables:**
```css
:root {
  --primary: #3490dc;
  --accent: #ffcc00;
  --background: #ffffff;
  --text: #2d3748;
}
```

## 🔍 Module Search Algorithm

The search functionality implements a hierarchical filter:

```javascript
function filterTree(tree, query) {
  if (!query) return tree;
  
  const ql = query.toLowerCase();
  
  return tree
    .map(system => {
      const modules = system.modules
        .map(module => {
          const subs = module.submodules.filter(s => 
            s.name.toLowerCase().includes(ql)
          );
          return { ...module, submodules: subs };
        })
        .filter(m => 
          m.submodules.length || 
          m.name.toLowerCase().includes(ql)
        );
      return { ...system, modules };
    })
    .filter(s => 
      s.modules.length || 
      s.name.toLowerCase().includes(ql)
    );
}
```

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Check what's using the port
lsof -i :3000  # or :8000, :5432

# Kill the process or change ports in docker-compose.yml
```

**Database connection failed**
```bash
# Restart database container
docker compose restart db

# Check database logs
docker logs db_container
```

**CORS errors**
- Verify `FRONTEND_URL` in backend `.env`
- Check CORS middleware configuration in `app/Http/Kernel.php`

**Module not loading**
- Check user permissions in `user_submodule` table
- Verify authentication token is valid
- Check browser console for API errors

## 📸 Screenshots

### Login Screen
![Login Screen](./screenshots/login.png)
*Multi-company login with dropdown selection*

### Dashboard - ACME Theme
![ACME Dashboard](./screenshots/dashboard-acme.png)
*Blue-themed dashboard for ACME company*

### Dashboard - BETA Theme
![BETA Dashboard](./screenshots/dashboard-beta.png)
*Green-themed dashboard for BETA company*

### Module Search
![Module Search](./screenshots/search.png)
*Real-time hierarchical search functionality*

## 🧪 Testing

### Backend Tests
```bash
docker exec -it backend_app sh
php artisan test
```

### Frontend Tests
```bash
docker exec -it frontend_app sh
npm test
```

### Manual Testing Checklist
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (should fail)
- [ ] Company dropdown loads all companies
- [ ] Theme changes based on selected company
- [ ] Left pane displays only permitted modules
- [ ] Module tree expands/collapses correctly
- [ ] Search filters modules in real-time
- [ ] Submodule click navigates correctly
- [ ] Logout clears session and redirects

## 📦 Deployment

### Production Build

1. **Build frontend**
```bash
cd frontend
npm run build
```

2. **Optimize backend**
```bash
cd backend
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

3. **Environment variables**
```bash
APP_ENV=production
APP_DEBUG=false
DB_HOST=your_production_db
SANCTUM_STATEFUL_DOMAINS=your_domain.com
SESSION_DOMAIN=.your_domain.com
```

## 🤝 Contributing

This is an academic project. Contributions are limited to team members.

## 📝 License

This project is licensed under the MIT License, a permissive open-source license that allows anyone to freely use, modify, distribute, and even commercialize the software, provided that the original copyright notice and permission notice are included in all copies or substantial portions of the software.

## 🆘 Support

For issues or questions:
- Check the [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions
- Review troubleshooting section above
- Contact team members during office hours
- Consult project documentation in `/docs`

## 📚 Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Docker Documentation](https://docs.docker.com)
- [Laravel Sanctum Guide](https://laravel.com/docs/sanctum)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

### Presentation Date: October 17, 2025

## 📧 Developer

**Developer**: Renwoldd
**GitHub**: [@Renwoldd](https://github.com/Renwoldd)
**Repository**: [ias-company-login-application](https://github.com/Renwoldd/ias-company-login-apllication)

---

**Last Updated:** October 20, 2025
**Version:** 1.0.0
**Repository:** https://github.com/Renwoldd/ias-company-login-application
