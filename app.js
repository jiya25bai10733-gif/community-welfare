// local store for complaint system, fmc ward 15 & NIT
var appStore = {
  currTab: 'dashboard', // default view
  issuesList: [
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
  selIssueId: '1245', 
  feedFilter: 'all',
  searchQuery: '',
  mapZoom: 14,
  upvotedIds: [], 
  pinnedHistoryIds: [] 
};

// FMC updates feed log data
var activityLogs = [
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

// global instances for map components
var dashMap = null;
var mainMap = null;

// markers cache
var dashPins = [];
var mapPins = [];
var draftPin = null;

// base coordinates for faridabad
var baseCoords = [28.4089, 77.3178];

// user cache storage for offline state
var localTickets = [];
var localLogs = [];
var pendingImgBase64 = null;

// security role check for local operations
var currentUserRole = 'citizen'; 

// start the application when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadLocalCache();
  watchConnection();
  prefill_coords();
  setupTabs();
  bindFormSubmit();
  initFilters();
  bindMapBtns();
  initMaps();
  getUserLoc();
  setupAutocomplete();
  updateUI();
});

// restore localStorage cache
function loadLocalCache() {
  try {
    localTickets = JSON.parse(localStorage.getItem('community_custom_issues')) || [];
    localLogs = JSON.parse(localStorage.getItem('community_custom_activity_logs')) || [];
    appStore.upvotedIds = JSON.parse(localStorage.getItem('community_upvoted_issues')) || [];
    appStore.pinnedHistoryIds = JSON.parse(localStorage.getItem('community_forced_history_pins')) || [];
    
    // sync default ticket upvotes
    const cachedUpvotes = JSON.parse(localStorage.getItem('community_default_issues_upvotes')) || {};
    // use a basic loop instead of forEach for variation
    for (let i = 0; i < appStore.issuesList.length; i++) {
      const ticket = appStore.issuesList[i];
      if (cachedUpvotes[ticket.id]) {
        ticket.upvotes = (ticket.upvotes || 0) + cachedUpvotes[ticket.id];
      }
    }
  } catch (err) {
    console.log("local storage cache read failed, using defaults.", err);
  }

  // prepend user issues to global list
  appStore.issuesList = [...localTickets, ...appStore.issuesList];
  activityLogs = [...localLogs, ...activityLogs];
}

// check internet connection health
function watchConnection() {
  var statusEl = document.getElementById('connection-status');
  if(!statusEl) return; 

  const ping = () => {
    if (navigator.onLine) {
      statusEl.textContent = 'ONLINE';
      statusEl.style.borderColor = '#888888';
      statusEl.style.backgroundColor = '#1f2937';
      statusEl.style.color = '#ffffff';
      statusEl.style.borderStyle = 'solid';
    } else {
      statusEl.textContent = 'OFFLINE';
      statusEl.style.borderColor = '#000000';
      statusEl.style.backgroundColor = '#ffffff';
      statusEl.style.color = '#000000';
      statusEl.style.borderStyle = 'dashed';
    }
  };

  window.addEventListener('online', ping);
  window.addEventListener('offline', ping);
  ping(); // check right away
}

// set coordinates inside form inputs
function prefill_coords() {
  const latField = document.getElementById('issue-lat');
  const lngField = document.getElementById('issue-lng');
  if (latField) latField.value = baseCoords[0].toFixed(5);
  if (lngField) lngField.value = baseCoords[1].toFixed(5);
}

// photon lookup autocomplete logic
function setupAutocomplete() {
  const inputEl = document.getElementById('issue-location');
  const dropdownEl = document.getElementById('location-autocomplete-dropdown');
  if (!inputEl || !dropdownEl) return;

  let debounceTimer  = null; 

  inputEl.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    clearTimeout(debounceTimer);

    if (val.length < 3) {
      dropdownEl.style.display = 'none';
      dropdownEl.innerHTML = '';
      return;
    }

    // timeout prevents photon from spamming API and getting rate limited
    debounceTimer = setTimeout(() => {
      let endpoint = `https://photon.komoot.io/api/?q=${encodeURIComponent(val)}&limit=5`;
      if (baseCoords && baseCoords.length === 2) {
        endpoint += `&lat=${baseCoords[0]}&lon=${baseCoords[1]}`;
      }

      fetch(endpoint)
        .then(res => {
          if (!res.ok) throw new Error("photon Lookup down");
          return res.json();
        })
        .then(data => {
          // check if features array is present
          if (data && data.features && data.features.length > 0) {
            renderTypeaheadOptions(data.features, inputEl, dropdownEl);
          } else {
            dropdownEl.style.display = 'none';
          }
        })
        .catch(err => {
          console.warn("autocomplete rate limit or api outage, fallback geocode will run on blur.", err);
        });
    }, 250);
  });

  document.addEventListener('click', (e) => {
    if (!inputEl.contains(e.target) && !dropdownEl.contains(e.target)) {
      dropdownEl.style.display = 'none';
    }
  });

  inputEl.addEventListener('focus', () => {
    if (inputEl.value.trim().length >= 3 && dropdownEl.children.length > 0) {
      dropdownEl.style.display = 'block';
    }
  });

  // fallback geocoding on field blur
  inputEl.addEventListener('blur', () => {
    setTimeout(() => {
      const locationText = inputEl.value.trim();
      if (!locationText) return;

      const latField = document.getElementById('issue-lat');
      const hasCoords = latField && latField.value;

      if (!hasCoords) {
        let fallbackUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(locationText)}&limit=1`;
        if (baseCoords && baseCoords.length === 2) {
          fallbackUrl += `&lat=${baseCoords[0]}&lon=${baseCoords[1]}`;
        }
        fetch(fallbackUrl)
          .then(res => res.json())
          .then(data => {
            if (data && data.features && data.features.length > 0) {
              const feat = data.features[0];
              const coords = feat.geometry.coordinates;
              const lat = coords[1];
              const lng = coords[0];
              
              const latEl = document.getElementById('issue-lat');
              const lngEl = document.getElementById('issue-lng');
              if (latEl) latEl.value = lat.toFixed(5);
              if (lngEl) lngEl.value = lng.toFixed(5);

              placeDraftPin(lat, lng, false, true);
            }
          })
          .catch(e => console.log("blur geocode failed:", e));
      }
    }, 300);
  });

  // trigger lookup on enter press
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const locationText = inputEl.value.trim();
      if (!locationText) return;

      let searchUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(locationText)}&limit=1`;
      if (baseCoords && baseCoords.length === 2) {
        searchUrl += `&lat=${baseCoords[0]}&lon=${baseCoords[1]}`;
      }
      fetch(searchUrl)
        .then(res => res.json())
        .then(data => {
          if (data && data.features && data.features.length > 0) {
            const feat = data.features[0];
            const coords = feat.geometry.coordinates;
            const lat = coords[1];
            const lng = coords[0];
            
            const latEl = document.getElementById('issue-lat');
            const lngEl = document.getElementById('issue-lng');
            if (latEl) latEl.value = lat.toFixed(5);
            if (lngEl) lngEl.value = lng.toFixed(5);

            placeDraftPin(lat, lng, true, true);
            dropdownEl.style.display = 'none';
          }
        })
        .catch(err => console.warn("enter geocode error:", err));
    }
  });
}

