# Product Configuration Platform

An interactive, user-friendly platform for configuring industrial products with real-time performance calculations and a responsive UI.

---

## 🧭 Overview

This platform guides users through the complex process of industrial product selection. It simplifies decision-making by offering real-time performance metrics, intuitive visualizations, and a step-by-step configuration workflow.

---

## ✨ Features

- **Multi-Step Configuration**  
  Guided workflow through product requirements, specifications, performance analysis, and comparison.

- **Real-Time Performance Calculations**  
  Instant feedback on how specification changes impact product performance.

- **Interactive Visualizations**  
  Clear, dynamic visual representation of performance metrics.

- **Responsive Design**  
  Optimized for desktops, tablets, and mobile devices.

- **Database Integration**  
  Persistent storage using PostgreSQL with an in-memory fallback for flexibility.

---

## 🛠️ Technical Stack

### Frontend

- **Framework**: React (with TypeScript)
- **Routing**: Wouter
- **Data Fetching**: TanStack Query
- **Styling**: Tailwind CSS with `shadcn/ui` components

### Backend

- **Server**: Express.js
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL (with in-memory fallback)

---

## 📁 Project Structure

```
/client              # Frontend (React)
/src
  ├── components     # Reusable UI components
  ├── pages          # Configuration step pages
  ├── hooks          # Custom React hooks
  └── lib            # Utility functions and config

/server              # Backend (Express)
/products            # Product services & calculations
/routes.ts           # API route definitions
/storage.ts          # DB and in-memory storage interface
/db.ts               # Database config

/shared              # Shared code (client + server)
/schema.ts           # DB schema and types
```

---

## 🧩 Configuration Steps

1. **Home** – Introduction and feature overview  
2. **Requirements** – Choose product category and application  
3. **Specifications** – Input detailed technical parameters  
4. **Performance** – View calculated performance metrics  
5. **Compare** – Compare selected product with alternatives  
6. **Summary** – Final report with specifications

---

## 🗄️ Database Structure

The main tables used in the PostgreSQL database:

- `users` – Authentication and profiles  
- `product_categories` – Product classification  
- `application_types` – Specific use cases per category  
- `products` – Technical specifications and performance data

---

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/product-config-platform.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set environment variables in a `.env` file:
   ```
   DATABASE_URL=your_postgres_connection_string
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 💡 Development Notes

- Falls back to in-memory storage if PostgreSQL is unavailable  
- All performance calculations are handled server-side  
- UI includes animations, gradients, and fully responsive design

---

## 🔮 Future Enhancements

- User authentication and saved configurations  
- PDF report generation  
- 3D product model visualizations  
- Integration with inventory and ordering systems

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
