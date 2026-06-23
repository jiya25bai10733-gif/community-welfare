
const cwState = {
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


let cwActivityLogs = [
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


let cwDashboardMap = null;
let cwMainMap = null;


let cwDashboardMarkers = [];
let cwMainMarkers = [];
let placementMarker = null;

let cwDetectedCenter = [28.4089, 77.3178]; 


let cwCustomIssues = [];
let cwCustomLogs = [];
let uploadedImageBase64 = null;


document.addEventListener('DOMContentLoaded', () => {
  cwLoadPersistedData();
  cwSetupConnectionStatus();
  setDefaultFormCoordinates();
  setupNavigation();
  cwSetupFormHandlers();
  cwSetupFiltersAndSearch();
  cwSetupMapControls();
  cwInitMaps();
  cwDetectLocationAndInit();
  cwSetupLocationAutocomplete();
  cwRenderApp();
});


function cwLoadPersistedData() {
  try {
    cwCustomIssues = JSON.parse(localStorage.getItem('community_custom_issues')) || [];
    cwCustomLogs = JSON.parse(localStorage.getItem('community_custom_activity_logs')) || [];
    cwState.upvotedIssues = JSON.parse(localStorage.getItem('community_upvoted_issues')) || [];
    cwState.forcedHistoryPins = JSON.parse(localStorage.getItem('community_forced_history_pins')) || [];
    
    
    const defaultIssuesUpvotes = JSON.parse(localStorage.getItem('community_default_issues_upvotes')) || {};
    cwState.issues.forEach(issue => {
      if (defaultIssuesUpvotes[issue.id]) {
        issue.upvotes = (issue.upvotes || 0) + defaultIssuesUpvotes[issue.id];
      }
    });
  } catch (e) {
    console.error("Failed to load local storage data:", e);
  }

  
  cwState.issues = [...cwCustomIssues, ...cwState.issues];
  
  
  cwActivityLogs = [...cwCustomLogs, ...cwActivityLogs];
}


function cwSetupConnectionStatus() {
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
  updateStatus(); 
}


function setDefaultFormCoordinates() {
  const latField = document.getElementById('issue-lat');
  const lngField = document.getElementById('issue-lng');
  if (latField) latField.value = cwDetectedCenter[0].toFixed(5);
  if (lngField) lngField.value = cwDetectedCenter[1].toFixed(5);
}


let autocompleteTimeout = null;

function cwSetupLocationAutocomplete() {
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

    
    autocompleteTimeout = setTimeout(() => {
      let url = `https://photon.komoot.io/api/?q=${encodeURIComponent(val)}&limit=5`;
      if (cwDetectedCenter && cwDetectedCenter.length === 2) {
        url += `&lat=${cwDetectedCenter[0]}&lon=${cwDetectedCenter[1]}`;
      }

      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error("Network error during autocomplete");
          return response.json();
        })
        .then(data => {
          const features = data.features || [];
          renderAutocompleteResults(features, inputEl, dropdownEl);

          
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

  
  document.addEventListener('click', (e) => {
    if (e.target !== inputEl && e.target !== dropdownEl && !dropdownEl.contains(e.target)) {
      dropdownEl.style.display = 'none';
    }
  });

  
  inputEl.addEventListener('focus', () => {
    if (inputEl.value.trim().length >= 3 && dropdownEl.children.length > 0) {
      dropdownEl.style.display = 'block';
    }
  });

  
  inputEl.addEventListener('blur', () => {
    setTimeout(() => {
      const val = inputEl.value.trim();
      if (val.length < 3) return;

      let url = `https://photon.komoot.io/api/?q=${encodeURIComponent(val)}&limit=1`;
      if (cwDetectedCenter && cwDetectedCenter.length === 2) {
        url += `&lat=${cwDetectedCenter[0]}&lon=${cwDetectedCenter[1]}`;
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

  
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = inputEl.value.trim();
      if (val.length >= 3) {
        e.preventDefault(); 
        
        let url = `https://photon.komoot.io/api/?q=${encodeURIComponent(val)}&limit=1`;
        if (cwDetectedCenter && cwDetectedCenter.length === 2) {
          url += `&lat=${cwDetectedCenter[0]}&lon=${cwDetectedCenter[1]}`;
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
    if (p.cwState) parts.push(p.cwState);
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
        
        
        setNewIssuePlacementMarker(lat, lng);
        
        console.log(`Autocomplete selected: ${formattedAddress} at (${lat}, ${lng})`);
      }
    });
    
    dropdownEl.appendChild(item);
  });

  dropdownEl.style.display = 'block';
}


function cwDetectLocationAndInit() {
  console.log("Tracking location...");
  
  if (!navigator.geolocation) {
    console.warn("Geolocation is not supported by this browser. Falling back to Faridabad.");
    cwInitFallbackLocation();
    return;
  }

  
  const subtextEl = document.getElementById('dashboard-map-subtext');
  if (subtextEl) {
    subtextEl.textContent = "Detecting your location to show nearby issues...";
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log(`Location detected: ${lat}, ${lng}`);
      
      cwDetectedCenter = [lat, lng];
      
      
      setDefaultFormCoordinates();
      
      
      cwUpdateIssuesCoordinates(lat, lng);
      
      
      cwRecenterMaps(lat, lng);
      
      
      cwFetchReverseGeocode(lat, lng);
    },
    (error) => {
      console.warn(`Geolocation failed/denied (Code ${error.code}): ${error.message}. Falling back to Faridabad.`);
      cwInitFallbackLocation();
    },
    {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 0
    }
  );
}

function cwInitFallbackLocation() {
  
  cwDetectedCenter = [28.4089, 77.3178];
  setDefaultFormCoordinates();
  cwUpdateIssuesCoordinates(cwDetectedCenter[0], cwDetectedCenter[1]);
  cwRecenterMaps(cwDetectedCenter[0], cwDetectedCenter[1]);
  
  
  cwUpdateLocationTexts("Faridabad", "Sector 15", "Mathura Road");
}

function cwUpdateIssuesCoordinates(lat, lng) {
  
  const offsets = {
    '1248': { dLat: 0.0061, dLng: -0.0038 },
    '1245': { dLat: 0.0021, dLng: 0.0012 },
    '1246': { dLat: 0.0141, dLng: -0.0158 },
    '1244': { dLat: -0.0069, dLng: -0.0018 },
    '1254': { dLat: -0.0109, dLng: 0.0032 }
  };
  
  cwState.issues.forEach(issue => {
    const offset = offsets[issue.id];
    if (offset) {
      issue.coordinates = {
        lat: lat + offset.dLat,
        lng: lng + offset.dLng
      };
    }
  });
}

function cwRecenterMaps(lat, lng) {
  if (cwDashboardMap) {
    cwDashboardMap.setView([lat, lng], 13);
  }
  if (cwMainMap) {
    cwMainMap.setView([lat, lng], cwState.zoomLevel);
  }
}

function cwFetchReverseGeocode(lat, lng) {
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
      
      cwUpdateLocationTexts(city, suburb, road);
    })
    .catch(error => {
      console.error("Reverse geocoding failed:", error);
      
      const city = "Local Area";
      const suburb = `Near ${lat.toFixed(3)}, ${lng.toFixed(3)}`;
      const road = "Main Road";
      cwUpdateLocationTexts(city, suburb, road);
    });
}

function cwUpdateLocationTexts(city, suburb, road) {
  
  const subtextEl = document.getElementById('dashboard-map-subtext');
  if (subtextEl) {
    subtextEl.textContent = `Interactive City Map: View Reported Issues in ${city}`;
  }
  
  
  const profileLocEl = document.getElementById('profile-location-text');
  if (profileLocEl) {
    profileLocEl.textContent = `${city} Resident • ${suburb}`;
  }
  
  
  cwState.issues.forEach(issue => {
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

  
  cwActivityLogs.forEach(log => {
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

  
  cwRenderApp();
}


function cwInitMaps() {
  
  const googleRoadTiles = 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
  const tileOptions = {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Map data &copy; <a href="https://www.google.com/maps">Google Maps</a>'
  };

  
  const dashboardMapEl = document.getElementById('dashboard-map');
  if (dashboardMapEl) {
    cwDashboardMap = L.map('dashboard-map', {
      zoomControl: false,
      dragging: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false
    }).setView(cwDetectedCenter, 13);

    L.tileLayer(googleRoadTiles, tileOptions).addTo(cwDashboardMap);
  }

  
  const interactiveMapEl = document.getElementById('interactive-map');
  if (interactiveMapEl) {
    cwMainMap = L.map('interactive-map', {
      zoomControl: false
    }).setView(cwDetectedCenter, cwState.zoomLevel);

    L.tileLayer(googleRoadTiles, tileOptions).addTo(cwMainMap);
  }
}

function setNewIssuePlacementMarker(lat, lng, showToast = false, panMap = true) {
  
  const latField = document.getElementById('issue-lat');
  const lngField = document.getElementById('issue-lng');
  if (latField) latField.value = lat.toFixed(5);
  if (lngField) lngField.value = lng.toFixed(5);

  
  if (cwMainMap) {
    if (placementMarker) {
      placementMarker.setLatLng([lat, lng]);
    } else {
      const placementIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div class="marker-pin active-new" style="background-color:#5A4FCF; border-color:#000000; animation: bounce 0.6s infinite alternate;"></div><div class="marker-label" style="background-color:#5A4FCF; color:#ffffff; border-color:#000000;">New Issue Pin</div>`,
        iconSize: [28, 40],
        iconAnchor: [6, 6]
      });
      placementMarker = L.marker([lat, lng], { icon: placementIcon }).addTo(cwMainMap);
    }

    if (panMap) {
      cwMainMap.setView([lat, lng], 15);
    }
  }

  if (showToast) {
    
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


function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      switchTab(target);
    });
  });

  
  const logoTrigger = document.getElementById('logo-trigger');
  if (logoTrigger) {
    logoTrigger.addEventListener('click', () => {
      switchTab('dashboard');
    });
  }

  
  const profileBtn = document.getElementById('profile-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      switchTab('profile');
    });
  }

  
  const minimap = document.getElementById('dashboard-map');
  if (minimap) {
    minimap.addEventListener('click', () => {
      switchTab('map');
    });
  }

  
  const reportRedirect = document.getElementById('btn-report-redirect');
  if (reportRedirect) {
    reportRedirect.addEventListener('click', (e) => {
      e.stopPropagation();
      switchTab('report');
    });
  }
}

function switchTab(targetTabId) {
  cwState.activeTab = targetTabId;
  
  
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-target') === targetTabId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  
  document.querySelectorAll('.page-view').forEach(view => {
    if (view.id === `view-${targetTabId}`) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });

  
  if (targetTabId === 'map' && cwMainMap) {
    setTimeout(() => {
      cwMainMap.invalidateSize();
      cwRenderMap();
    }, 100);
  } else if (targetTabId === 'dashboard' && cwDashboardMap) {
    setTimeout(() => {
      cwDashboardMap.invalidateSize();
      cwRenderMap();
    }, 100);
  }
}


function cwSetupFormHandlers() {
  const form = document.getElementById('issue-report-form');
  const cancelBtn = document.getElementById('btn-cancel-report');
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-upload');
  const filePreview = document.getElementById('file-upload-preview');

  if (dropZone) {
    
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
      if (placementMarker && cwMainMap) {
        cwMainMap.removeLayer(placementMarker);
        placementMarker = null;
      }
      setDefaultFormCoordinates();
      switchTab('dashboard');
    });
  }

  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const category = document.getElementById('issue-category').value;
      const title = document.getElementById('issue-summary').value;
      const location = document.getElementById('issue-location').value;
      const description = document.getElementById('issue-description').value || 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
      const lat = parseFloat(document.getElementById('issue-lat').value);
      const lng = parseFloat(document.getElementById('issue-lng').value);
      
      
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

      
      cwCustomIssues.unshift(newIssue);
      localStorage.setItem('community_custom_issues', JSON.stringify(cwCustomIssues));

      
      const newLog = {
        id: `log-${Date.now()}`,
        location: location,
        time: 'JUST NOW',
        desc: `Resident User #402 filed a <span class="font-bold">NEW REPORT: Issue #${newId} (${title})</span> near the ${location} area.`,
        tag: 'NEW',
        type: 'new'
      };
      cwCustomLogs.unshift(newLog);
      localStorage.setItem('community_custom_activity_logs', JSON.stringify(cwCustomLogs));

      
      cwState.issues.unshift(newIssue);
      cwState.selectedIssueId = newId;
      cwActivityLogs.unshift(newLog);

      
      form.reset();
      if (filePreview) filePreview.style.display = 'none';
      uploadedImageBase64 = null;
      if (placementMarker && cwMainMap) {
        cwMainMap.removeLayer(placementMarker);
        placementMarker = null;
      }
      setDefaultFormCoordinates();

      
      cwRenderApp();
      switchTab('dashboard');
    });
  }
}


function cwSetupMapControls() {
  const zoomInBtn = document.getElementById('zoom-in');
  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      if (cwMainMap) cwMainMap.zoomIn();
    });
  }

  const zoomOutBtn = document.getElementById('zoom-out');
  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      if (cwMainMap) cwMainMap.zoomOut();
    });
  }

  const zoomResetBtn = document.getElementById('zoom-reset');
  if (zoomResetBtn) {
    zoomResetBtn.addEventListener('click', () => {
      if (cwMainMap) cwMainMap.setView(cwDetectedCenter, 14);
    });
  }

  
  const locateMeBtn = document.getElementById('btn-locate-me');
  if (locateMeBtn) {
    locateMeBtn.addEventListener('click', () => {
      if (cwMainMap && cwDetectedCenter) {
        cwMainMap.setView(cwDetectedCenter, 15);
        
        locateMeBtn.textContent = "[ Centered! ]";
        setTimeout(() => {
          locateMeBtn.textContent = "[ Locate Me ]";
        }, 1500);
      }
    });
  }
}