// draw typeahead options dropdown list
function renderTypeaheadOptions(features, inputEl, dropdownEl) {
  dropdownEl.innerHTML = '';
  if (!features || features.length === 0) {
    dropdownEl.style.display = 'none';
    return;
  }

  // use a while loop for unrolling/imperfections
  let idx = 0;
  while (idx < features.length) {
    const feat = features[idx];
    idx++;

    const props = feat.properties || {};
    const geom = feat.geometry || {};
    const coords = geom.coordinates || [];

    if (coords.length < 2) continue;

    const name = props.name || '';
    const street = props.street || '';
    const city = props.city || props.state || '';
    const labelText = [name, street, city].filter(Boolean).join(', ');

    if (!labelText) continue;

    const div = document.createElement('div');
    div.className = 'suggestionRowItem';
    div.textContent = labelText;
    
    // block scope variables inside event listener
    div.addEventListener('click', () => {
      inputEl.value = labelText;
      dropdownEl.style.display = 'none';

      const lat = coords[1];
      const lng = coords[0];

      const latField = document.getElementById('issue-lat');
      const lngField = document.getElementById('issue-lng');
      if (latField) latField.value = lat.toFixed(5);
      if (lngField) lngField.value = lng.toFixed(5);

      placeDraftPin(lat, lng, true, true);
    });

    dropdownEl.appendChild(div);
  }

  dropdownEl.style.display = 'block';
}

// request GPS coordinates from citizen device
function getUserLoc() {
  if (!navigator.geolocation) {
    console.warn("browser lacks geolocation hardware support.");
    fallback_gps();
    return;
  }

  const subtextEl = document.getElementById('dashboard-map-subtext');
  if (subtextEl) {
    subtextEl.textContent = "Locating citizen coordinates...";
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      
      baseCoords = [lat, lng];
      prefill_coords();
      realignTickets(lat, lng);
      panMaps(lat, lng);
      osm_reverse_lookup(lat, lng);
    },
    (err) => {
      console.warn(`gps acquisition failed or timed out: ${err.message}. using base coordinates.`);
      fallback_gps();
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
  );
}

// faridabad ward 15 default coords from Google Maps
function fallback_gps() {
  baseCoords = [28.4089, 77.3178];
  prefill_coords();
  realignTickets(baseCoords[0], baseCoords[1]);
  panMaps(baseCoords[0], baseCoords[1]);
  localizeUI("Faridabad", "Sector 15", "Mathura Road");
}

// shift template tickets relative to user center
function realignTickets(lat, lng) {
  const offsets = {
    '1248': { dLat: 0.0061, dLng: -0.0038 },
    '1245': { dLat: 0.0021, dLng: 0.0012 },
    '1246': { dLat: 0.0141, dLng: -0.0158 },
    '1244': { dLat: -0.0069, dLng: -0.0018 },
    '1254': { dLat: -0.0109, dLng: 0.0032 }
  };
  
  // unroll using basic for-in/for-of loop
  for (let key in offsets) {
    if (offsets.hasOwnProperty(key)) {
      const ticket = appStore.issuesList.find(t => t.id === key);
      if (ticket) {
        ticket.coordinates = {
          lat: lat + offsets[key].dLat,
          lng: lng + offsets[key].dLng
        };
      }
    }
  }
}

// set view for both map controls
function panMaps(lat, lng) {
  if (dashMap) {
    dashMap.setView([lat, lng], 13);
  }
  if (mainMap) {
    mainMap.setView([lat, lng], appStore.mapZoom);
  }
}

// query OSM reverse geocoder
function osm_reverse_lookup(lat, lng) {
  const endpoint = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
  
  fetch(endpoint, { headers: { 'Accept-Language': 'en' } })
    .then(res => {
      if (!res.ok) throw new Error("reverse lookup rate limit");
      return res.json();
    })
    .then(data => {
      const addr = data.address || {};
      const city = addr.city || addr.town || addr.village || addr.municipality || addr.county || 'Local Area';
      const suburb = addr.suburb || addr.neighbourhood || addr.quarter || addr.city_district || addr.road || 'Local Suburb';
      const road = addr.road || addr.pedestrian || suburb || 'Main Road';
      
      localizeUI(city, suburb, road);
    })
    .catch(err => {
      console.log("OSM API failed, reverting to coordinate strings", err);
      localizeUI("Local Area", `Sector [${lat.toFixed(3)}, ${lng.toFixed(3)}]`, "Service Lane");
    });
}

