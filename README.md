# 🎓 Campus Mitra

Campus Mitra is a next-generation web application prototype designed to streamline and elevate the attendee experience during large-scale college events, hackathons, and sporting tournaments. 

Navigating massive campuses, managing overlapping itineraries, standing in long queues for limited room capacities, and waiting for food are universal pain points at large events. Campus Mitra acts as a digital companion that eliminates these frictions through smart automation and real-time guidance.

## ✨ Core Features

* 🗺️ **In-Campus Wayfinding:** An interactive map simulation mimicking localized GPS routing to help attendees seamlessly navigate from current locations to complex building blocks.
* 📅 **Personalized Itinerary & Checklists:** A drag-and-drop style itinerary system allowing users to build and check off a personalized list of prioritized events.
* 🚦 **Smart Virtual Queuing System:** Say goodbye to physical lines. Once an attendee checks off an event from their list, the system automatically dispatches a "Slot Available" push notification to the next user in the virtual queue, operating on a first-come, first-serve basis.
* ☕ **Time-Slotted Food Pre-ordering:** Avoid the rush hour at the food court by buying items directly from your phone and selecting a dedicated 15-minute pickup window.
* 🔔 **Emergency & Live Broadcast Hub:** A central alert center for instant push notifications regarding sudden venue shifts, schedule changes, and quick FAQ assistance (Lost & Found, WiFi details).

## 🛠️ Technology Stack

* **Framework:** Frontend built with Vite and React.js for seamless state handling of dynamic queues.
* **Styling & Aesthetics:** Pure Vanilla CSS utilizing modern web design concepts (Glassmorphism, minimalistic lavender/purple & white high-contrast palettes, CSS micro-animations).
* **Architecture:** Mobile-first responsive Progressive Web App (PWA) layout architecture.

## 🚀 Getting Started 

If you want to run the Campus Mitra prototype locally on your own machine:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/baudspan/CAMPUSMITRA.git
   cd CAMPUSMITRA
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Launch the Prototype:**
   Open your browser and navigate to the local host address provided in the terminal (usually `http://localhost:5173`). 

---

### UI/UX Design Note
The prototype is styled specifically for mobile portrait formats. For the optimal viewing experience on a desktop computer, open your browser's Developer Tools (F12), click on the "Toggle Device Toolbar" (Ctrl+Shift+M), and view the screen mapped as a mobile device (e.g., iPhone 12 Pro).