function cwSetupFiltersAndSearch() {
  
  const searchInput = document.getElementById('global-search');
  const searchDropdown = document.getElementById('search-suggestions-dropdown');
  if (searchInput && searchDropdown) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      cwState.searchQuery = query;
      
      
      cwRenderIssuesTable();

      if (!query) {
        searchDropdown.style.display = 'none';
        searchDropdown.innerHTML = '';
        return;
      }

      
      const matches = cwState.issues.filter(issue => 
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
          cwState.searchQuery = '';
          searchDropdown.style.display = 'none';
          
          
          cwState.selectedIssueId = issue.id;
          switchTab('map');
          
          
          cwRenderIssuesTable();
        });

        searchDropdown.appendChild(item);
      });
      searchDropdown.style.display = 'block';
    });

    
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.style.display = 'none';
      }
    });
  }

  
  const filterStatus = document.getElementById('table-filter-status');
  if (filterStatus) {
    filterStatus.addEventListener('change', () => {
      cwRenderIssuesTable();
    });
  }

  const filterCategory = document.getElementById('table-filter-category');
  if (filterCategory) {
    filterCategory.addEventListener('change', () => {
      cwRenderIssuesTable();
    });
  }

  
  const exportBtn = document.getElementById('btn-export-issues');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      
      const escapeCSV = (str) => {
        if (str === undefined || str === null) return '';
        let val = String(str);
        
        if (val.includes('"') || val.includes(',') || val.includes('\n') || val.includes('\r')) {
          val = '"' + val.replace(/"/g, '""') + '"';
        }
        return val;
      };

      const headers = [
        'ID', 'Category', 'Title', 'Location', 'Latitude', 'Longitude', 
        'Status', 'Upvotes', 'Reported Date', 'Reported Time', 'Reporter', 'Description'
      ];

      const rows = cwState.issues.map(issue => {
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

  
  const activityTabs = document.querySelectorAll('#view-activity .btn-tab-filter');
  activityTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      activityTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      cwState.activityFilter = tab.getAttribute('data-filter');
      cwRenderActivityFeed();
    });
  });
}


