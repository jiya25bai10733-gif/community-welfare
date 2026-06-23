const reportStore = {
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

let activityRecords = [
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

let dashboardMap = null;
let interactiveMap = null;
let dashboardMarkers = [];
let interactiveMarkers = [];
let draftMarker = null;

let myLoc = [28.4089, 77.3178]; 

let savedReports = [];
let auditTrail = [];
let attachedScreenshotBase64 = null;
let locationFieldModified = false;

document.addEventListener('DOMContentLoaded', () => {
  migrateWelfareStorageKeys();
  loadStoredIncidents();
  monitorConnectivity();
  
  const latField = document.getElementById('issue-lat');
  const lngField = document.getElementById('issue-lng');
  if (latField) latField.value = myLoc[0].toFixed(5);
  if (lngField) lngField.value = myLoc[1].toFixed(5);

  bindAppTabEvents();
  handleIncidentReportSubmit();
  setupIncidentSearchFilters();
  bindMapControlButtons();
  initializeIncidentMaps();
  initializeLocationTracking();
  initializeIncidentAddressTypeahead();
  reloadReportsData();
});

function isIssueVisible(issue) {
  const isCustomUserReport = savedReports.some(r => r.id === issue.id);
  if (isCustomUserReport) {
    return true;
  }
  if (issue.coordinates && issue.coordinates.lat && issue.coordinates.lng && myLoc) {
    const latDiff = Math.abs(issue.coordinates.lat - myLoc[0]);
    const lngDiff = Math.abs(issue.coordinates.lng - myLoc[1]);
    return latDiff < 0.2 && lngDiff < 0.2;
  }
  return true;
}

function isActivityLogVisible(log) {
  if (['log-1', 'log-2', 'log-3', 'log-4', 'log-5'].includes(log.id)) {
    return true;
  }
  const match = log.desc.match(/Issue #(\d+)/);
  if (match && match[1]) {
    const issueId = match[1];
    const issue = reportStore.issues.find(i => i.id === issueId);
    if (issue) {
      return isIssueVisible(issue);
    }
  }
  return true;
}

function loadStoredIncidents() {
  try {
    savedReports = JSON.parse(localStorage.getItem("community_custom_issues")) || [];
    auditTrail = JSON.parse(localStorage.getItem('community_custom_activity_logs')) || [];
    reportStore.upvotedIssues = JSON.parse(localStorage.getItem("community_upvoted_issues")) || [];
    reportStore.forcedHistoryPins = JSON.parse(localStorage.getItem('community_forced_history_pins')) || [];
    
    var default_upvotes = JSON.parse(localStorage.getItem('community_default_issues_upvotes')) || {};
    for (const issue of reportStore.issues) {
      let existing_val = default_upvotes[issue.id];
      if (existing_val !== undefined) {
        let current_upvotes = issue.upvotes || 0;
        issue.upvotes = current_upvotes + existing_val;
      }
    }
  } catch (err) {
    console.error("Unable to load stored complaints", err);
  }

  reportStore.issues = [...savedReports, ...reportStore.issues];
  activityRecords = [...auditTrail, ...activityRecords];
}

function monitorConnectivity() {
  var status_el = document.getElementById("connection-status");
  if (!status_el) return;

  function updateStatus() {
    var is_online = navigator.onLine;
    if (is_online === true) {
      status_el.textContent = 'ONLINE';
      status_el.style.backgroundColor = '#1f2937';
      status_el.style.color = '#ffffff';
      status_el.style.borderColor = "var(--border-gray)";
      status_el.style.borderStyle = "solid";
    } else {
      status_el.textContent = 'OFFLINE';
      status_el.style.backgroundColor = '#ffffff';
      status_el.style.color = '#000000';
      status_el.style.borderColor = '#ff0000';
      status_el.style.borderStyle = 'dashed';
    }
  }

  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  updateStatus(); 
}

let searchTimer = null;

function initializeIncidentAddressTypeahead() {
  const inputEl = document.getElementById('issue-location');
  const dropdownEl = document.getElementById('location-autocomplete-dropdown');
  if (!inputEl || !dropdownEl) return;

  inputEl.addEventListener('input', () => {
    locationFieldModified = true;
    const val = inputEl.value.trim();
    clearTimeout(searchTimer);
    
    if (val.length < 3) {
      dropdownEl.style.display = 'none';
      dropdownEl.innerHTML = '';
      return;
    }

    searchTimer = setTimeout(async () => {
      let url = `https://photon.komoot.io/api/?q=${encodeURIComponent(val)}&limit=5`;
      if (myLoc && myLoc.length === 2) {
        url += `&lat=${myLoc[0]}&lon=${myLoc[1]}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network error during autocomplete");
        const data = await response.json();
        const features = data.features || [];
        renderAddressSuggestions(features, inputEl, dropdownEl);

        if (features.length > 0) {
          const firstFeature = features[0];
          const geom = firstFeature.geometry;
          if (geom && geom.coordinates && geom.coordinates.length === 2) {
            const lng = geom.coordinates[0];
            const lat = geom.coordinates[1];
            updateDraftIncidentPin(lat, lng, false, true);
          }
        }
      } catch (error) {
        console.error("Autocomplete search failed:", error);
      }
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
    setTimeout(async () => {
      const val = inputEl.value.trim();
      if (val.length < 3) return;

      let url = `https://photon.komoot.io/api/?q=${encodeURIComponent(val)}&limit=1`;
      if (myLoc && myLoc.length === 2) {
        url += `&lat=${myLoc[0]}&lon=${myLoc[1]}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Geocoding on blur failed");
        const data = await response.json();
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
            
            updateDraftIncidentPin(lat, lng);
          }
        }
      } catch (error) {
        console.error("Geocoding on blur error:", error);
      }
    }, 250);
  });

  inputEl.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const val = inputEl.value.trim();
      if (val.length >= 3) {
        e.preventDefault(); 
        
        let url = `https://photon.komoot.io/api/?q=${encodeURIComponent(val)}&limit=1`;
        if (myLoc && myLoc.length === 2) {
          url += `&lat=${myLoc[0]}&lon=${myLoc[1]}`;
        }

        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error("Geocoding on Enter failed");
          const data = await res.json();
          if (data.features && data.features.length > 0) {
            const geom = data.features[0].geometry;
            if (geom && geom.coordinates && geom.coordinates.length === 2) {
              const lng = geom.coordinates[0];
              const lat = geom.coordinates[1];
              
              const latField = document.getElementById('issue-lat');
              const lngField = document.getElementById('issue-lng');
              if (latField) latField.value = lat.toFixed(5);
              if (lngField) lngField.value = lng.toFixed(5);
              
              updateDraftIncidentPin(lat, lng);
              dropdownEl.style.display = 'none';
            }
          }
        } catch (err) {
          console.error("Geocoding on Enter error:", err);
        }
      }
    }
  });
}

function renderAddressSuggestions(features, inputEl, dropdownEl) {
  dropdownEl.innerHTML = '';
  
  if (features.length === 0) {
    dropdownEl.style.display = 'none';
    return;
  }

  for (const feature of features) {
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
      locationFieldModified = false;
      inputEl.value = formattedAddress;
      dropdownEl.style.display = 'none';
      
      if (geom && geom.coordinates && geom.coordinates.length === 2) {
        const lng = geom.coordinates[0];
        const lat = geom.coordinates[1];
        
        const latField = document.getElementById('issue-lat');
        const lngField = document.getElementById('issue-lng');
        if (latField) latField.value = lat.toFixed(5);
        if (lngField) lngField.value = lng.toFixed(5);
        
        updateDraftIncidentPin(lat, lng);
      }
    });
    
    dropdownEl.appendChild(item);
  }

  dropdownEl.style.display = 'block';
}

async function initializeLocationTracking() {
  console.log("Tracking location...");
  
  const subtextEl = document.getElementById('dashboard-map-subtext');
  if (subtextEl) {
    subtextEl.textContent = "Detecting your location to show nearby issues...";
  }

  const offsets = {
    '1248': { dLat: 0.0061, dLng: -0.0038 },
    '1245': { dLat: 0.0021, dLng: 0.0012 },
    '1246': { dLat: 0.0141, dLng: -0.0158 },
    '1244': { dLat: -0.0069, dLng: -0.0018 },
    '1254': { dLat: -0.0109, dLng: 0.0032 }
  };

  const handleSuccess = async (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log(`Location detected: ${lat}, ${lng}`);
    myLoc = [lat, lng];
    
    const latField = document.getElementById('issue-lat');
    const lngField = document.getElementById('issue-lng');
    if (latField) latField.value = lat.toFixed(5);
    if (lngField) lngField.value = lng.toFixed(5);
    
    for (const issue of reportStore.issues) {
      const offset = offsets[issue.id];
      if (offset) {
        issue.coordinates = {
          lat: lat + offset.dLat,
          lng: lng + offset.dLng
        };
      }
    }

    if (dashboardMap) dashboardMap.setView([lat, lng], 13);
    if (interactiveMap) interactiveMap.setView([lat, lng], reportStore.zoomLevel);

    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
    try {
      const response = await fetch(url, { headers: { 'Accept-Language': 'en' } });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      const address = data.address || {};
      const city = address.city || address.town || address.village || address.municipality || address.county || 'Local Area';
      const suburb = address.suburb || address.neighbourhood || address.quarter || address.city_district || address.road || 'Local Suburb';
      const road = address.road || address.pedestrian || suburb || 'Main Road';
      console.log(`Reverse geocoded location: ${suburb}, ${city}`);
      updateLocalityLabels(city, suburb, road);
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      updateLocalityLabels("Local Area", `Near ${lat.toFixed(3)}, ${lng.toFixed(3)}`, "Main Road");
    }
  };

  const handleFailure = () => {
    myLoc = [28.4089, 77.3178];
    const latField = document.getElementById('issue-lat');
    const lngField = document.getElementById('issue-lng');
    if (latField) latField.value = myLoc[0].toFixed(5);
    if (lngField) lngField.value = myLoc[1].toFixed(5);

    for (const issue of reportStore.issues) {
      const offset = offsets[issue.id];
      if (offset) {
        issue.coordinates = {
          lat: myLoc[0] + offset.dLat,
          lng: myLoc[1] + offset.dLng
        };
      }
    }

    if (dashboardMap) dashboardMap.setView(myLoc, 13);
    if (interactiveMap) interactiveMap.setView(myLoc, reportStore.zoomLevel);

    updateLocalityLabels("Faridabad", "Sector 15", "Mathura Road");
  };

  if (!navigator.geolocation) {
    console.warn("Geolocation is not supported by this browser. Falling back to Faridabad.");
    handleFailure();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    handleSuccess,
    (error) => {
      console.warn(`Geolocation failed/denied (Code ${error.code}): ${error.message}. Falling back to Faridabad.`);
      handleFailure();
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
  );
}

function updateLocalityLabels(city, suburb, road) {
  const subtextEl = document.getElementById('dashboard-map-subtext');
  if (subtextEl) {
    subtextEl.textContent = `Interactive City Map: View Reported Issues in ${city}`;
  }
  
  const profileLocEl = document.getElementById('profile-location-text');
  if (profileLocEl) {
    profileLocEl.textContent = `${city} Resident • ${suburb}`;
  }
  
  for (const issue of reportStore.issues) {
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
  }

  for (const log of activityRecords) {
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
  }
  
  reloadReportsData();
}

function initializeIncidentMaps() {
  const googleRoadTiles = 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
  const tileOptions = {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Map data &copy; <a href="https://www.google.com/maps">Google Maps</a>'
  };

  const dashboardMapEl = document.getElementById('dashboard-map');
  if (dashboardMapEl) {
    dashboardMap = L.map('dashboard-map', {
      zoomControl: false,
      dragging: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false
    }).setView(myLoc, 13);

    L.tileLayer(googleRoadTiles, tileOptions).addTo(dashboardMap);
  }

  const interactiveMapEl = document.getElementById('interactive-map');
  if (interactiveMapEl) {
    interactiveMap = L.map('interactive-map', {
      zoomControl: false,
      doubleClickZoom: false
    }).setView(myLoc, reportStore.zoomLevel);

    L.tileLayer(googleRoadTiles, tileOptions).addTo(interactiveMap);

    interactiveMap.on('dblclick', async (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      updateDraftIncidentPin(lat, lng, true, false);
      locationFieldModified = false;
      
      const locField = document.getElementById('issue-location');
      if (locField) {
        locField.value = "Fetching address...";
      }

      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
      try {
        const response = await fetch(url, { headers: { 'Accept-Language': 'en' } });
        if (response.ok) {
          const data = await response.json();
          const parts = [];
          const address = data.address || {};
          if (address.road) parts.push(address.road);
          if (address.suburb || address.neighbourhood) parts.push(address.suburb || address.neighbourhood);
          if (address.city || address.town || address.village) parts.push(address.city || address.town || address.village);
          const formattedAddress = parts.join(', ') || data.display_name || 'Selected Map Location';
          if (locField) locField.value = formattedAddress;
        } else {
          if (locField) locField.value = `Location near ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        }
      } catch (err) {
        console.error("Reverse geocoding failed on map double click:", err);
        if (locField) locField.value = `Location near ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      }
    });
  }
}

function updateDraftIncidentPin(lat, lng, showToast = false, panMap = true) {
  const latField = document.getElementById('issue-lat');
  const lngField = document.getElementById('issue-lng');
  if (latField) latField.value = lat.toFixed(5);
  if (lngField) lngField.value = lng.toFixed(5);

  if (interactiveMap) {
    if (draftMarker) {
      draftMarker.setLatLng([lat, lng]);
    } else {
      const placementIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div class="marker-pin active-new" style="background-color:#5A4FCF; border-color:#000000; animation: bounce 0.6s infinite alternate;"></div><div class="marker-label" style="background-color:#5A4FCF; color:#ffffff; border-color:#000000;">New Issue Pin</div>`,
        iconSize: [28, 40],
        iconAnchor: [6, 6]
      });
      draftMarker = L.marker([lat, lng], { icon: placementIcon }).addTo(interactiveMap);
    }

    if (panMap) {
      interactiveMap.setView([lat, lng], 15);
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

function bindAppTabEvents() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  for (const link of navLinks) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      switchAppTab(target);
    });
  }

  const logoTrigger = document.getElementById('logo-trigger');
  if (logoTrigger) {
    logoTrigger.addEventListener('click', () => {
      switchAppTab('dashboard');
    });
  }

  const profileBtn = document.getElementById('profile-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      switchAppTab('profile');
    });
  }

  const minimap = document.getElementById('dashboard-map');
  if (minimap) {
    minimap.addEventListener('click', () => {
      switchAppTab('map');
    });
  }

  const reportRedirect = document.getElementById('btn-report-redirect');
  if (reportRedirect) {
    reportRedirect.addEventListener('click', (e) => {
      e.stopPropagation();
      switchAppTab('report');
    });
  }
}

function switchAppTab(targetTabId) {
  reportStore.activeTab = targetTabId;
  
  const navLinks = document.querySelectorAll('.nav-link');
  for (const link of navLinks) {
    if (link.getAttribute('data-target') === targetTabId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  }

  const views = document.querySelectorAll('.page-view');
  for (const view of views) {
    if (view.id === `view-${targetTabId}`) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  }

  if (targetTabId === 'map' && interactiveMap) {
    setTimeout(() => {
      interactiveMap.invalidateSize();
      updateIssueMarkers();
      renderIncidentDetailsCard();
    }, 100);
  } else if (targetTabId === 'dashboard' && dashboardMap) {
    setTimeout(() => {
      dashboardMap.invalidateSize();
      updateIssueMarkers();
      renderIncidentDetailsCard();
    }, 100);
  }
}

function handleIncidentReportSubmit() {
  const form = document.getElementById('issue-report-form');
  const cancelBtn = document.getElementById('btn-cancel-report');
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-upload');
  const filePreview = document.getElementById('file-upload-preview');

  if (dropZone) {
    const dragEvents = ['dragenter', 'dragover'];
    for (const name of dragEvents) {
      dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
      });
    }

    const leaveEvents = ['dragleave', 'drop'];
    for (const name of leaveEvents) {
      dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
      });
    }

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
          attachedScreenshotBase64 = ev.target.result;
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
          attachedScreenshotBase64 = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      locationFieldModified = false;
      if (form) form.reset();
      if (filePreview) filePreview.style.display = 'none';
      attachedScreenshotBase64 = null;
      if (draftMarker && interactiveMap) {
        interactiveMap.removeLayer(draftMarker);
        draftMarker = null;
      }
      
      const latField = document.getElementById('issue-lat');
      const lngField = document.getElementById('issue-lng');
      if (latField) latField.value = myLoc[0].toFixed(5);
      if (lngField) lngField.value = myLoc[1].toFixed(5);
      
      switchAppTab('dashboard');
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const category = document.getElementById('issue-category').value;
      const title = document.getElementById('issue-summary').value;
      const location = document.getElementById('issue-location').value;
      const description = document.getElementById('issue-description').value || 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
      
      let lat = parseFloat(document.getElementById('issue-lat').value);
      let lng = parseFloat(document.getElementById('issue-lng').value);

      if (locationFieldModified && location && location.trim().length >= 3) {
        let url = `https://photon.komoot.io/api/?q=${encodeURIComponent(location.trim())}&limit=1`;
        if (myLoc && myLoc.length === 2) {
          url += `&lat=${myLoc[0]}&lon=${myLoc[1]}`;
        }
        try {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            if (data.features && data.features.length > 0) {
              const geom = data.features[0].geometry;
              if (geom && geom.coordinates && geom.coordinates.length === 2) {
                lng = geom.coordinates[0];
                lat = geom.coordinates[1];
                
                const latField = document.getElementById('issue-lat');
                const lngField = document.getElementById('issue-lng');
                if (latField) latField.value = lat.toFixed(5);
                if (lngField) lngField.value = lng.toFixed(5);
              }
            }
          }
        } catch (err) {
          console.error("Geocoding during submit failed, falling back to form coords:", err);
        }
      }

      locationFieldModified = false;
      
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
        imageBase64: attachedScreenshotBase64,
        timeline: [
          { title: 'Report Logged', time: 'Just now', complete: true }
        ]
      };

      savedReports.unshift(newIssue);
      try {
        localStorage.setItem('community_custom_issues', JSON.stringify(savedReports));
      } catch (err) {
        console.error("Failed to save report locally", err);
      }

      const newLog = {
        id: `log-${Date.now()}`,
        location: location,
        time: 'JUST NOW',
        desc: `Resident User #402 filed a <span class="font-bold">NEW REPORT: Issue #${newId} (${title})</span> near the ${location} area.`,
        tag: 'NEW',
        type: 'new'
      };
      auditTrail.unshift(newLog);
      try {
        localStorage.setItem('community_custom_activity_logs', JSON.stringify(auditTrail));
      } catch (err) {
        console.error("Failed to save report locally", err);
      }

      reportStore.issues.unshift(newIssue);
      reportStore.selectedIssueId = newId;
      activityRecords.unshift(newLog);

      form.reset();
      if (filePreview) filePreview.style.display = 'none';
      attachedScreenshotBase64 = null;
      if (draftMarker && interactiveMap) {
        interactiveMap.removeLayer(draftMarker);
        draftMarker = null;
      }
      
      const latField = document.getElementById('issue-lat');
      const lngField = document.getElementById('issue-lng');
      if (latField) latField.value = myLoc[0].toFixed(5);
      if (lngField) lngField.value = myLoc[1].toFixed(5);

      reloadReportsData();
      switchAppTab('dashboard');
    });
  }
}