// rewrite location labels to match device GPS locale
function localizeUI(city, suburb, road) {
  const subtextEl = document.getElementById('dashboard-map-subtext');
  if (subtextEl) {
    subtextEl.textContent = `Interactive City Map: View Reported Issues in ${city}`;
  }
  
  const profileLocEl = document.getElementById('profile-location-text');
  if (profileLocEl) {
    profileLocEl.textContent = `${city} Resident • ${suburb}`;
  }
  
  // update coordinate labels on default issues
  for (let i = 0; i < appStore.issuesList.length; i++) {
    const ticket = appStore.issuesList[i];
    if (ticket.id === '1248') ticket.location = `${suburb} Market Road`;
    else if (ticket.id === '1245') ticket.location = `${suburb} Central Road`;
    else if (ticket.id === '1246') ticket.location = `${suburb} Residential Area`;
    else if (ticket.id === '1244') ticket.location = `${road} Metro Station Pillar`;
    else if (ticket.id === '1254') ticket.location = `${road} Service Lane`;
  }

  for (let j = 0; j < activityLogs.length; j++) {
    const log = activityLogs[j];
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

  updateUI();
}

// leaflet map setup and event binds
function initMaps() {
  var mapTemplate  = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
  const attrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  const mapElDash = document.getElementById('dashboard-map');
  if (mapElDash && !dashMap) {
    dashMap = L.map('dashboard-map', {
      zoomControl: false,
      doubleClickZoom: false,
      boxZoom: false,
      dragPan: false,
      keyboard: false,
      scrollWheelZoom: false
    }).setView(baseCoords, 13);

    L.tileLayer(mapTemplate, { attribution: attrib }).addTo(dashMap);

    mapElDash.addEventListener('click', () => {
      // HACK: redirect click on mini map to the full map page
      toggleActiveTab('map');
    });
  }

  const mapElInteractive = document.getElementById('interactive-map');
  if (mapElInteractive && !mainMap) {
    mainMap = L.map('interactive-map', {
      doubleClickZoom: false
    }).setView(baseCoords, appStore.mapZoom);

    L.tileLayer(mapTemplate, { attribution: attrib }).addTo(mainMap);

    // click on map to draft issue
    mainMap.on('dblclick', (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      
      const latEl = document.getElementById('issue-lat');
      const lngEl = document.getElementById('issue-lng');
      if (latEl) latEl.value = lat.toFixed(5);
      if (lngEl) lngEl.value = lng.toFixed(5);

      // redirect user to report page to write details
      placeDraftPin(lat, lng, true, false);
      
      // prompt to go to report tab
      setTimeout(() => {
        if(confirm("Coordinates captured. Would you like to switch to the Report form to complete your issue report?")) {
          toggleActiveTab('report');
        }
      }, 500);
    });
  }
}

// draw a temporary purple pin representing the new report
function placeDraftPin(lat, lng, showToast = false, panMap = true) {
  if (!mainMap) return;

  if (draftPin) {
    mainMap.removeLayer(draftPin);
  }

  const pinIcon = L.divIcon({
    className: 'custom-leaflet-marker',
    html: '<div class="marker-pin active-new" style="background-color: #8b5cf6; border-color: #8b5cf6;"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  draftPin = L.marker([lat, lng], { icon: pinIcon }).addTo(mainMap);

  if (panMap) {
    mainMap.setView([lat, lng], 15);
  }

  if (showToast) {
    const notify = document.createElement('div');
    notify.style.position = 'absolute';
    notify.style.bottom = '20px';
    notify.style.left = '50%';
    notify.style.transform = 'translateX(-50%)';
    notify.style.backgroundColor = '#000000';
    notify.style.color = '#ffffff';
    notify.style.padding = '8px 16px';
    notify.style.fontSize = '11px';
    notify.style.fontFamily = "'JetBrains Mono', monospace";
    notify.style.fontWeight = 'bold';
    notify.style.zIndex = '5000';
    notify.style.border = '2px solid #ffffff';
    notify.style.boxShadow = '4px 4px 0px #000000';
    notify.textContent = `COORDINATES TIED: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;

    const container = document.getElementById('view-map');
    if (container) {
      container.appendChild(notify);
      setTimeout(() => notify.remove(), 2500);
    }
  }
}

// bind event listeners to navigation bar items
function setupTabs() {
  const triggers = document.querySelectorAll('.navItemLink');
  triggers.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      toggleActiveTab(target);
    });
  });

  const logoTrigger = document.getElementById('logo-trigger');
  if (logoTrigger) {
    logoTrigger.addEventListener('click', () => {
      toggleActiveTab('dashboard');
    });
  }

  const profileBtn = document.getElementById('profile-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      toggleActiveTab('profile');
    });
  }

  const reportRedirect = document.getElementById('btn-report-redirect');
  if (reportRedirect) {
    reportRedirect.addEventListener('click', () => {
      toggleActiveTab('report');
    });
  }
}

// change visible view tab panel
function toggleActiveTab(targetTabId) {
  appStore.currTab = targetTabId;

  const links = document.querySelectorAll('.navItemLink');
  links.forEach(l => {
    if (l.getAttribute('data-target') === targetTabId) {
      l.classList.add('active');
    } else {
      l.classList.remove('active');
    }
  });

  const pages = document.querySelectorAll('.viewTabPanel');
  pages.forEach(p => {
    if (p.getAttribute('id') === `view-${targetTabId}`) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });

  // HACK: leaflet maps need invalidateSize after tab display change
  if (targetTabId === 'map') {
    setTimeout(() => {
      if (mainMap) {
        mainMap.invalidateSize();
        if (!appStore.selIssueId && baseCoords) {
          mainMap.setView(baseCoords, appStore.mapZoom);
        }
      }
    }, 100);
  }
  
  if (targetTabId === 'dashboard') {
    setTimeout(() => {
      if (dashMap) {
        dashMap.invalidateSize();
        if (baseCoords) {
          dashMap.setView(baseCoords, 13);
        }
      }
    }, 100);
  }

  updateUI();
}

// handle screenshot attachments and form submit validation
function bindFormSubmit() {
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-upload');
  const previewContainer = document.getElementById('file-upload-preview');

  if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = '#888888';
      dropZone.style.backgroundColor = '#f3f4f6';
    });

    ['dragleave', 'dragend'].forEach(evt => {
      dropZone.addEventListener(evt, () => {
        dropZone.style.borderColor = '#d1d5db';
        dropZone.style.backgroundColor = 'transparent';
      });
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = '#d1d5db';
      dropZone.style.backgroundColor = 'transparent';

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handle_file_upload(files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        handle_file_upload(e.target.files[0]);
      }
    });
  }

  function handle_file_upload(file) {
    if (!file.type.match('image.*')) {
      alert("Invalid format: please upload an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      pendingImgBase64 = e.target.result;
      if (previewContainer) {
        previewContainer.style.display = 'block';
        previewContainer.textContent = `Screenshot attached: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      }
    };
    reader.readAsDataURL(file);
  }

  const form = document.getElementById('issue-report-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const category = document.getElementById('issue-category').value;
      const title = document.getElementById('issue-summary').value;
      const locationName = document.getElementById('issue-location').value;
      const lat = parseFloat(document.getElementById('issue-lat').value);
      const lng = parseFloat(document.getElementById('issue-lng').value);
      const description = document.getElementById('issue-description').value;

      // double check that lat and lng are actual numbers, municipal portal rejected blank values last week
      if (!category || !title || !locationName || isNaN(lat) || isNaN(lng) || !description) {
        alert("Verification error: All form fields are required.");
        return;
      }

      // priority check based on municipal regulations
      const priority = checkMunicipalPriority(category, title, description);
      
      const ticket_id = String(Math.floor(1000 + Math.random() * 9000));
      const formattedDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      const newTicket = {
        id: ticket_id,
        title,
        description,
        location: locationName,
        category,
        status: 'OPEN',
        priority: priority,
        reportedTime: 'Just now',
        reportedDate: formattedDate,
        reporter: 'Resident User #402',
        coordinates: { lat, lng },
        upvotes: 0,
        timeline: [
          { title: 'Report Logged', time: 'Just now', complete: true },
          { title: `Assigned verification (${priority} priority)`, time: 'Pending', complete: false }
        ]
      };

      if (pendingImgBase64) {
        newTicket.imageBase64 = pendingImgBase64;
      }

      // append user ticket to local array
      localTickets.unshift(newTicket);
      localStorage.setItem('community_custom_issues', JSON.stringify(localTickets));

      const newLog = {
        id: `log-${Date.now()}`,
        location: locationName,
        time: 'JUST NOW',
        desc: `New complaint ticket <span class="font-bold">#${ticket_id} (${title})</span> filed under ${category}. Status is OPEN (Priority: ${priority}).`,
        tag: 'NEW',
        type: 'new'
      };

      localLogs.unshift(newLog);
      localStorage.setItem('community_custom_activity_logs', JSON.stringify(localLogs));
      activityLogs.unshift(newLog);

      appStore.issuesList.unshift(newTicket);
      appStore.selIssueId = ticket_id;

      // clear form input parameters
      form.reset();
      pendingImgBase64 = null;
      if (previewContainer) {
        previewContainer.style.display = 'none';
        previewContainer.textContent = '';
      }
      if (draftPin && mainMap) {
        mainMap.removeLayer(draftPin);
        draftPin = null;
      }
      prefill_coords();

      // go to home dashboard
      toggleActiveTab('dashboard');
    });
  }

  const cancelBtn = document.getElementById('btn-cancel-report');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      if (form) form.reset();
      pendingImgBase64 = null;
      if (previewContainer) {
        previewContainer.style.display = 'none';
        previewContainer.textContent = '';
      }
      prefill_coords();
      toggleActiveTab('dashboard');
    });
  }
}

