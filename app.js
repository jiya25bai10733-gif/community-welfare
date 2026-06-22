// App state
const state = {
  activeTab: 'dashboard',
  issues: [
    {
      id: '1248',
      title: 'Broken Streetlight',
      description: 'Pedestrian streetlamp pole #4 near the main market entrance has been non-functional for 3 days, leaving the lane pitch dark and unsafe after sunset.',
      location: 'Sector 12 Market Road',
      category: 'Utilities',
      status: 'OPEN',
      reportedTime: '2 hrs ago',
      reportedDate: 'June 18, 2026',
      reporter: 'Resident User #402',
      coordinates: { lat: 28.4150, lng: 77.3140 },
      upvotes: 14,
      timeline: [
        { title: 'Report Logged', time: '2 hrs ago', complete: true },
        { title: 'Assigned to Municipal Electricity Wing', time: 'Pending', complete: false }
      ]
    },
    {
      id: '1245',
      title: 'Large Pothole',
      description: 'A deep 2-foot pothole has opened up near Sector 15 Central Park gate. It poses a severe hazard to two-wheelers and causes traffic bottlenecks during peak hours.',
      location: 'Sector 15 Main Road',
      category: 'Roads',
      status: 'PENDING',
      reportedTime: '5 hrs ago',
      reportedDate: 'June 21, 2026',
      reporter: 'Resident User #402',
      coordinates: { lat: 28.4110, lng: 77.3190 },
      upvotes: 32,
      timeline: [
        { title: 'Report Logged', time: '5 hrs ago', complete: true },
        { title: 'Assigned to FMC Road Maintenance Team', time: '4 hrs ago', complete: true },
        { title: 'Scheduled Repair Operations', time: 'Pending', complete: false },
        { title: 'Resolved Verification', time: 'Pending', complete: false }
      ]
    },
    {
      id: '1246',
      title: 'Overflowing Bin',
      description: 'The public trash container at Sector 21C main gate is overflowing with waste, causing a foul odor and litter spillover onto the service lane.',
      location: 'Sector 21C Residential Area',
      category: 'Sanitation',
      status: 'CLOSED',
      reportedTime: '1 day ago',
      reportedDate: 'June 20, 2026',
      resolvedDate: '2026-06-21T12:00:00.000Z',
      reporter: 'Neighbor User #87',
      coordinates: { lat: 28.4230, lng: 77.3020 },
      upvotes: 25,
      timeline: [
        { title: 'Report Logged', time: '1 day ago', complete: true },
        { title: 'Closed - Resolved by Sanitation Dept', time: '1 day ago', complete: true }
      ]
    },
    {
      id: '1244',
      title: 'Graffiti on Metro Pillar',
      description: 'Vandalism graffiti sprayed along the central metro support pillar #184 facing the main road. Requires pressure-washing or paint coverage.',
      location: 'Neelam Chowk Metro Station',
      category: 'Sanitation',
      status: 'RESOLVED',
      reportedTime: '2 days ago',
      reportedDate: 'June 10, 2026',
      resolvedDate: '2026-06-10T12:00:00.000Z',
      reporter: 'Resident User #402',
      coordinates: { lat: 28.4020, lng: 77.3160 },
      upvotes: 8,
      timeline: [
        { title: 'Report Logged', time: '2 days ago', complete: true },
        { title: 'Resolved - Wall pressure washed and painted', time: 'June 10, 2026', complete: true }
      ]
    },
    {
      id: '1254',
      title: 'Damaged Sidewalk Curb',
      description: 'Concrete block on the service lane footpath near the Sector 19 flyover has broken off, blocking pedestrian walk space and creating a tripping hazard.',
      location: 'Mathura Road Service Lane',
      category: 'Roads',
      status: 'CLOSED',
      reportedTime: '12 days ago',
      reportedDate: 'June 10, 2026',
      resolvedDate: '2026-06-10T12:00:00.000Z',
      reporter: 'Resident User #402',
      coordinates: { lat: 28.3980, lng: 77.3210 },
      upvotes: 4,
      timeline: [
        { title: 'Report Logged', time: '12 days ago', complete: true },
        { title: 'Closed', time: 'June 10, 2026', complete: true }
      ]
    }
  ],
  selectedIssueId: '1245',
  activityFilter: 'all',
  searchQuery: '',
  zoomLevel: 14,
  upvotedIssues: [],
  forcedHistoryPins: []
};

// Activity logs matching screenshot 4, adapted to Faridabad
let activityLogs = [
  {
    id: 'log-1',
    location: 'Sector 12 Market',
    time: '10 MINS AGO',
    desc: 'Municipal Maintenance Team marked <span class="font-bold">Issue #1248 (Broken Streetlight)</span> as <span class="font-bold">RESOLVED</span>. Verification notes: "Replacement bulb installed and tested."',
    tag: 'RESOLVED',
    type: 'resolved'
  },
  {
    id: 'log-2',
    location: 'Sector 15 Main Road',
    time: '2 HRS AGO',
    desc: 'Status updated on <span class="font-bold">Issue #1245 (Large Pothole)</span>. Changed from [Open] to <span class="font-bold">[IN PROGRESS]</span>. Assigned to: FMC Road Works B.',
    tag: 'UPDATE',
    type: 'update'
  },
  {
    id: 'log-3',
    location: 'Sector 37 Commercial Hub',
    time: '5 HRS AGO',
    desc: 'Resident Amit S. filed a <span class="font-bold">NEW REPORT: Issue #1251 (Waterlogging after rain)</span> near the main metro exit road.',
    tag: 'NEW',
    type: 'new'
  },
  {
    id: 'log-4',
    location: 'Sector 21C',
    time: '1 DAY AGO',
    desc: 'Community endorsement milestone reached! <span class="font-bold">Issue #1246 (Overflowing Bin)</span> has reached <span class="font-bold">25 Upvotes</span> from neighbors.',
    tag: 'UPDATE',
    type: 'update'
  },
  {
    id: 'log-5',
    location: 'Neelam Chowk Path',
    time: '2 DAYS AGO',
    desc: 'Sanitation Department marked <span class="font-bold">Issue #1244 (Graffiti on Metro Pillar)</span> as <span class="font-bold">RESOLVED</span>. Verification notes: "Surface pressure wash complete."',
    tag: 'RESOLVED',
    type: 'resolved'
  }
];

// Leaflet map instances
let dashboardMapInstance = null;
let interactiveMapInstance = null;

// Map markers collections
let dashboardMarkers = [];
let interactiveMarkers = [];
let placementMarker = null;

let cityCenter = [28.4089, 77.3178]; // Faridabad City Center Coordinates as default fallback

// Global variables for persistence and image uploads
let customIssues = [];
let customLogs = [];
let uploadedImageBase64 = null;

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  loadPersistedData();
  setupConnectionStatus();
  setDefaultFormCoordinates();
  setupNavigation();
  setupFormHandlers();
  setupFiltersAndSearch();
  setupMapControls();
  initMaps();
  detectLocationAndInit();
  setupLocationAutocomplete();
  renderApp();
});