function bindMapControlButtons() {
  const zoomInBtn = document.getElementById('zoom-in');
  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      if (interactiveMap) interactiveMap.zoomIn();
    });
  }

  const zoomOutBtn = document.getElementById('zoom-out');
  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      if (interactiveMap) interactiveMap.zoomOut();
    });
  }

  const zoomResetBtn = document.getElementById('zoom-reset');
  if (zoomResetBtn) {
    zoomResetBtn.addEventListener('click', () => {
      if (interactiveMap) interactiveMap.setView(myLoc, 14);
    });
  }

  const locateMeBtn = document.getElementById('btn-locate-me');
  if (locateMeBtn) {
    locateMeBtn.addEventListener('click', () => {
      if (interactiveMap && myLoc) {
        interactiveMap.setView(myLoc, 15);
        locateMeBtn.textContent = "[ Centered! ]";
        setTimeout(() => {
          locateMeBtn.textContent = "[ Locate Me ]";
        }, 1500);
      }
    });
  }
}

function setupIncidentSearchFilters() {
  const searchInput = document.getElementById('global-search');
  const searchDropdown = document.getElementById('search-suggestions-dropdown');
  if (searchInput && searchDropdown) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      reportStore.searchQuery = query;
      renderReportsGrid();

      if (!query) {
        searchDropdown.style.display = 'none';
        searchDropdown.innerHTML = '';
        return;
      }

      const matches = reportStore.issues.filter(issue => 
        isIssueVisible(issue) && (
          issue.title.toLowerCase().indexOf(query) !== -1 || 
          issue.description.toLowerCase().indexOf(query) !== -1 || 
          issue.location.toLowerCase().indexOf(query) !== -1 || 
          issue.id.indexOf(query) !== -1
        )
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
      for (const issue of matches) {
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
          reportStore.searchQuery = '';
          searchDropdown.style.display = 'none';
          reportStore.selectedIssueId = issue.id;
          switchAppTab('map');
          renderReportsGrid();
        });

        searchDropdown.appendChild(item);
      }
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
    filterStatus.addEventListener('change', renderReportsGrid);
  }

  const filterCategory = document.getElementById('table-filter-category');
  if (filterCategory) {
    filterCategory.addEventListener('change', renderReportsGrid);
  }

  const exportBtn = document.getElementById('btn-export-issues');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      function escapeCSV(str) {
        if (str === undefined || str === null) return '';
        let val = String(str);
        if (val.indexOf('"') !== -1 || val.indexOf(',') !== -1 || val.indexOf('\n') !== -1 || val.indexOf('\r') !== -1) {
          val = '"' + val.replace(/"/g, '""') + '"';
        }
        return val;
      }

      const headers = [
        'ID', 'Category', 'Title', 'Location', 'Latitude', 'Longitude', 
        'Status', 'Upvotes', 'Reported Date', 'Reported Time', 'Reporter', 'Description'
      ];

      const rows = reportStore.issues.map(issue => {
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

      try {
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
      } catch (err) {
        console.error("CSV export failed", err);
      }
    });
  }

  const activityTabs = document.querySelectorAll('#view-activity .btn-tab-filter');
  for (const tab of activityTabs) {
    tab.addEventListener('click', () => {
      for (const t of activityTabs) {
        t.classList.remove('active');
      }
      tab.classList.add('active');
      reportStore.activityFilter = tab.getAttribute('data-filter');
      renderIncidentActivityTimeline();
    });
  }
}