function cwRenderApp() {
  cwRenderStats();
  cwRenderIssuesTable();
  cwRenderActiveIssuesSidebar();
  cwRenderActivityFeed();
  cwRenderProfileIssues();
  cwRenderMap();
}


function cwRenderStats() {
  
  const userReported = cwState.issues.filter(i => i.reporter === 'Resident User #402').length;
  const userResolved = cwState.issues.filter(i => i.reporter === 'Resident User #402' && (i.status === 'RESOLVED' || i.status === 'CLOSED')).length;

  const reportedEl = document.getElementById('profile-reported-count');
  if (reportedEl) reportedEl.textContent = userReported;

  const resolvedEl = document.getElementById('profile-resolved-count');
  if (resolvedEl) resolvedEl.textContent = userResolved;

  
  const totalReports = cwState.issues.length;
  const resolvedReports = cwState.issues.filter(i => i.status === 'RESOLVED' || i.status === 'CLOSED').length;
  const openReports = cwState.issues.filter(i => i.status === 'OPEN').length;
  const pendingReports = cwState.issues.filter(i => i.status === 'PENDING' || i.status === 'IN PROGRESS').length;

  const totalEl = document.getElementById('stats-total-count');
  if (totalEl) totalEl.textContent = totalReports;

  const resolvedSysEl = document.getElementById('stats-resolved-count');
  if (resolvedSysEl) resolvedSysEl.textContent = resolvedReports;

  const openEl = document.getElementById('stats-open-count');
  if (openEl) openEl.textContent = openReports;

  const pendingEl = document.getElementById('stats-pending-count');
  if (pendingEl) pendingEl.textContent = pendingReports;
}