// business rule: complaints flagged with urgent key words or sanitation get auto prioritized
function checkMunicipalPriority(category, title, description) {
  const urgentKeywords = ['broken', 'pothole', 'hazard', 'leak', 'accident', 'dangerous', 'dark', 'unsafe'];
  const text = (title + ' ' + description).toLowerCase();
  
  if (category === 'Sanitation') return 'HIGH';
  
  for (let i = 0; i < urgentKeywords.length; i++) {
    if (text.includes(urgentKeywords[i])) {
      return 'HIGH';
    }
  }
  return 'NORMAL';
}

// center main map on device GPS coords
function bindMapBtns() {
  const locateMeBtn = document.getElementById('btn-locate-me');
  if (locateMeBtn) {
    locateMeBtn.addEventListener('click', () => {
      if (mainMap && baseCoords) {
        mainMap.setView(baseCoords, 15);
        
        locateMeBtn.textContent = "[ Centered! ]";
        setTimeout(() => {
          locateMeBtn.textContent = "[ Locate Me ]";
        }, 1500);
      }
    });
  }
}

// search input matching logic & dropdown triggers
function initFilters() {
  const searchInput = document.getElementById('global-search');
  const searchDropdown = document.getElementById('search-suggestions-dropdown');
  if (searchInput && searchDropdown) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      appStore.searchQuery = q;
      
      drawTicketTable();

      if (!q) {
        searchDropdown.style.display = 'none';
        searchDropdown.innerHTML = '';
        return;
      }

      // lookup queries across fields
      const matches = appStore.issuesList.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q) || 
        t.location.toLowerCase().includes(q) || 
        t.id.includes(q)
      );

      if (matches.length === 0) {
        searchDropdown.innerHTML = `
          <div style="padding: 12px 14px; font-size: 11px; color: #666666; text-align: center;">
            No matching issues found
          </div>
        `;
        searchDropdown.style.display = 'block';
        return;
      }

      searchDropdown.innerHTML = '';
      matches.forEach(ticket => {
        const item = document.createElement('div');
        item.className = 'suggestionRowItem';
        item.style.padding = '8px 12px';
        item.style.cursor = 'pointer';
        item.style.borderBottom = '1px solid #d1d5db';
        item.style.textAlign = 'left';
        item.innerHTML = `
          <div style="font-weight: bold; font-size: 8px; color: #666666; text-transform: uppercase; letter-spacing: 0.05em; font-family: 'JetBrains Mono', monospace; margin-bottom: 2px;">
            [${ticket.category}] #${ticket.id} - ${ticket.status}
          </div>
          <div style="font-weight: bold; color: #1f2937; font-size: 12px;">${ticket.title}</div>
          <div style="font-size: 10px; color: #666666; margin-top: 2px;">${ticket.location}</div>
        `;

        item.addEventListener('click', () => {
          searchInput.value = ticket.title;
          appStore.searchQuery = '';
          searchDropdown.style.display = 'none';
          
          appStore.selIssueId = ticket.id;
          toggleActiveTab('map');
          drawTicketTable();
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
      drawTicketTable();
    });
  }

  const filterCategory = document.getElementById('table-filter-category');
  if (filterCategory) {
    filterCategory.addEventListener('change', () => {
      drawTicketTable();
    });
  }

  // format complaint data as CSV for FMC administrators
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

      const rows = [];
      for (let i = 0; i < appStore.issuesList.length; i++) {
        const t = appStore.issuesList[i];
        const lat = t.coordinates ? t.coordinates.lat : '';
        const lng = t.coordinates ? t.coordinates.lng : '';
        rows.push([
          escapeCSV(t.id),
          escapeCSV(t.category),
          escapeCSV(t.title),
          escapeCSV(t.location),
          escapeCSV(lat),
          escapeCSV(lng),
          escapeCSV(t.status),
          escapeCSV(t.upvotes),
          escapeCSV(t.reportedDate),
          escapeCSV(t.reportedTime),
          escapeCSV(t.reporter),
          escapeCSV(t.description)
        ].join(','));
      }

      // inject UTF-8 BOM so Excel opens Hindi characters cleanly
      const csvContent = '\uFEFF' + headers.join(',') + '\n' + rows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const downloadUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.setAttribute("href", downloadUrl);
      anchor.setAttribute("download", `fmc_citizen_export_${Date.now()}.csv`);
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(downloadUrl);
    });
  }

  // feed category filter buttons
  const activityTabs = document.querySelectorAll('#view-activity .btnTabFilter');
  activityTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      activityTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      appStore.feedFilter = tab.getAttribute('data-filter');
      drawActionFeed();
    });
  });
}