function reloadReportsData() {
  updateDashboardStats();
  renderReportsGrid();
  renderActiveIncidentsSidebar();
  renderCitizenReportHistory();
  renderIncidentActivityTimeline();
  updateIssueMarkers();
  renderIncidentDetailsCard();
}

function updateDashboardStats() {
  const visibleIssues = reportStore.issues.filter(isIssueVisible);

  const userReported = visibleIssues.filter(i => i.reporter === 'Resident User #402').length;
  const userResolved = visibleIssues.filter(i => i.reporter === 'Resident User #402' && (i.status === 'RESOLVED' || i.status === 'CLOSED')).length;

  const reportedEl = document.getElementById('profile-reported-count');
  if (reportedEl) reportedEl.textContent = userReported;

  const resolvedEl = document.getElementById('profile-resolved-count');
  if (resolvedEl) resolvedEl.textContent = userResolved;

  const totalReports = visibleIssues.length;
  const resolvedReports = visibleIssues.filter(i => i.status === 'RESOLVED' || i.status === 'CLOSED').length;
  const openReports = visibleIssues.filter(i => i.status === 'OPEN').length;
  const pendingReports = visibleIssues.filter(i => i.status === 'PENDING' || i.status === 'IN PROGRESS').length;

  const totalEl = document.getElementById('stats-total-count');
  if (totalEl) totalEl.textContent = totalReports;

  const resolvedSysEl = document.getElementById('stats-resolved-count');
  if (resolvedSysEl) resolvedSysEl.textContent = resolvedReports;

  const openEl = document.getElementById('stats-open-count');
  if (openEl) openEl.textContent = openReports;

  const pendingEl = document.getElementById('stats-pending-count');
  if (pendingEl) pendingEl.textContent = pendingReports;
}