// Load persisted custom issues & activity logs
function loadPersistedData() {
  try {
    customIssues = JSON.parse(localStorage.getItem('community_custom_issues')) || [];
    customLogs = JSON.parse(localStorage.getItem('community_custom_activity_logs')) || [];
    state.upvotedIssues = JSON.parse(localStorage.getItem('community_upvoted_issues')) || [];
    state.forcedHistoryPins = JSON.parse(localStorage.getItem('community_forced_history_pins')) || [];
    
    // Restore default issues upvotes increments
    const defaultIssuesUpvotes = JSON.parse(localStorage.getItem('community_default_issues_upvotes')) || {};
    state.issues.forEach(issue => {
      if (defaultIssuesUpvotes[issue.id]) {
        issue.upvotes = (issue.upvotes || 0) + defaultIssuesUpvotes[issue.id];
      }
    });
  } catch (e) {
    console.error("Failed to load local storage data:", e);
  }

  // Prepend custom issues to the state.issues
  state.issues = [...customIssues, ...state.issues];
  
  // Prepend custom logs to the activityLogs
  activityLogs = [...customLogs, ...activityLogs];
}

// Connection online/offline listener
function setupConnectionStatus() {
  const statusEl = document.getElementById('connection-status');
  if (!statusEl) return;

  function updateStatus() {
    if (navigator.onLine) {
      statusEl.textContent = "ONLINE";
      statusEl.style.backgroundColor = "#1f2937";
      statusEl.style.color = "#ffffff";
      statusEl.style.borderColor = "var(--border-gray)";
      statusEl.style.borderStyle = "solid";
    } else {
      statusEl.textContent = "OFFLINE";
      statusEl.style.backgroundColor = "#ffffff";
      statusEl.style.color = "#000000";
      statusEl.style.borderColor = "#ff0000";
      statusEl.style.borderStyle = "dashed";
    }
  }

  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  updateStatus(); // run initial check
}

// Set default form coordinates on load
function setDefaultFormCoordinates() {
  const latField = document.getElementById('issue-lat');
  const lngField = document.getElementById('issue-lng');
  if (latField) latField.value = cityCenter[0].toFixed(5);
  if (lngField) lngField.value = cityCenter[1].toFixed(5);
}

// Autocomplete Location using Photon API (Komoot OpenStreetMap)
let autocompleteTimeout = null;

function setupLocationAutocomplete() {
  const inputEl = document.getElementById('issue-location');
  const dropdownEl = document.getElementById('location-autocomplete-dropdown');
  if (!inputEl || !dropdownEl) return;

  inputEl.addEventListener('input', () => {
    const val = inputEl.value.trim();
    clearTimeout(autocompleteTimeout);
    
    if (val.length < 3) {
      dropdownEl.style.display = 'none';
      dropdownEl.innerHTML = '';
      return;
    }

    // Debounce to prevent heavy API calling
    autocompleteTimeout = setTimeout(() => {
      let url = `https://photon.komoot.io/api/?q=${encodeURIComponent(val)}&limit=5`;
      if (cityCenter && cityCenter.length === 2) {
        url += `&lat=${cityCenter[0]}&lon=${cityCenter[1]}`;
      }

      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error("Network error during autocomplete");
          return response.json();
        })
        .then(data => {
          const features = data.features || [];
          renderAutocompleteResults(features, inputEl, dropdownEl);

          // Real-time coordinates update as the user types
          if (features.length > 0) {
            const firstFeature = features[0];
            const geom = firstFeature.geometry;
            if (geom && geom.coordinates && geom.coordinates.length === 2) {
              const lng = geom.coordinates[0];
              const lat = geom.coordinates[1];
              setNewIssuePlacementMarker(lat, lng, false, true);
            }
          }
        })
        .catch(error => {
          console.error("Autocomplete search failed:", error);
        });
    }, 400);
  });

  // Close dropdown when user clicks elsewhere
  document.addEventListener('click', (e) => {
    if (e.target !== inputEl && e.target !== dropdownEl && !dropdownEl.contains(e.target)) {
      dropdownEl.style.display = 'none';
    }
  });

  // Re-open list on focus if query length is valid
  inputEl.addEventListener('focus', () => {
    if (inputEl.value.trim().length >= 3 && dropdownEl.children.length > 0) {
      dropdownEl.style.display = 'block';
    }
  });

  // Geocode automatically on blur (losing focus)
  inputEl.addEventListener('blur', () => {
    setTimeout(() => {
      const val = inputEl.value.trim();
      if (val.length < 3) return;

      let url = `https://photon.komoot.io/api/?q=${encodeURIComponent(val)}&limit=1`;
      if (cityCenter && cityCenter.length === 2) {
        url += `&lat=${cityCenter[0]}&lon=${cityCenter[1]}`;
      }

      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error("Geocoding on blur failed");
          return response.json();
        })
        .then(data => {
          if (data.features && data.features.length > 0) {
            const feature = data.features[0];
            const geom = feature.geometry;
            if (geom && geom.coordinates && geom.coordinates.length === 2) {
              const lng = geom.coordinates[0];
              const lat = geom.coordinates[1];
              
              const latField = document.getElementById('issue-lat');
              const lngField = document.getElementById('issue-lng');
              if (latField) latField.value = lat.toFixed(5);
              if (lngField) lngField.value = lng.toFixed(5);
              
              setNewIssuePlacementMarker(lat, lng);
              console.log(`Auto-filled coordinates on blur for: "${val}" -> (${lat}, ${lng})`);
            }
          }
        })
        .catch(error => {
          console.error("Geocoding on blur error:", error);
        });
    }, 250);
  });

  // Geocode automatically when hitting Enter
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = inputEl.value.trim();
      if (val.length >= 3) {
        e.preventDefault(); // Prevent form submit immediately
        
        let url = `https://photon.komoot.io/api/?q=${encodeURIComponent(val)}&limit=1`;
        if (cityCenter && cityCenter.length === 2) {
          url += `&lat=${cityCenter[0]}&lon=${cityCenter[1]}`;
        }

        fetch(url)
          .then(res => {
            if (!res.ok) throw new Error("Geocoding on Enter failed");
            return res.json();
          })
          .then(data => {
            if (data.features && data.features.length > 0) {
              const geom = data.features[0].geometry;
              if (geom && geom.coordinates && geom.coordinates.length === 2) {
                const lng = geom.coordinates[0];
                const lat = geom.coordinates[1];
                
                const latField = document.getElementById('issue-lat');
                const lngField = document.getElementById('issue-lng');
                if (latField) latField.value = lat.toFixed(5);
                if (lngField) lngField.value = lng.toFixed(5);
                
                setNewIssuePlacementMarker(lat, lng);
                dropdownEl.style.display = 'none';
                console.log(`Auto-filled coordinates on Enter for: "${val}" -> (${lat}, ${lng})`);
              }
            }
          })
          .catch(err => console.error("Geocoding on Enter error:", err));
      }
    }
  });
}

