FRIDAY 🤖

FRIDAY is a modular AI assistant framework with a Python backend for AI agents and a JavaScript-based frontend client for interaction. 
It is designed to experiment with intelligent agents, automate tasks, and provide a simple web interface for testing and extending features.



📂 Project Structure

FRIDAY/
│── app.py             # Backend entry point
│── requirements.txt   # Python dependencies
│── steps.md           # Setup / workflow guide
│
├── agents/            # Agent logic and definitions
├── client/            # Frontend (HTML, CSS, JS)
│   ├── index.html     # Main UI
│   ├── style.css      # Styling
│   └── script.js      # Client-side logic
│
├── config/            # Configuration settings
├── models/            # AI model integrations
└── tools/             # Utilities and helper functions



✨ Features

🧩 Modular Agents – Build AI agents in agents/.

⚙️ Configurable Backend – Customize settings via config/.

🌐 Web Client – Simple frontend in client/ for user interaction.

🤖 Model Support – Plug AI models in through models/.

🛠️ Extendable Tools – Add reusable utilities inside tools/.



🛠️ Tech Stack

Backend: Python 3

Frontend: React, JavaScript, Tailwind.css

Core Libraries: Defined in requirements.txt



⚙️ Setup & Installation
1. Clone the repo
git clone https://github.com/DInduwara/FRIDAY.git
cd FRIDAY

2. Backend setup

Create a virtual environment and install dependencies:

python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

pip install -r requirements.txt
Run the backend:
python app.py
By default, it starts a local server (e.g., http://127.0.0.1:5000).


3. Frontend setup

Open the frontend:
cd client
npm install
npm run dev
By default, it starts a local server (e.g.,  http://localhost:5173/).



▶️ Usage

Start the backend with python app.py.

Launch the frontend (index.html or via http.server).

Interact with FRIDAY through the web interface.


🌟 Future Roadmap

Add React/Vue-based client for richer UI

Support real-time communication (WebSockets)

Expand tool library (API connectors, data utilities)

Provide ready-to-use AI agent templates