function getIncidentBadgeClass(status) {
  var stat = status.toUpperCase();
  if (stat === 'OPEN') {
     return "badge-open";
  } else if (stat === 'PENDING') {
     return 'badge-pending';
  } else if (stat === 'CLOSED') {
     return "badge-closed";
  } else if (stat === 'RESOLVED') {
     return "badge-resolved";
  }
  return "badge-open";
}

function applyReportFilters() {
  const statusFilterEl = document.getElementById('table-filter-status');
  const categoryFilterEl = document.getElementById('table-filter-category');

  const statusFilter = statusFilterEl ? statusFilterEl.value : 'all';
  const categoryFilter = categoryFilterEl ? categoryFilterEl.value : 'all';

  return reportStore.issues.filter(issue => {
    if (!isIssueVisible(issue)) return false;
    // Older localStorage entries may not contain description, location or ID
    const query = reportStore.searchQuery || '';
    const id = issue.id || '';
    const title = issue.title || '';
    const loc = issue.location || '';
    
    const matchesSearch = 
      id.indexOf(query) !== -1 ||
      title.toLowerCase().indexOf(query) !== -1 ||
      loc.toLowerCase().indexOf(query) !== -1;
    
    const matchesStatus = (statusFilter === 'all') || (issue.status === statusFilter);
    const matchesCategory = (categoryFilter === 'all') || (issue.category === categoryFilter);
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
}

function renderReportsGrid() {
  const tbody = document.getElementById('issues-table-body');
  if (!tbody) return;

  const filtered = applyReportFilters();
  tbody.innerHTML = '';
  
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px;">No reports match the filters.</td></tr>`;
    return;
  }

  for (const issue of filtered) {
    // support older saved reports that might not have resolvedDate
    const isResolvedOrClosed = issue.status === 'RESOLVED' || issue.status === 'CLOSED';
    let isOlderThan5Days = false;
    if (isResolvedOrClosed && issue.resolvedDate) {
      const resolvedTime = new Date(issue.resolvedDate).getTime();
      const currentTime = new Date().getTime();
      const diffDays = (currentTime - resolvedTime) / (1000 * 60 * 60 * 24);
      isOlderThan5Days = diffDays > 5;
    }
    const hasPin = reportStore.forcedHistoryPins && reportStore.forcedHistoryPins.indexOf(issue.id) !== -1;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="issue-id-cell" data-id="${issue.id}">#${issue.id}</td>
      <td>${issue.title} - ${issue.description}</td>
      <td>${issue.location}</td>
      <td>${issue.category}</td>
      <td>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="status-badge ${getIncidentBadgeClass(issue.status)}">${issue.status}</span>
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
        reportStore.selectedIssueId = issue.id;
        switchAppTab('map');
      });
    }

    if (isOlderThan5Days) {
      const pinBtn = tr.querySelector('.btn-toggle-table-pin');
      if (pinBtn) {
        pinBtn.addEventListener('click', (e) => {
          e.stopPropagation(); 
          if (!reportStore.forcedHistoryPins) {
            reportStore.forcedHistoryPins = [];
          }
          const idx = reportStore.forcedHistoryPins.indexOf(issue.id);
          if (idx === -1) {
            reportStore.forcedHistoryPins.push(issue.id);
          } else {
            reportStore.forcedHistoryPins.splice(idx, 1);
          }
          localStorage.setItem('community_forced_history_pins', JSON.stringify(reportStore.forcedHistoryPins));
          
          updateIssueMarkers();
          renderReportsGrid();
        });
      }
    }

    tbody.appendChild(tr);
  }
}