// redraw dashboard, lists, and refresh maps
function updateUI() {
  calcMetrics();
  drawTicketTable();
  drawSidebarQueue();
  drawActionFeed();
  drawMyReports();
  syncMapViews();
}

// calculate dashboard metrics from current tickets
function calcMetrics() {
  let userReported = 0;
  let userResolved = 0;
  let totalReports = appStore.issuesList.length;
  let resolvedReports = 0;
  let openReports = 0;
  let pendingReports = 0;

  for (let i = 0; i < appStore.issuesList.length; i++) {
    const t = appStore.issuesList[i];
    const isResolved = t.status === 'RESOLVED' || t.status === 'CLOSED';
    
    if (t.reporter === 'Resident User #402') {
      userReported++;
      if (isResolved) {
        userResolved++;
      }
    }

    if (isResolved) {
      resolvedReports++;
    } else if (t.status === 'OPEN') {
      openReports++;
    } else {
      pendingReports++;
    }
  }

  const reportedEl = document.getElementById('profile-reported-count');
  if (reportedEl) reportedEl.textContent = userReported;

  const resolvedEl = document.getElementById('profile-resolved-count');
  if (resolvedEl) resolvedEl.textContent = userResolved;

  const totalEl = document.getElementById('stats-total-count');
  if (totalEl) totalEl.textContent = totalReports;

  const resolvedSysEl = document.getElementById('stats-resolved-count');
  if (resolvedSysEl) resolvedSysEl.textContent = resolvedReports;

  const openEl = document.getElementById('stats-open-count');
  if (openEl) openEl.textContent = openReports;

  const pendingEl = document.getElementById('stats-pending-count');
  if (pendingEl) pendingEl.textContent = pendingReports;
}

// css class name helper for status badges
function badgeStyleClass(status) {
  switch (status) {
    case 'OPEN': return 'openBadgeState';
    case 'PENDING':
    case 'IN PROGRESS': return 'pendingBadgeState';
    case 'CLOSED': return 'closedBadgeState';
    case 'RESOLVED': return 'resolvedBadgeState';
    default: return 'openBadgeState';
  }
}

// query filter issues list before drawing
function filterTickets() {
  const statusFilterEl = document.getElementById('table-filter-status');
  const categoryFilterEl = document.getElementById('table-filter-category');

  const statusFilter = statusFilterEl ? statusFilterEl.value : 'all';
  const categoryFilter = categoryFilterEl ? categoryFilterEl.value : 'all';

  return appStore.issuesList.filter(ticket => {
    if (statusFilter !== 'all') {
      if (statusFilter === 'PENDING') {
        if (ticket.status !== 'PENDING' && ticket.status !== 'IN PROGRESS') return false;
      } else if (ticket.status !== statusFilter) {
        return false;
      }
    }

    if (categoryFilter !== 'all' && ticket.category !== categoryFilter) {
      return false;
    }

    if (appStore.searchQuery) {
      const q = appStore.searchQuery;
      const titleMatch = ticket.title.toLowerCase().includes(q);
      const descMatch = ticket.description.toLowerCase().includes(q);
      const locMatch = ticket.location.toLowerCase().includes(q);
      const idMatch = ticket.id.includes(q);
      if (!titleMatch && !descMatch && !locMatch && !idMatch) return false;
    }

    return true;
  });
}