function renderAutocompleteResults(features, inputEl, dropdownEl) {
  dropdownEl.innerHTML = '';
  
  if (features.length === 0) {
    dropdownEl.style.display = 'none';
    return;
  }

  features.forEach(feature => {
    const p = feature.properties;
    const geom = feature.geometry;
    
    const parts = [];
    if (p.name) parts.push(p.name);
    if (p.street) parts.push(p.street);
    if (p.locality) parts.push(p.locality);
    if (p.district) parts.push(p.district);
    if (p.city && p.city !== p.name) parts.push(p.city);
    if (p.state) parts.push(p.state);
    if (p.country && p.country !== p.name) parts.push(p.country);
    
    const formattedAddress = parts.join(', ');
    
    const item = document.createElement('div');
    item.className = 'autocomplete-item';
    item.textContent = formattedAddress;
    
    item.addEventListener('click', () => {
      inputEl.value = formattedAddress;
      dropdownEl.style.display = 'none';
      
      if (geom && geom.coordinates && geom.coordinates.length === 2) {
        const lng = geom.coordinates[0];
        const lat = geom.coordinates[1];
        
        const latField = document.getElementById('issue-lat');
        const lngField = document.getElementById('issue-lng');
        if (latField) latField.value = lat.toFixed(5);
        if (lngField) lngField.value = lng.toFixed(5);
        
        // Pin location on interactive map for visual feedback
        setNewIssuePlacementMarker(lat, lng);
        
        console.log(`Autocomplete selected: ${formattedAddress} at (${lat}, ${lng})`);
      }
    });
    
    dropdownEl.appendChild(item);
  });

  dropdownEl.style.display = 'block';
}

// Dynamic location tracking and reverse geocoding
function detectLocationAndInit() {
  console.log("Tracking location...");
  
  if (!navigator.geolocation) {
    console.warn("Geolocation is not supported by this browser. Falling back to Faridabad.");
    initFallbackLocation();
    return;
  }

  // Update map subtext to show we are locating
  const subtextEl = document.getElementById('dashboard-map-subtext');
  if (subtextEl) {
    subtextEl.textContent = "Detecting your location to show nearby issues...";
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log(`Location detected: ${lat}, ${lng}`);
      
      cityCenter = [lat, lng];
      
      // Update form coordinates
      setDefaultFormCoordinates();
      
      // Recalculate issues coordinates relative to this new center
      updateIssuesCoordinates(lat, lng);
      
      // Re-center both map instances
      recenterMaps(lat, lng);
      
      // Fetch reverse geocode details
      fetchReverseGeocode(lat, lng);
    },
    (error) => {
      console.warn(`Geolocation failed/denied (Code ${error.code}): ${error.message}. Falling back to Faridabad.`);
      initFallbackLocation();
    },
    {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 0
    }
  );
}

function initFallbackLocation() {
  // Use Faridabad as default center
  cityCenter = [28.4089, 77.3178];
  setDefaultFormCoordinates();
  updateIssuesCoordinates(cityCenter[0], cityCenter[1]);
  recenterMaps(cityCenter[0], cityCenter[1]);
  
  // Set fallback text values
  updateLocationTexts("Faridabad", "Sector 15", "Mathura Road");
}

function updateIssuesCoordinates(lat, lng) {
  // Original offsets from default Faridabad center (28.4089, 77.3178)
  const offsets = {
    '1248': { dLat: 0.0061, dLng: -0.0038 },
    '1245': { dLat: 0.0021, dLng: 0.0012 },
    '1246': { dLat: 0.0141, dLng: -0.0158 },
    '1244': { dLat: -0.0069, dLng: -0.0018 },
    '1254': { dLat: -0.0109, dLng: 0.0032 }
  };
  
  state.issues.forEach(issue => {
    const offset = offsets[issue.id];
    if (offset) {
      issue.coordinates = {
        lat: lat + offset.dLat,
        lng: lng + offset.dLng
      };
    }
  });
}

function recenterMaps(lat, lng) {
  if (dashboardMapInstance) {
    dashboardMapInstance.setView([lat, lng], 13);
  }
  if (interactiveMapInstance) {
    interactiveMapInstance.setView([lat, lng], state.zoomLevel);
  }
}

function fetchReverseGeocode(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
  
  fetch(url, {
    headers: {
      'Accept-Language': 'en'
    }
  })
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(data => {
      const address = data.address || {};
      const city = address.city || address.town || address.village || address.municipality || address.county || 'Local Area';
      const suburb = address.suburb || address.neighbourhood || address.quarter || address.city_district || address.road || 'Local Suburb';
      const road = address.road || address.pedestrian || suburb || 'Main Road';
      
      console.log(`Reverse geocoded location: ${suburb}, ${city}`);
      
      updateLocationTexts(city, suburb, road);
    })
    .catch(error => {
      console.error("Reverse geocoding failed:", error);
      // Fallback to generic names based on Lat/Lng
      const city = "Local Area";
      const suburb = `Near ${lat.toFixed(3)}, ${lng.toFixed(3)}`;
      const road = "Main Road";
      updateLocationTexts(city, suburb, road);
    });
}

function updateLocationTexts(city, suburb, road) {
  // Update dashboard map subtext
  const subtextEl = document.getElementById('dashboard-map-subtext');
  if (subtextEl) {
    subtextEl.textContent = `Interactive City Map: View Reported Issues in ${city}`;
  }
  
  // Update profile location
  const profileLocEl = document.getElementById('profile-location-text');
  if (profileLocEl) {
    profileLocEl.textContent = `${city} Resident • ${suburb}`;
  }
  
  // Update issue location names dynamically to make them feel local
  state.issues.forEach(issue => {
    if (issue.id === '1248') {
      issue.location = `${suburb} Market Road`;
    } else if (issue.id === '1245') {
      issue.location = `${suburb} Central Road`;
    } else if (issue.id === '1246') {
      issue.location = `${suburb} Residential Area`;
    } else if (issue.id === '1244') {
      issue.location = `${road} Metro Station Pillar`;
    } else if (issue.id === '1254') {
      issue.location = `${road} Service Lane`;
    }
  });

  // Update activity logs dynamically to make them feel local
  activityLogs.forEach(log => {
    if (log.id === 'log-1') {
      log.location = `${suburb} Market`;
      log.desc = log.desc.replace(/Sector 12 Market/g, `${suburb} Market`);
    } else if (log.id === 'log-2') {
      log.location = `${suburb} Main Road`;
      log.desc = log.desc.replace(/Sector 15 Main Road/g, `${suburb} Main Road`);
    } else if (log.id === 'log-3') {
      log.location = `${suburb} Commercial Hub`;
      log.desc = log.desc.replace(/Sector 37 Commercial Hub/g, `${suburb} Commercial Hub`);
    } else if (log.id === 'log-4') {
      log.location = `${suburb}`;
      log.desc = log.desc.replace(/Sector 21C/g, `${suburb}`);
    } else if (log.id === 'log-5') {
      log.location = `${road} Path`;
      log.desc = log.desc.replace(/Neelam Chowk Path/g, `${road} Path`);
    }
  });

  // Re-render everything with new values
  renderApp();
}

// Map Initialization
function initMaps() {
  // Google Maps tile template
  const googleRoadTiles = 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
  const tileOptions = {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Map data &copy; <a href="https://www.google.com/maps">Google Maps</a>'
  };

  // 1. Dashboard Minimap
  const dashboardMapEl = document.getElementById('dashboard-map');
  if (dashboardMapEl) {
    dashboardMapInstance = L.map('dashboard-map', {
      zoomControl: false,
      dragging: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false
    }).setView(cityCenter, 13);

    L.tileLayer(googleRoadTiles, tileOptions).addTo(dashboardMapInstance);
  }

  // 2. Interactive Map View
  const interactiveMapEl = document.getElementById('interactive-map');
  if (interactiveMapEl) {
    interactiveMapInstance = L.map('interactive-map', {
      zoomControl: false
    }).setView(cityCenter, state.zoomLevel);

    L.tileLayer(googleRoadTiles, tileOptions).addTo(interactiveMapInstance);
  }
}