function renderActiveIncidentsSidebar() {
  const listContainer = document.getElementById('active-issues-list');
  if (!listContainer) return;

  listContainer.innerHTML = '';
  let activeCount = 0;

  for (const issue of reportStore.issues) {
    if (!isIssueVisible(issue)) {
      continue;
    }
    if (issue.status === 'RESOLVED' || issue.status === 'CLOSED') {
      continue; 
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
        <span class="status-badge ${getIncidentBadgeClass(issue.status)}" style="font-size: 9px; min-width: 65px; padding: 1px 4px;">${issue.status}</span>
      </div>
    `;

    item.addEventListener('click', () => {
      reportStore.selectedIssueId = issue.id;
      switchAppTab('map');
    });

    listContainer.appendChild(item);
  }

  if (activeCount === 0) {
    listContainer.innerHTML = '<div style="text-align:center; padding:20px; color:var(--text-muted); font-size:11px;">No active issues to display.</div>';
  }
}

function renderCitizenReportHistory() {
  const container = document.getElementById('profile-issues-list');
  if (!container) return;

  const userIssues = reportStore.issues.filter(i => i.reporter === 'Resident User #402' && isIssueVisible(i));
  container.innerHTML = '';

  if (userIssues.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted);">You have not filed any reports yet.</div>`;
    return;
  }

  for (const issue of userIssues) {
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
        <span class="status-badge ${getIncidentBadgeClass(issue.status)}" style="font-size:9px; min-width:70px; padding: 1px 4px;">${issue.status}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      reportStore.selectedIssueId = issue.id;
      switchAppTab('map');
    });

    container.appendChild(card);
  }
}