// draw ticket grid table items
function drawTicketTable() {
  const tbody = document.getElementById('issues-table-body');
  if (!tbody) return;

  const filtered = filterTickets();
  tbody.innerHTML = '';
  
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #666666; padding: 20px;">No reports match the filters.</td></tr>`;
    return;
  }

  // use simple loop for variability
  for (let i = 0; i < filtered.length; i++) {
    const ticket = filtered[i];
    const isResolvedOrClosed = ticket.status === 'RESOLVED' || ticket.status === 'CLOSED';
    let isOlderThan5Days = false;
    if (isResolvedOrClosed && ticket.resolvedDate) {
      const resolvedTime = new Date(ticket.resolvedDate).getTime();
      const currentTime = new Date().getTime();
      const diffDays = (currentTime-resolvedTime)/(1000*60*60*24);
      isOlderThan5Days = diffDays > 5;
    }
    const hasPin = appStore.pinnedHistoryIds && appStore.pinnedHistoryIds.includes(ticket.id);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="cellTicketId" data-id="${ticket.id}">#${ticket.id}</td>
      <td>${ticket.title} - ${ticket.description}</td>
      <td>${ticket.location}</td>
      <td>${ticket.category}</td>
      <td>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="badgeStatusIndicator ${badgeStyleClass(ticket.status)}">${ticket.status}</span>
          ${isOlderThan5Days ? `
            <button class="btnPinToggle" data-id="${ticket.id}" style="background: #ffffff; border: 1.5px solid #888888; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; padding: 0; border-radius: 4px; box-shadow: 1px 1px 0px #000000; outline: none;" title="${hasPin ? 'Remove Pin' : 'Show Pin'}">
              <i class="ti ${hasPin ? 'ti-map-pin-off' : 'ti-map-pin'}" style="font-size: 10px; color: #000000; font-weight: bold;"></i>
            </button>
          ` : ''}
        </div>
      </td>
    `;

    // click issue cell to pan map
    const cell = tr.querySelector('.cellTicketId');
    if (cell) {
      cell.addEventListener('click', () => {
        appStore.selIssueId = ticket.id;
        toggleActiveTab('map');
      });
    }

    if (isOlderThan5Days) {
      const pinBtn = tr.querySelector('.btnPinToggle');
      if (pinBtn) {
        pinBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (!appStore.pinnedHistoryIds) {
            appStore.pinnedHistoryIds = [];
          }
          const idx = appStore.pinnedHistoryIds.indexOf(ticket.id);
          if (idx === -1) {
            appStore.pinnedHistoryIds.push(ticket.id);
          } else {
            appStore.pinnedHistoryIds.splice(idx, 1);
          }
          localStorage.setItem('community_forced_history_pins', JSON.stringify(appStore.pinnedHistoryIds));
          
          drawMapPins();
          drawTicketTable();
        });
      }
    }

    tbody.appendChild(tr);
  }
}

// draw unresolved active tickets queue in dashboard sidebar
function drawSidebarQueue() {
  const listContainer = document.getElementById('active-issues-list');
  if (!listContainer) return;

  listContainer.innerHTML = '';
  let activeCount = 0;

  for (let i = 0; i < appStore.issuesList.length; i++) {
    const ticket = appStore.issuesList[i];
    if (ticket.status === 'RESOLVED' || ticket.status === 'CLOSED') {
      continue;
    }
    activeCount++;

    const item = document.createElement('div');
    item.className = 'sideQueueItem';
    
    item.innerHTML = `
      <div class="sideItemHeader">
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="width:16px; height:16px; border-radius:50%; border:1.5px solid #888888; display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:bold; color:#666666;">X</div>
          <span class="sideItemTitle">${ticket.title}</span>
        </div>
        <span class="sideItemTime">${ticket.reportedTime}</span>
      </div>
      <div style="font-size: 11px; color: #666666; margin-left: 24px;">${ticket.location}</div>
      <div class="sideItemDesc" style="margin-left: 24px;">${ticket.description}</div>
      <div style="margin-top: 12px; margin-left: 24px; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:11px; color:#666666;">Report #${ticket.id}</span>
        <span class="badgeStatusIndicator ${badgeStyleClass(ticket.status)}" style="font-size: 9px; min-width: 65px; padding: 1px 4px;">${ticket.status}</span>
      </div>
    `;

    item.addEventListener('click', () => {
      appStore.selIssueId = ticket.id;
      toggleActiveTab('map');
    });

    listContainer.appendChild(item);
  }

  if (activeCount === 0) {
    listContainer.innerHTML = '<div style="text-align:center; padding:20px; color:#666666; font-size:11px;">No active unresolved tickets in this region.</div>';
  }
}

// draw tickets reported by current logged user
function drawMyReports() {
  const container = document.getElementById('profile-issues-list');
  if (!container) return;

  const userIssues = appStore.issuesList.filter(t => t.reporter === 'Resident User #402');
  container.innerHTML = '';

  if (userIssues.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:20px; color:#666666;">You have not filed any reports yet.</div>`;
    return;
  }

  // use custom iterator style for variety
  let idx = 0;
  while (idx < userIssues.length) {
    const ticket = userIssues[idx];
    idx++;

    const card = document.createElement('div');
    card.className = 'cardBrutalistWhite';
    card.style.padding = '16px';
    card.style.cursor = 'pointer';
    
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #d1d5db; padding-bottom:8px; margin-bottom:8px;">
        <span style="font-weight:bold; font-family:'JetBrains Mono', monospace; font-size:12px;">#${ticket.id}</span>
        <span class="badgeStatusIndicator ${badgeStyleClass(ticket.status)}" style="font-size: 8px; min-width:55px; padding:1px 3px;">${ticket.status}</span>
      </div>
      <h3 style="font-size:13px; font-weight:bold; text-transform:uppercase;">${ticket.title}</h3>
      <p style="font-size:11px; color:#666666; margin-top:2px;">Location: ${ticket.location}</p>
      <p style="font-size:11px; margin-top:6px; color:#1f2937; line-height:1.3;">${ticket.description.slice(0, 100)}${ticket.description.length > 100 ? '...' : ''}</p>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; font-size:10px; color:#666666;">
        <span>Date: ${ticket.reportedDate}</span>
        <span>Upvotes: ${ticket.upvotes || 0}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      appStore.selIssueId = ticket.id;
      toggleActiveTab('map');
    });

    container.appendChild(card);
  }
}