function setNewIssuePlacementMarker(lat, lng, showToast = false, panMap = true) {
  // Auto-populate form coordinate inputs
  const latField = document.getElementById('issue-lat');
  const lngField = document.getElementById('issue-lng');
  if (latField) latField.value = lat.toFixed(5);
  if (lngField) lngField.value = lng.toFixed(5);

  // Add/move placement marker on map
  if (interactiveMapInstance) {
    if (placementMarker) {
      placementMarker.setLatLng([lat, lng]);
    } else {
      const placementIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div class="marker-pin active-new" style="background-color:#5A4FCF; border-color:#000000; animation: bounce 0.6s infinite alternate;"></div><div class="marker-label" style="background-color:#5A4FCF; color:#ffffff; border-color:#000000;">New Issue Pin</div>`,
        iconSize: [28, 40],
        iconAnchor: [6, 6]
      });
      placementMarker = L.marker([lat, lng], { icon: placementIcon }).addTo(interactiveMapInstance);
    }

    if (panMap) {
      interactiveMapInstance.setView([lat, lng], 15);
    }
  }

  if (showToast) {
    // Flash a notification so the user knows they pinned a location
    const msg = document.createElement('div');
    msg.style.position = 'absolute';
    msg.style.bottom = '80px';
    msg.style.left = '50%';
    msg.style.transform = 'translateX(-50%)';
    msg.style.backgroundColor = '#0f172a';
    msg.style.color = '#ffffff';
    msg.style.padding = '8px 16px';
    msg.style.borderRadius = '4px';
    msg.style.fontSize = '12px';
    msg.style.zIndex = '10000';
    msg.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    msg.textContent = `Pinned coordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)}. Auto-filled in report form!`;
    
    const mapContainer = document.getElementById('interactive-map');
    if (mapContainer) {
      mapContainer.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
    }
  }
}

// Navigation Setup
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      switchTab(target);
    });
  });

  // Logo redirect to Dashboard
  const logoTrigger = document.getElementById('logo-trigger');
  if (logoTrigger) {
    logoTrigger.addEventListener('click', () => {
      switchTab('dashboard');
    });
  }

  // Profile icon header redirect
  const profileBtn = document.getElementById('profile-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      switchTab('profile');
    });
  }

  // Minimap widget redirect to Map View
  const minimap = document.getElementById('dashboard-map');
  if (minimap) {
    minimap.addEventListener('click', () => {
      switchTab('map');
    });
  }

  // Report issue redirect from Home minimap banner
  const reportRedirect = document.getElementById('btn-report-redirect');
  if (reportRedirect) {
    reportRedirect.addEventListener('click', (e) => {
      e.stopPropagation();
      switchTab('report');
    });
  }
}

function switchTab(targetTabId) {
  state.activeTab = targetTabId;
  
  // Update header links
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-target') === targetTabId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Toggle active views
  document.querySelectorAll('.page-view').forEach(view => {
    if (view.id === `view-${targetTabId}`) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });

  // Refresh Leaflet size calculation when tabs change
  if (targetTabId === 'map' && interactiveMapInstance) {
    setTimeout(() => {
      interactiveMapInstance.invalidateSize();
      renderMap();
    }, 100);
  } else if (targetTabId === 'dashboard' && dashboardMapInstance) {
    setTimeout(() => {
      dashboardMapInstance.invalidateSize();
      renderMap();
    }, 100);
  }
}

// Setup Form Handlers
function setupFormHandlers() {
  const form = document.getElementById('issue-report-form');
  const cancelBtn = document.getElementById('btn-cancel-report');
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-upload');
  const filePreview = document.getElementById('file-upload-preview');

  if (dropZone) {
    // Drag and drop feedback
    ['dragenter', 'dragover'].forEach(name => {
      dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(name => {
      dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
      });
    });

    dropZone.addEventListener('click', () => {
      if (fileInput) fileInput.click();
    });

    dropZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      if (dt.files.length > 0 && fileInput) {
        fileInput.files = dt.files;
        const file = dt.files[0];
        if (filePreview) {
          filePreview.textContent = `Selected file: ${file.name}`;
          filePreview.style.display = 'block';
        }
        // Convert to Base64
        const reader = new FileReader();
        reader.onload = (ev) => {
          uploadedImageBase64 = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (fileInput && filePreview) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        filePreview.textContent = `Selected file: ${file.name}`;
        filePreview.style.display = 'block';
        // Convert to Base64
        const reader = new FileReader();
        reader.onload = (ev) => {
          uploadedImageBase64 = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      if (form) form.reset();
      if (filePreview) filePreview.style.display = 'none';
      uploadedImageBase64 = null;
      if (placementMarker && interactiveMapInstance) {
        interactiveMapInstance.removeLayer(placementMarker);
        placementMarker = null;
      }
      setDefaultFormCoordinates();
      switchTab('dashboard');
    });
  }

  // Form Submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const category = document.getElementById('issue-category').value;
      const title = document.getElementById('issue-summary').value;
      const location = document.getElementById('issue-location').value;
      const description = document.getElementById('issue-description').value || 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
      const lat = parseFloat(document.getElementById('issue-lat').value);
      const lng = parseFloat(document.getElementById('issue-lng').value);
      
      // Generate a random ID
      const newId = String(Math.floor(1000 + Math.random() * 9000));

      const newIssue = {
        id: newId,
        title: title,
        description: description,
        location: location,
        category: category,
        status: 'OPEN',
        reportedTime: 'Just now',
        reportedDate: 'June 22, 2026',
        reporter: 'Resident User #402',
        coordinates: { lat, lng },
        imageBase64: uploadedImageBase64,
        timeline: [
          { title: 'Report Logged', time: 'Just now', complete: true }
        ]
      };

      // Add to custom issues array and persist to local storage
      customIssues.unshift(newIssue);
      localStorage.setItem('community_custom_issues', JSON.stringify(customIssues));

      // Add to custom logs array and persist to local storage
      const newLog = {
        id: `log-${Date.now()}`,
        location: location,
        time: 'JUST NOW',
        desc: `Resident User #402 filed a <span class="font-bold">NEW REPORT: Issue #${newId} (${title})</span> near the ${location} area.`,
        tag: 'NEW',
        type: 'new'
      };
      customLogs.unshift(newLog);
      localStorage.setItem('community_custom_activity_logs', JSON.stringify(customLogs));

      // Prepend to issues state
      state.issues.unshift(newIssue);
      state.selectedIssueId = newId;
      activityLogs.unshift(newLog);

      // Reset Form & placements
      form.reset();
      if (filePreview) filePreview.style.display = 'none';
      uploadedImageBase64 = null;
      if (placementMarker && interactiveMapInstance) {
        interactiveMapInstance.removeLayer(placementMarker);
        placementMarker = null;
      }
      setDefaultFormCoordinates();

      // Refresh UI & switch tab to Dashboard
      renderApp();
      switchTab('dashboard');
    });
  }
}

