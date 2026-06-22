# Community Welfare - Community Report Platform

A robust, brutalist-styled client-side web application designed to empower citizens to report, track, and resolve public infrastructure issues (e.g., streetlights, potholes, sanitation problems). 

This project transforms a shuffle-assigned wireframe design into a fully interactive, feature-rich, frontend-only solution.

---

## 📎 Design & Wireframe
* **Original Wireframe Link**: [Google Drive File](https://drive.google.com/file/d/1FG8RPG91Kk8zFqTyY-wf94EnvNO2fyEm/view)

---

## 🚀 Key Features

### 1. Dynamic Geolocation & Localization
* **Automatic Live Location**: Requests browser GPS coordinates on load, automatically centering map interfaces on your actual location (gracefully falls back to Faridabad City Center if permission is blocked).
* **OpenStreetMap Reverse Geocoding**: Resolves coordinates into real-world suburb and city names dynamically, rewriting dashboard map subtexts, user profile labels, and active issues to feel fully local.
* **Pulsing Live Marker (`YOU`)**: Places a pulsing blue dot with a high-contrast `"YOU"` label at your exact location on both maps. Click the floating `[ LOCATE ME ]` button to instantly center back on it.

### 2. Autocomplete Search & Map Pins
* **Biased Autocomplete**: Suggests actual landmarks, roads, and neighborhoods using the Photon OSM Search API, biased to your local area.
* **Coordinate Auto-Fill**: Auto-fills the Latitude & Longitude inputs as you select suggestions or type addresses.
* **Strict Coordinate Binding**: Disable map clicking from overriding form coordinates. Pins are placed exclusively and securely via the address form.

### 3. Submission-Grade UX/UI Enhancements
* **System Metrics Card**: A sidebar widget with active counters displaying live statistics for Total Reports, Open, Pending, and Resolved issues.
* **Connection Status Badge**: An interactive header indicator (`[ONLINE]` / `[OFFLINE]`) that reacts instantly to network connectivity changes, adopting a customized alert style in offline mode.
* **Image Uploads (Base64)**: Support for file uploads and drag-and-drop screenshots on reports. Previews render directly in the interactive map details panel.
* **Active Issues List**: Filtered sidebar feed displaying only active, unresolved complaints (`OPEN` or `PENDING` status).
* **LocalStorage Database**: Full persistence of all reported issues, upvotes, status changes, activity logs, and settings across browser sessions.

### 4. Excel & Report Exporting
* **Export Reports Button**: Downloads the entire complaints database instantly as an Excel-compatible `.csv` spreadsheet.
* **Excel Compatibility**: Prepends a UTF-8 Byte Order Mark (`\uFEFF`) to prevent Excel character encoding bugs and applies rigorous cell escaping to handle double-quotes and commas securely.

### 5. Historical Pins & Expiration
* **5-Day Expiration Logic**: Marker pins for resolved or closed complaints older than 5 days automatically disappear from map views to prevent map clutter, but remain fully documented in table history.
* **Manual Pin Toggling**: Adds a **"Show Pin on Map"** (which becomes **"Remove Pin"** when active) toggle next to table status badges and in the details sidebar to temporarily project expired pins back onto maps for review.

---

## 🛠️ Technology Stack
* **Markup**: Semantic HTML5
* **Styles**: Vanilla CSS3 (Brutalist, high-contrast monochromatic wireframe aesthetic)
* **Map Engine**: Leaflet.js
* **Icon Set**: Tabler Icons Webfont
* **APIs**: Photon API (location suggestions) & OpenStreetMap Nominatim API (reverse-geocoder)

---

## 💻 How to Run Locally

Since the application is a pure client-side solution, you can run it without complex installations:

1. **Direct Launch**: Open the `index.html` file directly in any modern browser.
2. **Local Server (Recommended)**: Serve the project directory from a local web server (to ensure API fetches and geolocating work smoothly):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js / HTTP-Server
   npx http-server -p 8000
   ```
   Open **http://localhost:8000** in your browser.