function cwGetStatusBadgeClass(status) {
  switch (status.toUpperCase()) {
    case 'OPEN': return 'badge-open';
    case 'PENDING': return 'badge-pending';
    case 'CLOSED': return 'badge-closed';
    case 'RESOLVED': return 'badge-resolved';
    default: return 'badge-open';
  }
}


function cwGetFilteredIssues() {
  const statusFilterEl = document.getElementById('table-filter-status');
  const categoryFilterEl = document.getElementById('table-filter-category');

  const statusFilter = statusFilterEl ? statusFilterEl.value : 'all';
  const categoryFilter = categoryFilterEl ? categoryFilterEl.value : 'all';

  return cwState.issues.filter(issue => {
    const matchesSearch = 
      issue.id.includes(cwState.searchQuery) ||
      issue.title.toLowerCase().includes(cwState.searchQuery) ||
      issue.location.toLowerCase().includes(cwState.searchQuery);
    
    const matchesStatus = (statusFilter === 'all') || (issue.status === statusFilter);
    const matchesCategory = (categoryFilter === 'all') || (issue.category === categoryFilter);
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
}


function cwRenderIssuesTable() {
  const tbody = document.getElementById('issues-table-body');
  if (!tbody) return;

  const filtered = cwGetFilteredIssues();
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
    const hasPin = cwState.forcedHistoryPins && cwState.forcedHistoryPins.includes(issue.id);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="issue-id-cell" data-id="${issue.id}">#${issue.id}</td>
      <td>${issue.title} - ${issue.description}</td>
      <td>${issue.location}</td>
      <td>${issue.category}</td>
      <td>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="status-badge ${cwGetStatusBadgeClass(issue.status)}">${issue.status}</span>
          ${isOlderThan5Days ? `
            <button class="btn-toggle-table-pin" data-id="${issue.id}" style="background: #ffffff; border: 1.5px solid var(--border-gray); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; padding: 0; border-radius: 4px; box-shadow: 1px 1px 0px #000000; outline: none;" title="${hasPin ? 'Remove Pin from Map' : 'Show Pin on Map'}">
              <i class="ti ${hasPin ? 'ti-map-pin-off' : 'ti-map-pin'}" style="font-size: 10px; color: #000000; font-weight: bold;"></i>
            </button>
          ` : ''}
        </div>
      </td>
    `;

    
    const cell = tr.querySelector('.issue-id-cell');
    if (cell) {
      cell.addEventListener('click', () => {
        cwState.selectedIssueId = issue.id;
        switchTab('map');
      });
    }

    
    if (isOlderThan5Days) {
      const pinBtn = tr.querySelector('.btn-toggle-table-pin');
      if (pinBtn) {
        pinBtn.addEventListener('click', (e) => {
          e.stopPropagation(); 
          if (!cwState.forcedHistoryPins) {
            cwState.forcedHistoryPins = [];
          }
          const idx = cwState.forcedHistoryPins.indexOf(issue.id);
          if (idx === -1) {
            cwState.forcedHistoryPins.push(issue.id);
          } else {
            cwState.forcedHistoryPins.splice(idx, 1);
          }
          localStorage.setItem('community_forced_history_pins', JSON.stringify(cwState.forcedHistoryPins));
          
          cwRenderMapMarkers();
          cwRenderIssuesTable();
        });
      }
    }

    tbody.appendChild(tr);
  });
}


function cwRenderActiveIssuesSidebar() {
  const listContainer = document.getElementById('active-issues-list');
  if (!listContainer) return;

  listContainer.innerHTML = '';

  let activeCount = 0;

  cwState.issues.forEach(issue => {
    if (issue.status === 'RESOLVED' || issue.status === 'CLOSED') {
      return; 
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
        <span class="status-badge ${cwGetStatusBadgeClass(issue.status)}" style="font-size: 9px; min-width: 65px; padding: 1px 4px;">${issue.status}</span>
      </div>
    `;

    item.addEventListener('click', () => {
      cwState.selectedIssueId = issue.id;
      switchTab('map');
    });

    listContainer.appendChild(item);
  });

  if (activeCount === 0) {
    listContainer.innerHTML = '<div style="text-align:center; padding:20px; color:var(--text-muted); font-size:11px;">No active issues to display.</div>';
  }
}