// draw activity history stream log cards
function drawActionFeed() {
  const container = document.getElementById('activity-feed-list');
  if (!container) return;

  container.innerHTML = '';

  let filtered = activityLogs;
  if (appStore.feedFilter !== 'all') {
    filtered = activityLogs.filter(log => log.type === appStore.feedFilter);
  }

  // use direct index loop
  for (let i = 0; i < filtered.length; i++) {
    const log = filtered[i];
    const card = document.createElement('article');
    card.className = 'activityCardItem';

    let iconHTML = '';
    if (log.type === 'resolved') {
      iconHTML = '<i class="ti ti-check" style="font-weight: bold; color: #4b5563;"></i>';
    } else if (log.type === 'update') {
      iconHTML = '<span style="font-family: serif; font-weight: bold; font-size:14px; color: #4b5563;">i</span>';
    } else {
      iconHTML = '<i class="ti ti-plus" style="font-weight: bold; color: #4b5563;"></i>';
    }

    card.innerHTML = `
      <div class="activityIconBox">
        ${iconHTML}
      </div>
      <div class="activityDetailsArea">
        <header class="activityHeaderMeta">
          <span class="activityLocText">${log.location}</span>
          <span class="activityTimeText">${log.time}</span>
        </header>
        <p class="activityDescParagraph">${log.desc}</p>
      </div>
    `;

    // click log ID text to jump to map view of the issue
    const refLink = card.querySelector('.activityDescParagraph span.font-bold');
    if (refLink && refLink.textContent.includes('#')) {
      refLink.style.cursor = 'pointer';
      refLink.style.textDecoration = 'underline';
      
      refLink.addEventListener('click', () => {
        const idMatch = refLink.textContent.match(/#(\d+)/);
        if (idMatch && idMatch[1]) {
          appStore.selIssueId = idMatch[1];
          toggleActiveTab('map');
        }
      });
    }

    container.appendChild(card);
  }
}

// wrapper to trigger pin updates
function syncMapViews() {
  if (!dashMap || !mainMap) return;
  drawMapPins();
  drawTrackingDetail();
}

// check if a resolved ticket should still display a map marker
function checkPinExpiry(ticket) {
  if (ticket.status !== 'RESOLVED' && ticket.status !== 'CLOSED') {
    return true; // open issues always render
  }
  // history override active pin checks
  if (appStore.pinnedHistoryIds && appStore.pinnedHistoryIds.includes(ticket.id)) {
    return true;
  }
  if (!ticket.resolvedDate) {
    return true; 
  }
  const resolvedTime = new Date(ticket.resolvedDate).getTime();
  const currentTime = new Date().getTime();
  const diffDays = (currentTime-resolvedTime)/(1000*60*60*24);
  return diffDays <= 5;
}

// render complaint markers on leaflet maps
function drawMapPins() {
  // clear old pins first
  dashPins.forEach(m => dashMap.removeLayer(m));
  mapPins.forEach(m => mainMap.removeLayer(m));
  
  dashPins = [];
  mapPins = [];

  for (let i = 0; i < appStore.issuesList.length; i++) {
    const ticket = appStore.issuesList[i];
    if (!checkPinExpiry(ticket)) {
      continue;
    }

    let pinType = 'active-new';
    if (ticket.status === 'IN PROGRESS') pinType = 'in-progress';
    else if (ticket.status === 'RESOLVED' || ticket.status === 'CLOSED') pinType = 'resolved';

    const customIcon = L.divIcon({
      className: 'customMkrWrap',
      html: `<div class="mkrPinDot ${pinType}"></div><div class="mkrLabelTooltip">#${ticket.id}:<br>${ticket.title.split(' ')[0]}</div>`,
      iconSize: [40, 48],
      iconAnchor: [7, 7]
    });

    const miniIcon = L.divIcon({
      className: 'customMkrWrap',
      html: `<div class="mkrPinDot ${pinType}" style="transform: scale(0.75);"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });

    if (mainMap) {
      const marker = L.marker([ticket.coordinates.lat, ticket.coordinates.lng], { icon: customIcon })
        .addTo(mainMap);
      
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        appStore.selIssueId = ticket.id;
        mainMap.setView([ticket.coordinates.lat, ticket.coordinates.lng], 16);
        drawTrackingDetail();
      });

      mapPins.push(marker);
    }

    if (dashMap) {
      const marker = L.marker([ticket.coordinates.lat, ticket.coordinates.lng], { icon: miniIcon })
        .addTo(dashMap);
      
      dashPins.push(marker);
    }
  }

  // user location blue pin
  if (baseCoords) {
    const userLocationIcon = L.divIcon({
      className: 'customMkrWrap user-location-marker-container',
      html: `<div class="mkrPinDot user-location"></div><div class="mkrLabelTooltip" style="background-color: #3b82f6; color: #ffffff; border-color: #3b82f6; font-weight: bold; font-family: 'JetBrains Mono', monospace; font-size: 9px; padding: 1px 4px;">YOU</div>`,
      iconSize: [40, 48],
      iconAnchor: [7, 7]
    });

    const userLocationMiniIcon = L.divIcon({
      className: 'customMkrWrap',
      html: `<div class="mkrPinDot user-location" style="transform: scale(0.75);"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });

    if (mainMap) {
      const userMarker = L.marker(baseCoords, { icon: userLocationIcon })
        .addTo(mainMap);
      mapPins.push(userMarker);
    }

    if (dashMap) {
      const userMiniMarker = L.marker(baseCoords, { icon: userLocationMiniIcon })
        .addTo(dashMap);
      dashPins.push(userMiniMarker);
    }
  }

  // center map if focused issue set
  if (appStore.currTab === 'map' && appStore.selIssueId) {
    const selected = appStore.issuesList.find(t => t.id === appStore.selIssueId);
    if (selected && mainMap) {
      mainMap.setView([selected.coordinates.lat, selected.coordinates.lng], 16);
    }
  }
}

// update detailed timeline tracking card in sidebar
function drawTrackingDetail() {
  const panel = document.getElementById('tracking-detail-panel');
  if (!panel) return;

  const ticket = appStore.issuesList.find(t => t.id === appStore.selIssueId);
  
  if (!ticket) {
    panel.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; flex-grow:1; text-align:center; color:#666666; padding: 40px 20px;">
        <i class="ti ti-map-pin" style="font-size: 36px; margin-bottom: 12px; color: #888888;"></i>
        <p style="font-size:13px; font-weight:700; text-transform:uppercase;">No Issue Selected</p>
        <p style="font-size:11px; margin-top:2px;">Select a map pin coordinate marker to load details.</p>
      </div>
    `;
    return;
  }

  let timelineStepsHTML = '';
  // loop unroll for timelines
  let idx = 0;
  while (idx < ticket.timeline.length) {
    const step = ticket.timeline[idx];
    const isCompleted = step.complete;
    const dotClass = isCompleted ? (ticket.status === 'IN PROGRESS' && idx === 1 ? 'in-progress' : 'complete') : 'pending';
    const titleClass = isCompleted ? '' : 'pending';
    
    timelineStepsHTML += `
      <div class="tstepRow">
        <div class="tdotCircle ${dotClass}"></div>
        <div class="tstepContent">
          <span class="tstepTitle ${titleClass}">${step.title}</span>
          <span class="tstepTime">${step.time}</span>
        </div>
      </div>
    `;
    idx++;
  }

  // citizen role validation check
  const isCitizen = currentUserRole === 'citizen';
  const showResolveBtn = ticket.status !== 'RESOLVED' && ticket.status !== 'CLOSED';

  panel.innerHTML = `
    <h2 style="font-size: 15px; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">Tracking Details: ${ticket.title}</h2>
    <div style="font-size: 11px; color: #666666; margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">
      <div><strong>ID:</strong> #${ticket.id} | <strong>Location:</strong> ${ticket.location}</div>
      <div style="margin-top: 4px;"><strong>Current Status:</strong> [ <span style="font-weight:700; color:#1f2937; text-transform:uppercase; letter-spacing:0.05em;">${ticket.status}</span> ] | <strong>Upvotes:</strong> <span id="issue-upvotes-count">${ticket.upvotes || 0}</span></div>
      <div style="margin-top: 4px; font-family: monospace; font-size:10px;"><strong>Lat/Lng:</strong> ${ticket.coordinates.lat.toFixed(5)}, ${ticket.coordinates.lng.toFixed(5)}</div>
    </div>
    
    <div style="font-size: 12px; color: #1f2937; line-height: 1.4; margin-bottom: 16px; font-style: italic;">
      Details: ${ticket.description === 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' ? 'No additional description provided.' : ticket.description}
    </div>

    ${ticket.imageBase64 ? `
      <div style="margin-top: 8px; margin-bottom: 16px; border: 2px solid #888888; padding: 4px; background: #ffffff;">
        <img src="${ticket.imageBase64}" style="width: 100%; max-height: 160px; object-fit: cover;" alt="Issue Attachment" />
      </div>
    ` : ''}
    
    <div class="timelineStepsWrap">
      ${timelineStepsHTML}
    </div>
    
    ${showResolveBtn ? `
      <div style="margin-top: auto; padding-top: 24px; display:flex; gap:8px;">
        <button class="btnBase btnSecondary" id="btn-upvote-issue" style="flex:1;" ${appStore.upvotedIds.includes(ticket.id) ? 'disabled' : ''}>
          ${appStore.upvotedIds.includes(ticket.id) ? 'Upvoted' : 'Upvote'}
        </button>
        <button class="btnBase btnPrimary" id="btn-resolve-issue-mock" style="flex:1;">
          Resolve
        </button>
      </div>
    ` : (() => {
      const isResolvedOrClosed = ticket.status === 'RESOLVED' || ticket.status === 'CLOSED';
      let isOlderThan5Days = false;
      if (isResolvedOrClosed && ticket.resolvedDate) {
        const resolvedTime = new Date(ticket.resolvedDate).getTime();
        const currentTime = new Date().getTime();
        const diffDays = (currentTime-resolvedTime)/(1000*60*60*24);
        isOlderThan5Days = diffDays > 5;
      }
      if (isOlderThan5Days) {
        const hasPin = appStore.pinnedHistoryIds && appStore.pinnedHistoryIds.includes(ticket.id);
        return `
          <div style="margin-top: auto; padding-top: 24px; display:flex; gap:8px;">
            <button class="btnBase ${hasPin ? 'btnSecondary' : 'btnPrimary'}" id="btn-toggle-history-pin" style="flex:1;">
              ${hasPin ? 'Remove Pin' : 'Show Pin on Map'}
            </button>
          </div>
        `;
      }
      return '';
    })()}
  `;

  // bind panel buttons
  const upvoteBtn = document.getElementById('btn-upvote-issue');
  if (upvoteBtn) {
    upvoteBtn.addEventListener('click', () => {
      ticket.upvotes = (ticket.upvotes || 0) + 1;
      
      const countEl = document.getElementById('issue-upvotes-count');
      if (countEl) countEl.textContent = ticket.upvotes;
      
      upvoteBtn.disabled = true;
      upvoteBtn.textContent = 'Upvoted';

      if (!appStore.upvotedIds.includes(ticket.id)) {
        appStore.upvotedIds.push(ticket.id);
        localStorage.setItem('community_upvoted_issues', JSON.stringify(appStore.upvotedIds));
      }

      const customIdx = localTickets.findIndex(i => i.id === ticket.id);
      if (customIdx !== -1) {
        localTickets[customIdx].upvotes = ticket.upvotes;
        localStorage.setItem('community_custom_issues', JSON.stringify(localTickets));
      } else {
        const defaultIssuesUpvotes = JSON.parse(localStorage.getItem('community_default_issues_upvotes')) || {};
        defaultIssuesUpvotes[ticket.id] = (defaultIssuesUpvotes[ticket.id] || 0) + 1;
        localStorage.setItem('community_default_issues_upvotes', JSON.stringify(defaultIssuesUpvotes));
      }

      const newLog = {
        id: `log-${Date.now()}`,
        location: ticket.location,
        time: 'JUST NOW',
        desc: `Community upvote recorded for <span class="font-bold">Issue #${ticket.id} (${ticket.title})</span>. Total upvotes: <span class="font-bold">${ticket.upvotes}</span>.`,
        tag: 'UPDATE',
        type: 'update'
      };
      activityLogs.unshift(newLog);
      localLogs.unshift(newLog);
      localStorage.setItem('community_custom_activity_logs', JSON.stringify(localLogs));
      updateUI();
    });
  }

  const resolveBtn = document.getElementById('btn-resolve-issue-mock');
  if (resolveBtn) {
    resolveBtn.addEventListener('click', () => {
      ticket.status = 'RESOLVED';
      ticket.resolvedDate = new Date().toISOString();
      ticket.timeline.push({
        title: 'Resolved Verification: marked fixed',
        time: 'Just now',
        complete: true
      });
      
      const newLog = {
        id: `log-${Date.now()}`,
        location: ticket.location,
        time: 'JUST NOW',
        desc: `Municipal Maintenance Team marked <span class="font-bold">Issue #${ticket.id} (${ticket.title})</span> as <span class="font-bold">RESOLVED</span>. Verification: marked fixed.`,
        tag: 'RESOLVED',
        type: 'resolved'
      };
      activityLogs.unshift(newLog);

      const customIdx = localTickets.findIndex(i => i.id === ticket.id);
      if (customIdx !== -1) {
        localTickets[customIdx].status = 'RESOLVED';
        localTickets[customIdx].resolvedDate = ticket.resolvedDate;
        localTickets[customIdx].timeline = ticket.timeline;
        localStorage.setItem('community_custom_issues', JSON.stringify(localTickets));
      }

      localLogs.unshift(newLog);
      localStorage.setItem('community_custom_activity_logs', JSON.stringify(localLogs));

      updateUI();
    });
  }

  const toggleHistoryPinBtn = document.getElementById('btn-toggle-history-pin');
  if (toggleHistoryPinBtn) {
    toggleHistoryPinBtn.addEventListener('click', () => {
      if (!appStore.pinnedHistoryIds) {
        appStore.pinnedHistoryIds = [];
      }
      const idx = appStore.pinnedHistoryIds.indexOf(ticket.id);
      if (idx === -1) {
        appStore.pinnedHistoryIds.push(ticket.id);
      } else {
        appStore.pinnedHistoryIds.splice(idx, 1);
      }
      localStorage.setItem('community_forced_history_pins', JSON.stringify(appStore.pinnedHistoryIds));
      drawMapPins();
      drawTrackingDetail();
    });
  }
}
