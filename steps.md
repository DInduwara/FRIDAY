### 1. Create a React + Vite project

If you don’t already have one:

```bash
npm create vite@latest my-app
cd my-app
npm install
```

Choose **React** or **React + TypeScript** when prompted.

---

### 2. Install Tailwind CSS & dependencies

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

This will generate:

* `tailwind.config.js`
* `postcss.config.js`

---

### 3. Configure Tailwind

Open **`tailwind.config.js`** and update the `content` section:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

### 4. Add Tailwind to your CSS

Inside `src/index.css` (or `src/main.css` depending on your setup), add:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 5. Import CSS in your entry file

In **`src/main.jsx`** (or `src/main.tsx`), make sure `index.css` is imported:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'   // 👈 Tailwind CSS here

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

### 6. Start using Tailwind classes

Example in **`App.jsx`**:

```jsx
export default function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <h1 className="text-4xl font-bold text-white">
        Hello Tailwind + Vite 🚀
      </h1>
    </div>
  )
}
```

---

### 7. Run the project

```bash
npm run dev
```

You should now see Tailwind styles applied.

---

⚡ That’s it! Tailwind is now integrated with your React + Vite project.