function cwRenderProfileIssues() {
  const container = document.getElementById('profile-issues-list');
  if (!container) return;

  const userIssues = cwState.issues.filter(i => i.reporter === 'Resident User #402');
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
        <span class="status-badge ${cwGetStatusBadgeClass(issue.status)}" style="font-size:9px; min-width:70px; padding: 1px 4px;">${issue.status}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      cwState.selectedIssueId = issue.id;
      switchTab('map');
    });

    container.appendChild(card);
  });
}


function cwRenderActivityFeed() {
  const container = document.getElementById('activity-feed-list');
  if (!container) return;

  container.innerHTML = '';

  let filtered = cwActivityLogs;
  if (cwState.activityFilter !== 'all') {
    filtered = cwActivityLogs.filter(log => log.type === cwState.activityFilter);
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
          cwState.selectedIssueId = idMatch[1];
          switchTab('map');
        }
      });
    }

    container.appendChild(card);
  });
}


function cwRenderMap() {
  if (!cwDashboardMap || !cwMainMap) return;
  cwRenderMapMarkers();
  cwRenderTrackingDetails();
}


function cwShouldShowMapPin(issue) {
  if (issue.status !== 'RESOLVED' && issue.status !== 'CLOSED') {
    return true; 
  }
  
  if (cwState.forcedHistoryPins && cwState.forcedHistoryPins.includes(issue.id)) {
    return true;
  }
  if (!issue.resolvedDate) {
    return true; 
  }
  const resolvedTime = new Date(issue.resolvedDate).getTime();
  const currentTime = new Date().getTime();
  const diffDays = (currentTime - resolvedTime) / (1000 * 60 * 60 * 24);
  return diffDays <= 5;
}