// Map Controls Setup
function setupMapControls() {
  const zoomInBtn = document.getElementById('zoom-in');
  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      if (interactiveMapInstance) interactiveMapInstance.zoomIn();
    });
  }

  const zoomOutBtn = document.getElementById('zoom-out');
  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      if (interactiveMapInstance) interactiveMapInstance.zoomOut();
    });
  }

  const zoomResetBtn = document.getElementById('zoom-reset');
  if (zoomResetBtn) {
    zoomResetBtn.addEventListener('click', () => {
      if (interactiveMapInstance) interactiveMapInstance.setView(cityCenter, 14);
    });
  }

  // Locate Me button listener
  const locateMeBtn = document.getElementById('btn-locate-me');
  if (locateMeBtn) {
    locateMeBtn.addEventListener('click', () => {
      if (interactiveMapInstance && cityCenter) {
        interactiveMapInstance.setView(cityCenter, 15);
        
        locateMeBtn.textContent = "[ Centered! ]";
        setTimeout(() => {
          locateMeBtn.textContent = "[ Locate Me ]";
        }, 1500);
      }
    });
  }
}

// Setup Filters & Search
function setupFiltersAndSearch() {
  // Global search input & suggestions dropdown
  const searchInput = document.getElementById('global-search');
  const searchDropdown = document.getElementById('search-suggestions-dropdown');
  if (searchInput && searchDropdown) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      state.searchQuery = query;
      
      // Filter dashboard table immediately
      renderIssuesTable();

      if (!query) {
        searchDropdown.style.display = 'none';
        searchDropdown.innerHTML = '';
        return;
      }

      // Filter matching issues
      const matches = state.issues.filter(issue => 
        issue.title.toLowerCase().includes(query) || 
        issue.description.toLowerCase().includes(query) || 
        issue.location.toLowerCase().includes(query) || 
        issue.id.includes(query)
      );

      if (matches.length === 0) {
        searchDropdown.innerHTML = `
          <div style="padding: 12px 14px; font-size: 11px; color: var(--text-muted); text-align: center;">
            No matching issues found
          </div>
        `;
        searchDropdown.style.display = 'block';
        return;
      }

      searchDropdown.innerHTML = '';
      matches.forEach(issue => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        item.style.padding = '8px 12px';
        item.style.cursor = 'pointer';
        item.style.borderBottom = '1px solid var(--border-light)';
        item.style.textAlign = 'left';
        item.innerHTML = `
          <div style="font-weight: bold; font-size: 8px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; font-family: var(--font-mono); margin-bottom: 2px;">
            [${issue.category}] #${issue.id} - ${issue.status}
          </div>
          <div style="font-weight: bold; color: var(--text-primary); font-size: 12px;">${issue.title}</div>
          <div style="font-size: 10px; color: var(--text-muted); margin-top: 2px;">${issue.location}</div>
        `;

        item.addEventListener('click', () => {
          searchInput.value = issue.title;
          state.searchQuery = '';
          searchDropdown.style.display = 'none';
          
          // Select and show on map
          state.selectedIssueId = issue.id;
          switchTab('map');
          
          // Re-render dashboard table to remove filter
          renderIssuesTable();
        });

        searchDropdown.appendChild(item);
      });
      searchDropdown.style.display = 'block';
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.style.display = 'none';
      }
    });
  }

  // Table filters
  const filterStatus = document.getElementById('table-filter-status');
  if (filterStatus) {
    filterStatus.addEventListener('change', () => {
      renderIssuesTable();
    });
  }

  const filterCategory = document.getElementById('table-filter-category');
  if (filterCategory) {
    filterCategory.addEventListener('change', () => {
      renderIssuesTable();
    });
  }

  // Export button click listener
  const exportBtn = document.getElementById('btn-export-issues');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      // Helper to format values for CSV
      const escapeCSV = (str) => {
        if (str === undefined || str === null) return '';
        let val = String(str);
        // If the string contains double quotes, commas, or newlines, wrap it in double quotes and escape existing quotes
        if (val.includes('"') || val.includes(',') || val.includes('\n') || val.includes('\r')) {
          val = '"' + val.replace(/"/g, '""') + '"';
        }
        return val;
      };

      const headers = [
        'ID', 'Category', 'Title', 'Location', 'Latitude', 'Longitude', 
        'Status', 'Upvotes', 'Reported Date', 'Reported Time', 'Reporter', 'Description'
      ];

      const rows = state.issues.map(issue => {
        const lat = issue.coordinates ? issue.coordinates.lat : '';
        const lng = issue.coordinates ? issue.coordinates.lng : '';
        return [
          escapeCSV(issue.id),
          escapeCSV(issue.category),
          escapeCSV(issue.title),
          escapeCSV(issue.location),
          escapeCSV(lat),
          escapeCSV(lng),
          escapeCSV(issue.status),
          escapeCSV(issue.upvotes),
          escapeCSV(issue.reportedDate),
          escapeCSV(issue.reportedTime),
          escapeCSV(issue.reporter),
          escapeCSV(issue.description)
        ].join(',');
      });

      // Add Byte Order Mark (BOM) for UTF-8 compatibility with Excel
      const csvContent = '\uFEFF' + headers.join(',') + '\n' + rows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", url);
      downloadAnchor.setAttribute("download", `community_reports_${Date.now()}.csv`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      URL.revokeObjectURL(url);
    });
  }

  // Activity filter tabs
  const activityTabs = document.querySelectorAll('#view-activity .btn-tab-filter');
  activityTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      activityTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.activityFilter = tab.getAttribute('data-filter');
      renderActivityFeed();
    });
  });
}

// Render Master Coordinator
function renderApp() {
  renderStats();
  renderIssuesTable();
  renderActiveIssuesSidebar();
  renderActivityFeed();
  renderProfileIssues();
  renderMap();
}

// Render Stats counters
function renderStats() {
  // Profile counts
  const userReported = state.issues.filter(i => i.reporter === 'Resident User #402').length;
  const userResolved = state.issues.filter(i => i.reporter === 'Resident User #402' && (i.status === 'RESOLVED' || i.status === 'CLOSED')).length;

  const reportedEl = document.getElementById('profile-reported-count');
  if (reportedEl) reportedEl.textContent = userReported;

  const resolvedEl = document.getElementById('profile-resolved-count');
  if (resolvedEl) resolvedEl.textContent = userResolved;

  // System Metrics counts
  const totalReports = state.issues.length;
  const resolvedReports = state.issues.filter(i => i.status === 'RESOLVED' || i.status === 'CLOSED').length;
  const openReports = state.issues.filter(i => i.status === 'OPEN').length;
  const pendingReports = state.issues.filter(i => i.status === 'PENDING' || i.status === 'IN PROGRESS').length;

  const totalEl = document.getElementById('stats-total-count');
  if (totalEl) totalEl.textContent = totalReports;

  const resolvedSysEl = document.getElementById('stats-resolved-count');
  if (resolvedSysEl) resolvedSysEl.textContent = resolvedReports;

  const openEl = document.getElementById('stats-open-count');
  if (openEl) openEl.textContent = openReports;

  const pendingEl = document.getElementById('stats-pending-count');
  if (pendingEl) pendingEl.textContent = pendingReports;
}