function renderIncidentActivityTimeline() {
  const container = document.getElementById('activity-feed-list');
  if (!container) return;

  container.innerHTML = '';

  let filtered = activityRecords.filter(isActivityLogVisible);
  if (reportStore.activityFilter !== 'all') {
    filtered = filtered.filter(log => log.type === reportStore.activityFilter);
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div class="card" style="text-align:center; padding:30px; color:var(--text-muted);">No activity logs in this category.</div>`;
    return;
  }

  for (const log of filtered) {
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
          reportStore.selectedIssueId = idMatch[1];
          switchAppTab('map');
        }
      });
    }

    container.appendChild(card);
  }
}

function updateIssueMarkers() {
  for (const m of dashboardMarkers) {
    dashboardMap.removeLayer(m);
  }
  for (const m of interactiveMarkers) {
    interactiveMap.removeLayer(m);
  }
  
  dashboardMarkers = [];
  interactiveMarkers = [];

  for (const issue of reportStore.issues) {
    if (!isIssueVisible(issue)) {
      continue;
    }
    // Older localStorage entries may not contain coordinates
    if (!issue.coordinates || !issue.coordinates.lat || !issue.coordinates.lng) {
      continue;
    }

    let isVisible = true;
    const is_resolved = (issue.status === 'RESOLVED' || issue.status === 'CLOSED');
    if (is_resolved) {
      // support older saved reports
      const hasForcedPin = reportStore.forcedHistoryPins && reportStore.forcedHistoryPins.indexOf(issue.id) > -1;
      if (!hasForcedPin) {
        if (!issue.resolvedDate) {
          isVisible = true;
        } else {
          const resolved_ms = new Date(issue.resolvedDate).getTime();
          const current_ms = new Date().getTime();
          const elapsed_days = (current_ms - resolved_ms) / (1000 * 60 * 60 * 24);
          isVisible = elapsed_days <= 5;
        }
      }
    }

    if (!isVisible) continue;

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

    if (interactiveMap) {
      const marker = L.marker([issue.coordinates.lat, issue.coordinates.lng], { icon: customIcon })
        .addTo(interactiveMap);
      
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        reportStore.selectedIssueId = issue.id;
        interactiveMap.setView([issue.coordinates.lat, issue.coordinates.lng], 16);
        renderIncidentDetailsCard();
      });

      interactiveMarkers.push(marker);
    }

    if (dashboardMap) {
      const marker = L.marker([issue.coordinates.lat, issue.coordinates.lng], { icon: miniIcon })
        .addTo(dashboardMap);
      
      dashboardMarkers.push(marker);
    }
  }

  if (myLoc) {
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

    if (interactiveMap) {
      const userMarker = L.marker(myLoc, { icon: userLocationIcon })
        .addTo(interactiveMap);
      interactiveMarkers.push(userMarker);
    }

    if (dashboardMap) {
      const userMiniMarker = L.marker(myLoc, { icon: userLocationMiniIcon })
        .addTo(dashboardMap);
      dashboardMarkers.push(userMiniMarker);
    }
  }

  if (reportStore.activeTab === 'map' && reportStore.selectedIssueId) {
    const selected = reportStore.issues.find(i => i.id === reportStore.selectedIssueId && isIssueVisible(i));
    if (selected && interactiveMap) {
      interactiveMap.setView([selected.coordinates.lat, selected.coordinates.lng], 16);
    }
  }
}

function renderIncidentDetailsCard() {
  const panel = document.getElementById('tracking-detail-panel');
  if (!panel) return;

  const issue = reportStore.issues.find(i => i.id === reportStore.selectedIssueId && isIssueVisible(i));
  
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
  for (let index = 0; index < issue.timeline.length; index++) {
    const step = issue.timeline[index];
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
  }

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
        <button class="btn btn-secondary" id="btn-upvote-issue" style="flex:1;" ${reportStore.upvotedIssues.includes(issue.id) ? 'disabled' : ''}>
          ${reportStore.upvotedIssues.includes(issue.id) ? 'Upvoted' : 'Upvote'}
        </button>
        <button class="btn btn-primary" id="btn-resolve-issue-mock" style="flex:1;">
          Resolve
        </button>
      </div>
    ` : (() => {
      // support older saved reports
      const isResolvedOrClosed = issue.status === 'RESOLVED' || issue.status === 'CLOSED';
      let isOlderThan5Days = false;
      if (isResolvedOrClosed && issue.resolvedDate) {
        const resolvedTime = new Date(issue.resolvedDate).getTime();
        const currentTime = new Date().getTime();
        const diffDays = (currentTime - resolvedTime) / (1000 * 60 * 60 * 24);
        isOlderThan5Days = diffDays > 5;
      }
      if (isOlderThan5Days) {
        const hasPin = reportStore.forcedHistoryPins && reportStore.forcedHistoryPins.includes(issue.id);
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

      if (!reportStore.upvotedIssues.includes(issue.id)) {
        reportStore.upvotedIssues.push(issue.id);
        localStorage.setItem('community_upvoted_issues', JSON.stringify(reportStore.upvotedIssues));
      }

      const customIdx = savedReports.findIndex(i => i.id === issue.id);
      if (customIdx !== -1) {
        savedReports[customIdx].upvotes = issue.upvotes;
        try {
          localStorage.setItem('community_custom_issues', JSON.stringify(savedReports));
        } catch (err) {
          console.error("Failed to save report locally", err);
        }
      } else {
        const defaultIssuesUpvotes = JSON.parse(localStorage.getItem('community_default_issues_upvotes')) || {};
        defaultIssuesUpvotes[issue.id] = (defaultIssuesUpvotes[issue.id] || 0) + 1;
        try {
          localStorage.setItem('community_default_issues_upvotes', JSON.stringify(defaultIssuesUpvotes));
        } catch (err) {
          console.error("Failed to save report locally", err);
        }
      }

      const newLog = {
        id: `log-${Date.now()}`,
        location: issue.location,
        time: 'JUST NOW',
        desc: `Community upvote recorded for <span class="font-bold">Issue #${issue.id} (${issue.title})</span>. Total upvotes: <span class="font-bold">${issue.upvotes}</span>.`,
        tag: 'UPDATE',
        type: 'update'
      };
      activityRecords.unshift(newLog);
      auditTrail.unshift(newLog);
      try {
        localStorage.setItem('community_custom_activity_logs', JSON.stringify(auditTrail));
      } catch (err) {
        console.error("Failed to save report locally", err);
      }
      reloadReportsData();
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
      activityRecords.unshift(newLog);

      const customIdx = savedReports.findIndex(i => i.id === issue.id);
      if (customIdx !== -1) {
        savedReports[customIdx].status = 'RESOLVED';
        savedReports[customIdx].resolvedDate = issue.resolvedDate;
        savedReports[customIdx].timeline = issue.timeline;
        try {
          localStorage.setItem('community_custom_issues', JSON.stringify(savedReports));
        } catch (err) {
          console.error("Failed to save report locally", err);
        }
      }

      auditTrail.unshift(newLog);
      try {
        localStorage.setItem('community_custom_activity_logs', JSON.stringify(auditTrail));
      } catch (err) {
        console.error("Failed to save report locally", err);
      }

      reloadReportsData();
    });
  }

  const toggleHistoryPinBtn = document.getElementById('btn-toggle-history-pin');
  if (toggleHistoryPinBtn) {
    toggleHistoryPinBtn.addEventListener('click', () => {
      if (!reportStore.forcedHistoryPins) {
        reportStore.forcedHistoryPins = [];
      }
      const idx = reportStore.forcedHistoryPins.indexOf(issue.id);
      if (idx === -1) {
        reportStore.forcedHistoryPins.push(issue.id);
      } else {
        reportStore.forcedHistoryPins.splice(idx, 1);
      }
      localStorage.setItem('community_forced_history_pins', JSON.stringify(reportStore.forcedHistoryPins));
      updateIssueMarkers();
      renderIncidentDetailsCard();
    });
  }
}

function migrateWelfareStorageKeys() {
  console.log("Running local storage naming migration checks...");
  const legacyKeys = {
    'cw_custom_issues': 'community_custom_issues',
    'cw_custom_activity_logs': 'community_custom_activity_logs',
    'cw_upvoted_issues': 'community_upvoted_issues',
    'cw_forced_history_pins': 'community_forced_history_pins'
  };
  let migratedCount = 0;
  for (const [legacyKey, newKey] of Object.entries(legacyKeys)) {
    const data = localStorage.getItem(legacyKey);
    if (data) {
      localStorage.setItem(newKey, data);
      localStorage.removeItem(legacyKey);
      migratedCount++;
      console.log(`Migrated legacy key "${legacyKey}" to "${newKey}".`);
    }
  }
  if (migratedCount > 0) {
    console.log(`Storage migration complete: Successfully migrated ${migratedCount} legacy keys.`);
  } else {
    console.log("Storage migration complete: No legacy formats detected.");
  }
}