function cwRenderMapMarkers() {
  
  cwDashboardMarkers.forEach(m => cwDashboardMap.removeLayer(m));
  cwMainMarkers.forEach(m => cwMainMap.removeLayer(m));
  
  cwDashboardMarkers = [];
  cwMainMarkers = [];

  cwState.issues.forEach(issue => {
    
    if (!cwShouldShowMapPin(issue)) {
      return;
    }

    
    let pinType = 'active-new';
    if (issue.status === 'IN PROGRESS') pinType = 'in-progress';
    else if (issue.status === 'RESOLVED' || issue.status === 'CLOSED') pinType = 'resolved';

    
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

    
    if (cwMainMap) {
      const marker = L.marker([issue.coordinates.lat, issue.coordinates.lng], { icon: customIcon })
        .addTo(cwMainMap);
      
      
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        cwState.selectedIssueId = issue.id;
        cwMainMap.setView([issue.coordinates.lat, issue.coordinates.lng], 16);
        cwRenderTrackingDetails();
      });

      cwMainMarkers.push(marker);
    }

    
    if (cwDashboardMap) {
      const marker = L.marker([issue.coordinates.lat, issue.coordinates.lng], { icon: miniIcon })
        .addTo(cwDashboardMap);
      
      cwDashboardMarkers.push(marker);
    }
  });

  
  if (cwDetectedCenter) {
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

    if (cwMainMap) {
      const userMarker = L.marker(cwDetectedCenter, { icon: userLocationIcon })
        .addTo(cwMainMap);
      cwMainMarkers.push(userMarker);
    }

    if (cwDashboardMap) {
      const userMiniMarker = L.marker(cwDetectedCenter, { icon: userLocationMiniIcon })
        .addTo(cwDashboardMap);
      cwDashboardMarkers.push(userMiniMarker);
    }
  }

  
  if (cwState.activeTab === 'map' && cwState.selectedIssueId) {
    const selected = cwState.issues.find(i => i.id === cwState.selectedIssueId);
    if (selected && cwMainMap) {
      cwMainMap.setView([selected.coordinates.lat, selected.coordinates.lng], 16);
    }
  }
}