// Helpers for badges
function getStatusBadgeClass(status) {
  switch (status.toUpperCase()) {
    case 'OPEN': return 'badge-open';
    case 'PENDING': return 'badge-pending';
    case 'CLOSED': return 'badge-closed';
    case 'RESOLVED': return 'badge-resolved';
    default: return 'badge-open';
  }
}

// Filter issues by search, category and status
function getFilteredIssues() {
  const statusFilterEl = document.getElementById('table-filter-status');
  const categoryFilterEl = document.getElementById('table-filter-category');

  const statusFilter = statusFilterEl ? statusFilterEl.value : 'all';
  const categoryFilter = categoryFilterEl ? categoryFilterEl.value : 'all';

  return state.issues.filter(issue => {
    const matchesSearch = 
      issue.id.includes(state.searchQuery) ||
      issue.title.toLowerCase().includes(state.searchQuery) ||
      issue.location.toLowerCase().includes(state.searchQuery);
    
    const matchesStatus = (statusFilter === 'all') || (issue.status === statusFilter);
    const matchesCategory = (categoryFilter === 'all') || (issue.category === categoryFilter);
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
}

// Render Dashboard table
function renderIssuesTable() {
  const tbody = document.getElementById('issues-table-body');
  if (!tbody) return;

  const filtered = getFilteredIssues();
  tbody.innerHTML = '';
  
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px;">No reports match the filters.</td></tr>`;
    return;
  }

  filtered.forEach(issue => {
    const isResolvedOrClosed = issue.status === 'RESOLVED' || issue.status === 'CLOSED';
    let isOlderThan5Days = false;
    if (isResolvedOrClosed && issue.resolvedDate) {
      const resolvedTime = new Date(issue.resolvedDate).getTime();
      const currentTime = new Date().getTime();
      const diffDays = (currentTime - resolvedTime) / (1000 * 60 * 60 * 24);
      isOlderThan5Days = diffDays > 5;
    }
    const hasPin = state.forcedHistoryPins && state.forcedHistoryPins.includes(issue.id);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="issue-id-cell" data-id="${issue.id}">#${issue.id}</td>
      <td>${issue.title} - ${issue.description}</td>
      <td>${issue.location}</td>
      <td>${issue.category}</td>
      <td>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="status-badge ${getStatusBadgeClass(issue.status)}">${issue.status}</span>
          ${isOlderThan5Days ? `
            <button class="btn-toggle-table-pin" data-id="${issue.id}" style="background: #ffffff; border: 1.5px solid var(--border-gray); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; padding: 0; border-radius: 4px; box-shadow: 1px 1px 0px #000000; outline: none;" title="${hasPin ? 'Remove Pin from Map' : 'Show Pin on Map'}">
              <i class="ti ${hasPin ? 'ti-map-pin-off' : 'ti-map-pin'}" style="font-size: 10px; color: #000000; font-weight: bold;"></i>
            </button>
          ` : ''}
        </div>
      </td>
    `;

    // Click ID to view in map tracking
    const cell = tr.querySelector('.issue-id-cell');
    if (cell) {
      cell.addEventListener('click', () => {
        state.selectedIssueId = issue.id;
        switchTab('map');
      });
    }

    // Bind pin toggle button
    if (isOlderThan5Days) {
      const pinBtn = tr.querySelector('.btn-toggle-table-pin');
      if (pinBtn) {
        pinBtn.addEventListener('click', (e) => {
          e.stopPropagation(); // Don't trigger cell view click
          if (!state.forcedHistoryPins) {
            state.forcedHistoryPins = [];
          }
          const idx = state.forcedHistoryPins.indexOf(issue.id);
          if (idx === -1) {
            state.forcedHistoryPins.push(issue.id);
          } else {
            state.forcedHistoryPins.splice(idx, 1);
          }
          localStorage.setItem('community_forced_history_pins', JSON.stringify(state.forcedHistoryPins));
          
          renderMapMarkers();
          renderIssuesTable();
        });
      }
    }

    tbody.appendChild(tr);
  });
}

// Render Dashboard Sidebar (Active / unresolved issues)
function renderActiveIssuesSidebar() {
  const listContainer = document.getElementById('active-issues-list');
  if (!listContainer) return;

  listContainer.innerHTML = '';

  let activeCount = 0;

  state.issues.forEach(issue => {
    if (issue.status === 'RESOLVED' || issue.status === 'CLOSED') {
      return; // Skip resolved and closed issues
    }
    activeCount++;

    const item = document.createElement('div');
    item.className = 'sidebar-item';
    
    item.innerHTML = `
      <div class="sidebar-item-header">
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="width:16px; height:16px; border-radius:50%; border:1.5px solid var(--border-gray); display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:bold; color:var(--text-muted);">X</div>
          <span class="sidebar-item-title">${issue.title}</span>
        </div>
        <span class="sidebar-item-time">${issue.reportedTime}</span>
      </div>
      <div style="font-size: 11px; color: var(--text-muted); margin-left: 24px;">${issue.location}</div>
      <div class="sidebar-item-desc" style="margin-left: 24px;">${issue.description}</div>
      <div style="margin-top: 12px; margin-left: 24px; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:11px; color:var(--text-muted);">Report #${issue.id}</span>
        <span class="status-badge ${getStatusBadgeClass(issue.status)}" style="font-size: 9px; min-width: 65px; padding: 1px 4px;">${issue.status}</span>
      </div>
    `;

    item.addEventListener('click', () => {
      state.selectedIssueId = issue.id;
      switchTab('map');
    });

    listContainer.appendChild(item);
  });

  if (activeCount === 0) {
    listContainer.innerHTML = '<div style="text-align:center; padding:20px; color:var(--text-muted); font-size:11px;">No active issues to display.</div>';
  }
}

// Render User Profile Reports List
function renderProfileIssues() {
  const container = document.getElementById('profile-issues-list');
  if (!container) return;

  const userIssues = state.issues.filter(i => i.reporter === 'Resident User #402');
  container.innerHTML = '';

  if (userIssues.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted);">You have not filed any reports yet.</div>`;
    return;
  }

  userIssues.forEach(issue => {
    const card = document.createElement('div');
    card.className = 'sidebar-item';
    card.style.display = 'flex';
    card.style.justifyContent = 'space-between';
    card.style.alignItems = 'center';
    
    card.innerHTML = `
      <div style="display: flex; gap: 12px; align-items: center;">
        <div style="width:24px; height:24px; border-radius:50%; border:1.5px solid var(--border-gray); display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:bold; color:var(--text-muted); flex-shrink: 0;">X</div>
        <div>
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase;">${issue.title}</h4>
          <p style="font-size: 11px; color: var(--text-muted);">${issue.location} | Category: ${issue.category}</p>
          <p style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">
            Tracking Token ID: <span style="font-weight: 700; color: var(--text-primary);">#${issue.id}</span>
          </p>
        </div>
      </div>
      <div style="text-align: right;">
        <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 8px;">Reported: ${issue.reportedDate}</p>
        <span class="status-badge ${getStatusBadgeClass(issue.status)}" style="font-size:9px; min-width:70px; padding: 1px 4px;">${issue.status}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      state.selectedIssueId = issue.id;
      switchTab('map');
    });

    container.appendChild(card);
  });
}

// Render Activity Feed
function renderActivityFeed() {
  const container = document.getElementById('activity-feed-list');
  if (!container) return;

  container.innerHTML = '';

  let filtered = activityLogs;
  if (state.activityFilter !== 'all') {
    filtered = activityLogs.filter(log => log.type === state.activityFilter);
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div class="card" style="text-align:center; padding:30px; color:var(--text-muted);">No activity logs in this category.</div>`;
    return;
  }

  filtered.forEach(log => {
    const card = document.createElement('div');
    card.className = 'card activity-card';
    
    let iconHTML = '';
    
    if (log.type === 'resolved') {
      iconHTML = '<i class="ti ti-check" style="font-weight: bold; color: #4b5563;"></i>';
    } else if (log.type === 'update') {
      iconHTML = '<span style="font-family: serif; font-weight: bold; font-size:14px; color: #4b5563;">i</span>';
    } else {
      iconHTML = '<i class="ti ti-plus" style="font-weight: bold; color: #4b5563;"></i>';
    }

    card.innerHTML = `
      <div class="activity-icon-container">
        ${iconHTML}
      </div>
      <div class="activity-details">
        <div class="activity-meta">
          <span class="activity-location">${log.location}</span>
          <span>${log.time}</span>
        </div>
        <div class="activity-desc">${log.desc}</div>
        <span class="activity-log-tag">System Log [${log.tag}]</span>
      </div>
    `;

    const refLink = card.querySelector('.activity-issue-ref');
    if (refLink) {
      refLink.addEventListener('click', () => {
        const idMatch = refLink.textContent.match(/#(\d+)/);
        if (idMatch && idMatch[1]) {
          state.selectedIssueId = idMatch[1];
          switchTab('map');
        }
      });
    }

    container.appendChild(card);
  });
}

// Render Map and Map Markers
function renderMap() {
  if (!dashboardMapInstance || !interactiveMapInstance) return;
  renderMapMarkers();
  renderTrackingDetails();
}

// Check if resolved issues are older than 5 days
function shouldShowMapPin(issue) {
  if (issue.status !== 'RESOLVED' && issue.status !== 'CLOSED') {
    return true; // Active or pending issues are always shown
  }
  // Check if manually forced to show via History option
  if (state.forcedHistoryPins && state.forcedHistoryPins.includes(issue.id)) {
    return true;
  }
  if (!issue.resolvedDate) {
    return true; // Default fallback if no date is recorded
  }
  const resolvedTime = new Date(issue.resolvedDate).getTime();
  const currentTime = new Date().getTime();
  const diffDays = (currentTime - resolvedTime) / (1000 * 60 * 60 * 24);
  return diffDays <= 5;
}

function renderMapMarkers() {
  // Clear any existing Leaflet markers from instances
  dashboardMarkers.forEach(m => dashboardMapInstance.removeLayer(m));
  interactiveMarkers.forEach(m => interactiveMapInstance.removeLayer(m));
  
  dashboardMarkers = [];
  interactiveMarkers = [];

  state.issues.forEach(issue => {
    // Skip placing markers for issues resolved more than 5 days ago
    if (!shouldShowMapPin(issue)) {
      return;
    }

    // Determine pin type
    let pinType = 'active-new';
    if (issue.status === 'IN PROGRESS') pinType = 'in-progress';
    else if (issue.status === 'RESOLVED' || issue.status === 'CLOSED') pinType = 'resolved';

    // Create custom Leaflet divIcon
    const customIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `<div class="marker-pin ${pinType}"></div><div class="marker-label">#${issue.id}:<br>${issue.title.split(' ')[0]}</div>`,
      iconSize: [40, 48],
      iconAnchor: [7, 7]
    });

    const miniIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `<div class="marker-pin ${pinType}" style="transform: scale(0.75);"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });

    // 1. Place on Interactive Map
    if (interactiveMapInstance) {
      const marker = L.marker([issue.coordinates.lat, issue.coordinates.lng], { icon: customIcon })
        .addTo(interactiveMapInstance);
      
      // Bind click selection
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        state.selectedIssueId = issue.id;
        interactiveMapInstance.setView([issue.coordinates.lat, issue.coordinates.lng], 16);
        renderTrackingDetails();
      });

      interactiveMarkers.push(marker);
    }

    // 2. Place on Dashboard Map
    if (dashboardMapInstance) {
      const marker = L.marker([issue.coordinates.lat, issue.coordinates.lng], { icon: miniIcon })
        .addTo(dashboardMapInstance);
      
      dashboardMarkers.push(marker);
    }
  });

  // 3. Place User's Location Marker (if detected/initialized)
  if (cityCenter) {
    const userLocationIcon = L.divIcon({
      className: 'custom-leaflet-marker user-location-marker-container',
      html: `<div class="marker-pin user-location"></div><div class="marker-label" style="background-color: #3b82f6; color: #ffffff; border-color: #3b82f6; font-weight: bold; font-family: var(--font-mono); font-size: 9px; padding: 1px 4px;">YOU</div>`,
      iconSize: [40, 48],
      iconAnchor: [7, 7]
    });

    const userLocationMiniIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `<div class="marker-pin user-location" style="transform: scale(0.75);"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });

    if (interactiveMapInstance) {
      const userMarker = L.marker(cityCenter, { icon: userLocationIcon })
        .addTo(interactiveMapInstance);
      interactiveMarkers.push(userMarker);
    }

    if (dashboardMapInstance) {
      const userMiniMarker = L.marker(cityCenter, { icon: userLocationMiniIcon })
        .addTo(dashboardMapInstance);
      dashboardMarkers.push(userMiniMarker);
    }
  }

  // If there's a selected issue, pan the main interactive map to it
  if (state.activeTab === 'map' && state.selectedIssueId) {
    const selected = state.issues.find(i => i.id === state.selectedIssueId);
    if (selected && interactiveMapInstance) {
      interactiveMapInstance.setView([selected.coordinates.lat, selected.coordinates.lng], 16);
    }
  }
}

// Render Map Sidebar Tracking Details Panel
function renderTrackingDetails() {
  const panel = document.getElementById('tracking-detail-panel');
  if (!panel) return;

  const issue = state.issues.find(i => i.id === state.selectedIssueId);
  
  if (!issue) {
    panel.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; flex-grow:1; text-align:center; color:var(--text-muted); padding: 40px 20px;">
        <i class="ti ti-map-pin" style="font-size: 36px; margin-bottom: 12px; color: var(--border-gray);"></i>
        <p style="font-size:13px; font-weight:700; text-transform:uppercase;">No Issue Selected</p>
        <p style="font-size:11px; margin-top:2px;">Select a map pin coordinate marker to load details.</p>
      </div>
    `;
    return;
  }

  // Build timeline steps
  let timelineStepsHTML = '';
  issue.timeline.forEach((step, index) => {
    const isCompleted = step.complete;
    const dotClass = isCompleted ? (issue.status === 'IN PROGRESS' && index === 1 ? 'in-progress' : 'complete') : 'pending';
    const titleClass = isCompleted ? '' : 'pending';
    
    timelineStepsHTML += `
      <div class="timeline-step">
        <div class="timeline-dot ${dotClass}"></div>
        <div class="timeline-content">
          <span class="timeline-title ${titleClass}">${step.title}</span>
          <span class="timeline-time">${step.time}</span>
        </div>
      </div>
    `;
  });

  panel.innerHTML = `
    <h2 style="font-size: 15px; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">Tracking Details: ${issue.title}</h2>
    <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">
      <div><strong>ID:</strong> #${issue.id} | <strong>Location:</strong> ${issue.location}</div>
      <div style="margin-top: 4px;"><strong>Current Status:</strong> [ <span style="font-weight:700; color:var(--text-primary); text-transform:uppercase; letter-spacing:0.05em;">${issue.status}</span> ] | <strong>Upvotes:</strong> <span id="issue-upvotes-count">${issue.upvotes || 0}</span></div>
      <div style="margin-top: 4px; font-family: monospace; font-size:10px;"><strong>Lat/Lng:</strong> ${issue.coordinates.lat.toFixed(5)}, ${issue.coordinates.lng.toFixed(5)}</div>
    </div>
    
    <div style="font-size: 12px; color: var(--text-primary); line-height: 1.4; margin-bottom: 16px; font-style: italic;">
      Details: ${issue.description === 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' ? 'No additional description provided.' : issue.description}
    </div>

    ${issue.imageBase64 ? `
      <div style="margin-top: 8px; margin-bottom: 16px; border: 2px solid var(--border-gray); padding: 4px; background: #ffffff;">
        <img src="${issue.imageBase64}" style="width: 100%; max-height: 160px; object-fit: cover;" alt="Issue Attachment" />
      </div>
    ` : ''}
    
    <div class="tracking-timeline">
      ${timelineStepsHTML}
    </div>
    
    ${issue.status !== 'RESOLVED' && issue.status !== 'CLOSED' ? `
      <div style="margin-top: auto; padding-top: 24px; display:flex; gap:8px;">
        <button class="btn btn-secondary" id="btn-upvote-issue" style="flex:1;" ${state.upvotedIssues.includes(issue.id) ? 'disabled' : ''}>
          ${state.upvotedIssues.includes(issue.id) ? 'Upvoted' : 'Upvote'}
        </button>
        <button class="btn btn-primary" id="btn-resolve-issue-mock" style="flex:1;">
          Resolve
        </button>
      </div>
    ` : (() => {
      const isResolvedOrClosed = issue.status === 'RESOLVED' || issue.status === 'CLOSED';
      let isOlderThan5Days = false;
      if (isResolvedOrClosed && issue.resolvedDate) {
        const resolvedTime = new Date(issue.resolvedDate).getTime();
        const currentTime = new Date().getTime();
        const diffDays = (currentTime - resolvedTime) / (1000 * 60 * 60 * 24);
        isOlderThan5Days = diffDays > 5;
      }
      if (isOlderThan5Days) {
        const hasPin = state.forcedHistoryPins && state.forcedHistoryPins.includes(issue.id);
        return `
          <div style="margin-top: auto; padding-top: 24px; display:flex; gap:8px;">
            <button class="btn ${hasPin ? 'btn-secondary' : 'btn-primary'}" id="btn-toggle-history-pin" style="flex:1;">
              ${hasPin ? 'Remove Pin' : 'Show Pin on Map'}
            </button>
          </div>
        `;
      }
      return '';
    })()}
  `;

  // Bind mock actions inside panel
  const upvoteBtn = document.getElementById('btn-upvote-issue');
  if (upvoteBtn) {
    upvoteBtn.addEventListener('click', () => {
      // Increment upvote count in state
      issue.upvotes = (issue.upvotes || 0) + 1;
      
      // Update count on UI
      const countEl = document.getElementById('issue-upvotes-count');
      if (countEl) countEl.textContent = issue.upvotes;
      
      // Disable button
      upvoteBtn.disabled = true;
      upvoteBtn.textContent = 'Upvoted';

      // Track upvoted issue ID
      if (!state.upvotedIssues.includes(issue.id)) {
        state.upvotedIssues.push(issue.id);
        localStorage.setItem('community_upvoted_issues', JSON.stringify(state.upvotedIssues));
      }

      // Persist the increment
      const customIdx = customIssues.findIndex(i => i.id === issue.id);
      if (customIdx !== -1) {
        customIssues[customIdx].upvotes = issue.upvotes;
        localStorage.setItem('community_custom_issues', JSON.stringify(customIssues));
      } else {
        const defaultIssuesUpvotes = JSON.parse(localStorage.getItem('community_default_issues_upvotes')) || {};
        defaultIssuesUpvotes[issue.id] = (defaultIssuesUpvotes[issue.id] || 0) + 1;
        localStorage.setItem('community_default_issues_upvotes', JSON.stringify(defaultIssuesUpvotes));
      }

      const newLog = {
        id: `log-${Date.now()}`,
        location: issue.location,
        time: 'JUST NOW',
        desc: `Community upvote recorded for <span class="font-bold">Issue #${issue.id} (${issue.title})</span>. Total upvotes: <span class="font-bold">${issue.upvotes}</span>.`,
        tag: 'UPDATE',
        type: 'update'
      };
      activityLogs.unshift(newLog);
      customLogs.unshift(newLog);
      localStorage.setItem('community_custom_activity_logs', JSON.stringify(customLogs));
      renderApp();
    });
  }

  const resolveBtn = document.getElementById('btn-resolve-issue-mock');
  if (resolveBtn) {
    resolveBtn.addEventListener('click', () => {
      // Mock Resolve issue
      issue.status = 'RESOLVED';
      issue.resolvedDate = new Date().toISOString();
      issue.timeline.push({
        title: 'Resolved Verification: marked fixed',
        time: 'Just now',
        complete: true
      });
      
      const newLog = {
        id: `log-${Date.now()}`,
        location: issue.location,
        time: 'JUST NOW',
        desc: `Municipal Maintenance Team marked <span class="font-bold">Issue #${issue.id} (${issue.title})</span> as <span class="font-bold">RESOLVED</span>. Verification: marked fixed.`,
        tag: 'RESOLVED',
        type: 'resolved'
      };
      activityLogs.unshift(newLog);

      // Persist status change in customIssues
      const customIdx = customIssues.findIndex(i => i.id === issue.id);
      if (customIdx !== -1) {
        customIssues[customIdx].status = 'RESOLVED';
        customIssues[customIdx].resolvedDate = issue.resolvedDate;
        customIssues[customIdx].timeline = issue.timeline;
        localStorage.setItem('community_custom_issues', JSON.stringify(customIssues));
      }

      customLogs.unshift(newLog);
      localStorage.setItem('community_custom_activity_logs', JSON.stringify(customLogs));

      renderApp();
    });
  }

  const toggleHistoryPinBtn = document.getElementById('btn-toggle-history-pin');
  if (toggleHistoryPinBtn) {
    toggleHistoryPinBtn.addEventListener('click', () => {
      if (!state.forcedHistoryPins) {
        state.forcedHistoryPins = [];
      }
      const idx = state.forcedHistoryPins.indexOf(issue.id);
      if (idx === -1) {
        state.forcedHistoryPins.push(issue.id);
      } else {
        state.forcedHistoryPins.splice(idx, 1);
      }
      localStorage.setItem('community_forced_history_pins', JSON.stringify(state.forcedHistoryPins));
      renderMapMarkers();
      renderTrackingDetails();
    });
  }
}