function cwRenderTrackingDetails() {
  const panel = document.getElementById('tracking-detail-panel');
  if (!panel) return;

  const issue = cwState.issues.find(i => i.id === cwState.selectedIssueId);
  
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
        <button class="btn btn-secondary" id="btn-upvote-issue" style="flex:1;" ${cwState.upvotedIssues.includes(issue.id) ? 'disabled' : ''}>
          ${cwState.upvotedIssues.includes(issue.id) ? 'Upvoted' : 'Upvote'}
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
        const hasPin = cwState.forcedHistoryPins && cwState.forcedHistoryPins.includes(issue.id);
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

  
  const upvoteBtn = document.getElementById('btn-upvote-issue');
  if (upvoteBtn) {
    upvoteBtn.addEventListener('click', () => {
      
      issue.upvotes = (issue.upvotes || 0) + 1;
      
      
      const countEl = document.getElementById('issue-upvotes-count');
      if (countEl) countEl.textContent = issue.upvotes;
      
      
      upvoteBtn.disabled = true;
      upvoteBtn.textContent = 'Upvoted';

      
      if (!cwState.upvotedIssues.includes(issue.id)) {
        cwState.upvotedIssues.push(issue.id);
        localStorage.setItem('community_upvoted_issues', JSON.stringify(cwState.upvotedIssues));
      }

      
      const customIdx = cwCustomIssues.findIndex(i => i.id === issue.id);
      if (customIdx !== -1) {
        cwCustomIssues[customIdx].upvotes = issue.upvotes;
        localStorage.setItem('community_custom_issues', JSON.stringify(cwCustomIssues));
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
      cwActivityLogs.unshift(newLog);
      cwCustomLogs.unshift(newLog);
      localStorage.setItem('community_custom_activity_logs', JSON.stringify(cwCustomLogs));
      cwRenderApp();
    });
  }

  const resolveBtn = document.getElementById('btn-resolve-issue-mock');
  if (resolveBtn) {
    resolveBtn.addEventListener('click', () => {
      
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
      cwActivityLogs.unshift(newLog);

      
      const customIdx = cwCustomIssues.findIndex(i => i.id === issue.id);
      if (customIdx !== -1) {
        cwCustomIssues[customIdx].status = 'RESOLVED';
        cwCustomIssues[customIdx].resolvedDate = issue.resolvedDate;
        cwCustomIssues[customIdx].timeline = issue.timeline;
        localStorage.setItem('community_custom_issues', JSON.stringify(cwCustomIssues));
      }

      cwCustomLogs.unshift(newLog);
      localStorage.setItem('community_custom_activity_logs', JSON.stringify(cwCustomLogs));

      cwRenderApp();
    });
  }

  const toggleHistoryPinBtn = document.getElementById('btn-toggle-history-pin');
  if (toggleHistoryPinBtn) {
    toggleHistoryPinBtn.addEventListener('click', () => {
      if (!cwState.forcedHistoryPins) {
        cwState.forcedHistoryPins = [];
      }
      const idx = cwState.forcedHistoryPins.indexOf(issue.id);
      if (idx === -1) {
        cwState.forcedHistoryPins.push(issue.id);
      } else {
        cwState.forcedHistoryPins.splice(idx, 1);
      }
      localStorage.setItem('community_forced_history_pins', JSON.stringify(cwState.forcedHistoryPins));
      cwRenderMapMarkers();
      cwRenderTrackingDetails();
    });
  }
}
