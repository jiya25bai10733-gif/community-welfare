// ==========================================
// FMC CITIZEN HELPLINE PORTAL - CLIENT STORE
// ==========================================

// Global state holding municipal complaints
const fmc_store = {
  activeTab: 'dashboard',
  tickets: [
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
  focus_ticket_id: '1245',
  feed_filter: 'all',
  search_q: '',
  map_zoom: 14,
  upvoted_registry: [],
  pin_overrides: []
};

// Activity logs feed synced with FMC actions
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

// Leaflet global instances
let dashboardMapInstance = null;
let interactiveMapInstance = null;

// Leaflet active marker caches
let dashboardMarkers = [];
let interactiveMarkers = [];
let placementMarker = null;

let cityCenter = [28.4089, 77.3178]; // Faridabad sector 15 as base fallback

// Local caches
let customIssues = [];
let customLogs = [];
let uploadedImageBase64 = null;

// Bootstrap FMC App
document.addEventListener('DOMContentLoaded', () => {
  restore_local_cache();
  monitor_network_health();
  prefill_default_coords();
  init_tabs();
  bind_ticket_form_actions();
  init_filter_controls();
  bind_map_controls();
  bootstrap_leaflet_maps();
  acquire_user_gps();
  init_photon_typeahead();
  sync_ui_elements();
});

// Restore localStorage Cache
function restore_local_cache() {
  try {
    customIssues = JSON.parse(localStorage.getItem('community_custom_issues')) || [];
    customLogs = JSON.parse(localStorage.getItem('community_custom_activity_logs')) || [];
    fmc_store.upvoted_registry = JSON.parse(localStorage.getItem('community_upvoted_issues')) || [];
    fmc_store.pin_overrides = JSON.parse(localStorage.getItem('community_forced_history_pins')) || [];
    
    // Default tickets upvote restorator
    const cachedUpvotes = JSON.parse(localStorage.getItem('community_default_issues_upvotes')) || {};
    fmc_store.tickets.forEach(t => {
      if (cachedUpvotes[t.id]) {
        t.upvotes = (t.upvotes || 0) + cachedUpvotes[t.id];
      }
    });
  } catch (err) {
    console.warn("Local storage cache corrupted, resetting to defaults.", err);
  }

  fmc_store.tickets = [...customIssues, ...fmc_store.tickets];
  activityLogs = [...customLogs, ...activityLogs];
}

// Watch browser network health
function monitor_network_health() {
  const statusEl = document.getElementById('connection-status');
  if (!statusEl) return;

  const updateNetworkStatus = () => {
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

  window.addEventListener('online', updateNetworkStatus);
  window.addEventListener('offline', updateNetworkStatus);
  updateNetworkStatus(); // trigger baseline check
}

// Set form default coordinates
function prefill_default_coords() {
  const latField = document.getElementById('issue-lat');
  const lngField = document.getElementById('issue-lng');
  if (latField) latField.value = cityCenter[0].toFixed(5);
  if (lngField) lngField.value = cityCenter[1].toFixed(5);
}

// Photon typeahead for address suggestions
function init_photon_typeahead() {
  const inputEl = document.getElementById('issue-location');
  const dropdownEl = document.getElementById('location-autocomplete-dropdown');
  if (!inputEl || !dropdownEl) return;

  let debounceTimer = null;

  inputEl.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    clearTimeout(debounceTimer);

    if (query.length < 3) {
      dropdownEl.style.display = 'none';
      dropdownEl.innerHTML = '';
      return;
    }

    debounceTimer = setTimeout(() => {
      let url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`;
      if (cityCenter && cityCenter.length === 2) {
        url += `&lat=${cityCenter[0]}&lon=${cityCenter[1]}`;
      }

      fetch(url)
        .then(res => {
          if (!res.ok) throw new Error("Photon lookup failed");
          return res.json();
        })
        .then(data => {
          draw_typeahead_options(data.features || [], inputEl, dropdownEl);
        })
        .catch(err => {
          console.warn("Photon autocomplete API rate limit or outage, fallback geocode on blur.", err);
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

  // Geocode on blur to ensure form is always populated
  inputEl.addEventListener('blur', () => {
    setTimeout(() => {
      const locationText = inputEl.value.trim();
      if (!locationText) return;

      const latField = document.getElementById('issue-lat');
      const hasCoords = latField && latField.value;

      if (!hasCoords) {
        let url = `https://photon.komoot.io/api/?q=${encodeURIComponent(locationText)}&limit=1`;
        if (cityCenter && cityCenter.length === 2) {
          url += `&lat=${cityCenter[0]}&lon=${cityCenter[1]}`;
        }
        fetch(url)
          .then(res => res.json())
          .then(data => {
            if (data.features && data.features.length > 0) {
              const feat = data.features[0];
              const coords = feat.geometry.coordinates;
              const lat = coords[1];
              const lng = coords[0];
              
              const latEl = document.getElementById('issue-lat');
              const lngEl = document.getElementById('issue-lng');
              if (latEl) latEl.value = lat.toFixed(5);
              if (lngEl) lngEl.value = lng.toFixed(5);

              place_draft_marker(lat, lng, false, true);
            }
          })
          .catch(err => console.warn("Fallback geocoder on blur failed:", err));
      }
    }, 300);
  });

  // Geocode on Enter
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const locationText = inputEl.value.trim();
      if (!locationText) return;

      let url = `https://photon.komoot.io/api/?q=${encodeURIComponent(locationText)}&limit=1`;
      if (cityCenter && cityCenter.length === 2) {
        url += `&lat=${cityCenter[0]}&lon=${cityCenter[1]}`;
      }
      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.features && data.features.length > 0) {
            const feat = data.features[0];
            const coords = feat.geometry.coordinates;
            const lat = coords[1];
            const lng = coords[0];
            
            const latEl = document.getElementById('issue-lat');
            const lngEl = document.getElementById('issue-lng');
            if (latEl) latEl.value = lat.toFixed(5);
            if (lngEl) lngEl.value = lng.toFixed(5);

            place_draft_marker(lat, lng, true, true);
            dropdownEl.style.display = 'none';
          }
        })
        .catch(err => console.warn("Enter key geocoder failed:", err));
    }
  });
}

// Render autocomplete dropdown options
function draw_typeahead_options(features, inputEl, dropdownEl) {
  dropdownEl.innerHTML = '';
  if (features.length === 0) {
    dropdownEl.style.display = 'none';
    return;
  }

  features.forEach(feat => {
    const props = feat.properties || {};
    const geom = feat.geometry || {};
    const coords = geom.coordinates || [];

    if (coords.length < 2) return;

    const name = props.name || '';
    const street = props.street || '';
    const city = props.city || props.state || '';
    const labelText = [name, street, city].filter(Boolean).join(', ');

    if (!labelText) return;

    const div = document.createElement('div');
    div.className = 'autocomplete-item';
    div.textContent = labelText;
    
    div.addEventListener('click', () => {
      inputEl.value = labelText;
      dropdownEl.style.display = 'none';

      const lat = coords[1];
      const lng = coords[0];

      const latField = document.getElementById('issue-lat');
      const lngField = document.getElementById('issue-lng');
      if (latField) latField.value = lat.toFixed(5);
      if (lngField) lngField.value = lng.toFixed(5);

      place_draft_marker(lat, lng, true, true);
    });

    dropdownEl.appendChild(div);
  });

  dropdownEl.style.display = 'block';
}

// Acquire browser location
function acquire_user_gps() {
  if (!navigator.geolocation) {
    console.warn("Geolocation unsupported by host browser. Falling back to default.");
    trigger_fallback_gps();
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
      
      cityCenter = [lat, lng];
      prefill_default_coords();
      realign_tickets_to_coords(lat, lng);
      pan_map_cameras(lat, lng);
      run_osm_reverse_lookup(lat, lng);
    },
    (err) => {
      console.warn(`Geolocation lookup rejected/timed out (code: ${err.code}). Reverting to FMC Sector 15.`, err.message);
      trigger_fallback_gps();
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
  );
}

// Fallback to Faridabad Sector 15 baseline
function trigger_fallback_gps() {
  cityCenter = [28.4089, 77.3178];
  prefill_default_coords();
  realign_tickets_to_coords(cityCenter[0], cityCenter[1]);
  pan_map_cameras(cityCenter[0], cityCenter[1]);
  update_localized_ui_strings("Faridabad", "Sector 15", "Mathura Road");
}

// Realign mock tickets relative to current location via offsets
function realign_tickets_to_coords(lat, lng) {
  const offsets = {
    '1248': { dLat: 0.0061, dLng: -0.0038 },
    '1245': { dLat: 0.0021, dLng: 0.0012 },
    '1246': { dLat: 0.0141, dLng: -0.0158 },
    '1244': { dLat: -0.0069, dLng: -0.0018 },
    '1254': { dLat: -0.0109, dLng: 0.0032 }
  };
  
  fmc_store.tickets.forEach(ticket => {
    const offset = offsets[ticket.id];
    if (offset) {
      ticket.coordinates = {
        lat: lat + offset.dLat,
        lng: lng + offset.dLng
      };
    }
  });
}

// Pan cameras of both map objects
function pan_map_cameras(lat, lng) {
  if (dashboardMapInstance) {
    dashboardMapInstance.setView([lat, lng], 13);
  }
  if (interactiveMapInstance) {
    interactiveMapInstance.setView([lat, lng], fmc_store.map_zoom);
  }
}

// Reverse Geocoding with OSM Nominatim API
function run_osm_reverse_lookup(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
  
  fetch(url, { headers: { 'Accept-Language': 'en' } })
    .then(res => {
      if (!res.ok) throw new Error("OSM Nominatim rate limit/outage");
      return res.json();
    })
    .then(data => {
      const addr = data.address || {};
      const city = addr.city || addr.town || addr.village || addr.municipality || addr.county || 'Local Area';
      const suburb = addr.suburb || addr.neighbourhood || addr.quarter || addr.city_district || addr.road || 'Local Suburb';
      const road = addr.road || addr.pedestrian || suburb || 'Main Road';
      
      update_localized_ui_strings(city, suburb, road);
    })
    .catch(err => {
      console.warn("Reverse lookup failed, applying coordinates format fallback.", err);
      update_localized_ui_strings("Local Area", `Sector [${lat.toFixed(3)}, ${lng.toFixed(3)}]`, "Service Lane");
    });
}

// Rewrite location references in UI strings to make it feel local
function update_localized_ui_strings(city, suburb, road) {
  const subtextEl = document.getElementById('dashboard-map-subtext');
  if (subtextEl) {
    subtextEl.textContent = `Interactive City Map: View Reported Issues in ${city}`;
  }
  
  const profileLocEl = document.getElementById('profile-location-text');
  if (profileLocEl) {
    profileLocEl.textContent = `${city} Resident • ${suburb}`;
  }
  
  fmc_store.tickets.forEach(ticket => {
    if (ticket.id === '1248') ticket.location = `${suburb} Market Road`;
    else if (ticket.id === '1245') ticket.location = `${suburb} Central Road`;
    else if (ticket.id === '1246') ticket.location = `${suburb} Residential Area`;
    else if (ticket.id === '1244') ticket.location = `${road} Metro Station Pillar`;
    else if (ticket.id === '1254') ticket.location = `${road} Service Lane`;
  });

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

  sync_ui_elements();
}

// Leaflet map instantiators
function bootstrap_leaflet_maps() {
  const mapTemplate = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
  const attrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  const mapElDash = document.getElementById('dashboard-map');
  if (mapElDash && !dashboardMapInstance) {
    dashboardMapInstance = L.map('dashboard-map', {
      zoomControl: false,
      doubleClickZoom: false,
      boxZoom: false,
      dragPan: false,
      keyboard: false,
      scrollWheelZoom: false
    }).setView(cityCenter, 13);

    L.tileLayer(mapTemplate, { attribution: attrib }).addTo(dashboardMapInstance);

    mapElDash.addEventListener('click', () => {
      switchTab('map');
    });
  }

  const mapElInteractive = document.getElementById('interactive-map');
  if (mapElInteractive && !interactiveMapInstance) {
    interactiveMapInstance = L.map('interactive-map', {
      doubleClickZoom: false
    }).setView(cityCenter, fmc_store.map_zoom);

    L.tileLayer(mapTemplate, { attribution: attrib }).addTo(interactiveMapInstance);
  }
}

// Places a temporary draft marker representing the new report coordinates
function place_draft_marker(lat, lng, showToast = false, panMap = true) {
  if (!interactiveMapInstance) return;

  if (placementMarker) {
    interactiveMapInstance.removeLayer(placementMarker);
  }

  const pinIcon = L.divIcon({
    className: 'custom-leaflet-marker',
    html: '<div class="marker-pin active-new" style="background-color: #8b5cf6; border-color: #8b5cf6;"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  placementMarker = L.marker([lat, lng], { icon: pinIcon }).addTo(interactiveMapInstance);

  if (panMap) {
    interactiveMapInstance.setView([lat, lng], 15);
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

// Navigation Tabs Manager
function init_tab_navigation() {
  const triggers = document.querySelectorAll('.lnk_nav');
  triggers.forEach(link => {
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

  const reportRedirect = document.getElementById('btn-report-redirect');
  if (reportRedirect) {
    reportRedirect.addEventListener('click', () => {
      switchTab('report');
    });
  }
}

// Toggle active view panel
function toggle_active_tab(targetTabId) {
  fmc_store.activeTab = targetTabId;

  const links = document.querySelectorAll('.lnk_nav');
  links.forEach(l => {
    if (l.getAttribute('data-target') === targetTabId) {
      l.classList.add('active');
    } else {
      l.classList.remove('active');
    }
  });

  const pages = document.querySelectorAll('.view-panel');
  pages.forEach(p => {
    if (p.getAttribute('id') === `view-${targetTabId}`) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });

  if (targetTabId === 'map') {
    setTimeout(() => {
      if (interactiveMapInstance) {
        interactiveMapInstance.invalidateSize();
        // Snap back to user center if no issue is selected
        if (!fmc_store.focus_ticket_id && cityCenter) {
          interactiveMapInstance.setView(cityCenter, fmc_store.map_zoom);
        }
      }
    }, 100);
  }
  
  if (targetTabId === 'dashboard') {
    setTimeout(() => {
      if (dashboardMapInstance) {
        dashboardMapInstance.invalidateSize();
        if (cityCenter) {
          dashboardMapInstance.setView(cityCenter, 13);
        }
      }
    }, 100);
  }

  sync_ui_elements();
}

// Bind file uploads & ticket form submit actions
function bind_ticket_form_actions() {
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
        process_attached_file(files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        process_attached_file(e.target.files[0]);
      }
    });
  }

  function process_attached_file(file) {
    if (!file.type.match('image.*')) {
      alert("Invalid file format. Please upload an image (PNG, JPG, GIF).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImageBase64 = e.target.result;
      if (previewContainer) {
        previewContainer.style.display = 'block';
        previewContainer.textContent = `Screenshot attached: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      }
    };
    reader.readAsDataURL(file);
  }

  // Form Submit Handler
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

      if (!category || !title || !locationName || isNaN(lat) || isNaN(lng) || !description) {
        alert("Validation error: All form fields are required.");
        return;
      }

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
        reportedTime: 'Just now',
        reportedDate: formattedDate,
        reporter: 'Resident User #402',
        coordinates: { lat, lng },
        upvotes: 0,
        timeline: [
          { title: 'Report Logged', time: 'Just now', complete: true },
          { title: 'Verification Assigned', time: 'Pending', complete: false }
        ]
      };

      if (uploadedImageBase64) {
        newTicket.imageBase64 = uploadedImageBase64;
      }

      // Append to local caches & localStorage
      customIssues.unshift(newTicket);
      localStorage.setItem('community_custom_issues', JSON.stringify(customIssues));

      const newLog = {
        id: `log-${Date.now()}`,
        location: locationName,
        time: 'JUST NOW',
        desc: `New complaint ticket <span class="font-bold">#${ticket_id} (${title})</span> filed under ${category}. Status is OPEN.`,
        tag: 'NEW',
        type: 'new'
      };

      customLogs.unshift(newLog);
      localStorage.setItem('community_custom_activity_logs', JSON.stringify(customLogs));
      activityLogs.unshift(newLog);

      // Prepend to runtime state
      fmc_store.tickets.unshift(newTicket);
      fmc_store.focus_ticket_id = ticket_id;

      // Reset form variables
      form.reset();
      uploadedImageBase64 = null;
      if (previewContainer) {
        previewContainer.style.display = 'none';
        previewContainer.textContent = '';
      }
      if (placementMarker && interactiveMapInstance) {
        interactiveMapInstance.removeLayer(placementMarker);
        placementMarker = null;
      }
      prefill_default_coords();

      // UI Sync
      toggle_active_tab('dashboard');
    });
  }

  const cancelBtn = document.getElementById('btn-cancel-report');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      if (form) form.reset();
      uploadedImageBase64 = null;
      if (previewContainer) {
        previewContainer.style.display = 'none';
        previewContainer.textContent = '';
      }
      prefill_default_coords();
      toggle_active_tab('dashboard');
    });
  }
}

// Bind Map Controls
function bind_map_controls() {
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

// Filter and Search Actions Setup
function init_filter_controls() {
  const searchInput = document.getElementById('global-search');
  const searchDropdown = document.getElementById('search-suggestions-dropdown');
  if (searchInput && searchDropdown) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      fmc_store.search_q = query;
      
      populate_ticket_grid();

      if (!query) {
        searchDropdown.style.display = 'none';
        searchDropdown.innerHTML = '';
        return;
      }

      // Query parser matching tickets
      const matches = fmc_store.tickets.filter(t => 
        t.title.toLowerCase().includes(query) || 
        t.description.toLowerCase().includes(query) || 
        t.location.toLowerCase().includes(query) || 
        t.id.includes(query)
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
        item.className = 'autocomplete-item';
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
          fmc_store.search_q = '';
          searchDropdown.style.display = 'none';
          
          fmc_store.focus_ticket_id = ticket.id;
          toggle_active_tab('map');
          populate_ticket_grid();
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
      populate_ticket_grid();
    });
  }

  const filterCategory = document.getElementById('table-filter-category');
  if (filterCategory) {
    filterCategory.addEventListener('change', () => {
      populate_ticket_grid();
    });
  }

  // Export Reports Button Trigger
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

      const rows = fmc_store.tickets.map(t => {
        const lat = t.coordinates ? t.coordinates.lat : '';
        const lng = t.coordinates ? t.coordinates.lng : '';
        return [
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
        ].join(',');
      });

      // Inject UTF-8 BOM so MS Excel renders Hindi & unicode symbols correctly
      const csvContent = '\uFEFF' + headers.join(',') + '\n' + rows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", url);
      downloadAnchor.setAttribute("download", `fmc_community_reports_${Date.now()}.csv`);
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
      fmc_store.feed_filter = tab.getAttribute('data-filter');
      draw_live_action_feed();
    });
  });
}

// Master coordinator to update UI components
function sync_ui_elements() {
  recalculate_dashboard_metrics();
  populate_ticket_grid();
  draw_active_ticket_queue();
  draw_live_action_feed();
  draw_my_reports_list();
  refresh_map_views();
}

// Recalculate stats counters
function recalculate_dashboard_metrics() {
  const userReported = fmc_store.tickets.filter(t => t.reporter === 'Resident User #402').length;
  const userResolved = fmc_store.tickets.filter(t => t.reporter === 'Resident User #402' && (t.status === 'RESOLVED' || t.status === 'CLOSED')).length;

  const reportedEl = document.getElementById('profile-reported-count');
  if (reportedEl) reportedEl.textContent = userReported;

  const resolvedEl = document.getElementById('profile-resolved-count');
  if (resolvedEl) resolvedEl.textContent = userResolved;

  const totalReports = fmc_store.tickets.length;
  const resolvedReports = fmc_store.tickets.filter(t => t.status === 'RESOLVED' || t.status === 'CLOSED').length;
  const openReports = fmc_store.tickets.filter(t => t.status === 'OPEN').length;
  const pendingReports = fmc_store.tickets.filter(t => t.status === 'PENDING' || t.status === 'IN PROGRESS').length;

  const totalEl = document.getElementById('stats-total-count');
  if (totalEl) totalEl.textContent = totalReports;

  const resolvedSysEl = document.getElementById('stats-resolved-count');
  if (resolvedSysEl) resolvedSysEl.textContent = resolvedReports;

  const openEl = document.getElementById('stats-open-count');
  if (openEl) openEl.textContent = openReports;

  const pendingEl = document.getElementById('stats-pending-count');
  if (pendingEl) pendingEl.textContent = pendingReports;
}

// CSS Badges color mapper
function get_status_badge_css(status) {
  switch (status) {
    case 'OPEN': return 'badge-open';
    case 'PENDING':
    case 'IN PROGRESS': return 'badge-pending';
    case 'CLOSED': return 'badge-closed';
    case 'RESOLVED': return 'badge-resolved';
    default: return 'badge-open';
  }
}

// Filter tickets dataset based on filters & search query
function filter_ticket_dataset() {
  const statusFilterEl = document.getElementById('table-filter-status');
  const categoryFilterEl = document.getElementById('table-filter-category');

  const statusFilter = statusFilterEl ? statusFilterEl.value : 'all';
  const categoryFilter = categoryFilterEl ? categoryFilterEl.value : 'all';

  return fmc_store.tickets.filter(ticket => {
    // Status filter
    if (statusFilter !== 'all') {
      if (statusFilter === 'PENDING') {
        if (ticket.status !== 'PENDING' && ticket.status !== 'IN PROGRESS') return false;
      } else if (ticket.status !== statusFilter) {
        return false;
      }
    }

    // Category filter
    if (categoryFilter !== 'all' && ticket.category !== categoryFilter) {
      return false;
    }

    // Search query matching
    if (fmc_store.search_q) {
      const q = fmc_store.search_q;
      const titleMatch = ticket.title.toLowerCase().includes(q);
      const descMatch = ticket.description.toLowerCase().includes(q);
      const locMatch = ticket.location.toLowerCase().includes(q);
      const idMatch = ticket.id.includes(q);
      if (!titleMatch && !descMatch && !locMatch && !idMatch) return false;
    }

    return true;
  });
}

// Populate ticket rows on Dashboard grid
function populate_ticket_grid() {
  const tbody = document.getElementById('issues-table-body');
  if (!tbody) return;

  const filtered = filter_ticket_dataset();
  tbody.innerHTML = '';
  
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #666666; padding: 20px;">No reports match the filters.</td></tr>`;
    return;
  }

  filtered.forEach(ticket => {
    const isResolvedOrClosed = ticket.status === 'RESOLVED' || ticket.status === 'CLOSED';
    let isOlderThan5Days = false;
    if (isResolvedOrClosed && ticket.resolvedDate) {
      const resolvedTime = new Date(ticket.resolvedDate).getTime();
      const currentTime = new Date().getTime();
      const diffDays = (currentTime - resolvedTime) / (1000 * 60 * 60 * 24);
      isOlderThan5Days = diffDays > 5;
    }
    const hasPin = fmc_store.pin_overrides && fmc_store.pin_overrides.includes(ticket.id);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="issue-id-cell" data-id="${ticket.id}">#${ticket.id}</td>
      <td>${ticket.title} - ${ticket.description}</td>
      <td>${ticket.location}</td>
      <td>${ticket.category}</td>
      <td>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="status-badge ${get_status_badge_css(ticket.status)}">${ticket.status}</span>
          ${isOlderThan5Days ? `
            <button class="btn-toggle-table-pin" data-id="${ticket.id}" style="background: #ffffff; border: 1.5px solid #888888; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; padding: 0; border-radius: 4px; box-shadow: 1px 1px 0px #000000; outline: none;" title="${hasPin ? 'Remove Pin from Map' : 'Show Pin on Map'}">
              <i class="ti ${hasPin ? 'ti-map-pin-off' : 'ti-map-pin'}" style="font-size: 10px; color: #000000; font-weight: bold;"></i>
            </button>
          ` : ''}
        </div>
      </td>
    `;

    // Click ticket ID cell to load in map tab
    const cell = tr.querySelector('.issue-id-cell');
    if (cell) {
      cell.addEventListener('click', () => {
        fmc_store.focus_ticket_id = ticket.id;
        toggle_active_tab('map');
      });
    }

    // Toggle Pin button next to status badges
    if (isOlderThan5Days) {
      const pinBtn = tr.querySelector('.btn-toggle-table-pin');
      if (pinBtn) {
        pinBtn.addEventListener('click', (e) => {
          e.stopPropagation(); // Avoid triggering cell click redirection
          if (!fmc_store.pin_overrides) {
            fmc_store.pin_overrides = [];
          }
          const idx = fmc_store.pin_overrides.indexOf(ticket.id);
          if (idx === -1) {
            fmc_store.pin_overrides.push(ticket.id);
          } else {
            fmc_store.pin_overrides.splice(idx, 1);
          }
          localStorage.setItem('community_forced_history_pins', JSON.stringify(fmc_store.pin_overrides));
          
          render_leaflet_pins();
          populate_ticket_grid();
        });
      }
    }

    tbody.appendChild(tr);
  });
}

// Populate homepage Active Issues Sidebar
function draw_active_ticket_queue() {
  const listContainer = document.getElementById('active-issues-list');
  if (!listContainer) return;

  listContainer.innerHTML = '';

  let activeCount = 0;

  fmc_store.tickets.forEach(ticket => {
    if (ticket.status === 'RESOLVED' || ticket.status === 'CLOSED') {
      return; // active list only shows unresolved issues
    }
    activeCount++;

    const item = document.createElement('div');
    item.className = 'sidebar-item';
    
    item.innerHTML = `
      <div class="sidebar-item-header">
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="width:16px; height:16px; border-radius:50%; border:1.5px solid #888888; display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:bold; color:#666666;">X</div>
          <span class="sidebar-item-title">${ticket.title}</span>
        </div>
        <span class="sidebar-item-time">${ticket.reportedTime}</span>
      </div>
      <div style="font-size: 11px; color: #666666; margin-left: 24px;">${ticket.location}</div>
      <div class="sidebar-item-desc" style="margin-left: 24px;">${ticket.description}</div>
      <div style="margin-top: 12px; margin-left: 24px; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:11px; color:#666666;">Report #${ticket.id}</span>
        <span class="status-badge ${get_status_badge_css(ticket.status)}" style="font-size: 9px; min-width: 65px; padding: 1px 4px;">${ticket.status}</span>
      </div>
    `;

    item.addEventListener('click', () => {
      fmc_store.focus_ticket_id = ticket.id;
      toggle_active_tab('map');
    });

    listContainer.appendChild(item);
  });

  if (activeCount === 0) {
    listContainer.innerHTML = '<div style="text-align:center; padding:20px; color:#666666; font-size:11px;">No active unresolved tickets in this region.</div>';
  }
}

// Render User Profile Reports List
function draw_my_reports_list() {
  const container = document.getElementById('profile-issues-list');
  if (!container) return;

  const userIssues = fmc_store.tickets.filter(t => t.reporter === 'Resident User #402');
  container.innerHTML = '';

  if (userIssues.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:20px; color:#666666;">You have not filed any reports yet.</div>`;
    return;
  }

  userIssues.forEach(ticket => {
    const card = document.createElement('div');
    card.className = 'white-card';
    card.style.padding = '16px';
    card.style.cursor = 'pointer';
    
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #d1d5db; padding-bottom:8px; margin-bottom:8px;">
        <span style="font-weight:bold; font-family:'JetBrains Mono', monospace; font-size:12px;">#${ticket.id}</span>
        <span class="status-badge ${get_status_badge_css(ticket.status)}" style="font-size: 8px; min-width:55px; padding:1px 3px;">${ticket.status}</span>
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
      fmc_store.focus_ticket_id = ticket.id;
      toggle_active_tab('map');
    });

    container.appendChild(card);
  });
}

// Populate Live Activity Feed list
function draw_live_action_feed() {
  const container = document.getElementById('activity-feed-list');
  if (!container) return;

  container.innerHTML = '';

  let filtered = activityLogs;
  if (fmc_store.feed_filter !== 'all') {
    filtered = activityLogs.filter(log => log.type === fmc_store.feed_filter);
  }

  filtered.forEach(log => {
    const card = document.createElement('article');
    card.className = 'activity-card';

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
        <header class="activity-meta">
          <span class="activity-location">${log.location}</span>
          <span class="activity-time">${log.time}</span>
        </header>
        <p class="activity-desc">${log.desc}</p>
      </div>
    `;

    // Timeline ticket link reference trigger
    const refLink = card.querySelector('.activity-desc span.font-bold');
    if (refLink && refLink.textContent.includes('#')) {
      refLink.style.cursor = 'pointer';
      refLink.style.textDecoration = 'underline';
      
      refLink.addEventListener('click', () => {
        const idMatch = refLink.textContent.match(/#(\d+)/);
        if (idMatch && idMatch[1]) {
          fmc_store.focus_ticket_id = idMatch[1];
          toggle_active_tab('map');
        }
      });
    }

    container.appendChild(card);
  });
}

// Master map synchronizer
function refresh_map_views() {
  if (!dashboardMapInstance || !interactiveMapInstance) return;
  render_leaflet_pins();
  render_tracking_detail_card();
}

// Expiration validator logic for resolved pins
function validate_pin_expiry(ticket) {
  if (ticket.status !== 'RESOLVED' && ticket.status !== 'CLOSED') {
    return true; // active issues always render
  }
  // Check override toggle
  if (fmc_store.pin_overrides && fmc_store.pin_overrides.includes(ticket.id)) {
    return true;
  }
  if (!ticket.resolvedDate) {
    return true; // fallback
  }
  const resolvedTime = new Date(ticket.resolvedDate).getTime();
  const currentTime = new Date().getTime();
  const diffDays = (currentTime - resolvedTime) / (1000 * 60 * 60 * 24);
  return diffDays <= 5;
}

// Render active pins on maps
function render_leaflet_pins() {
  dashboardMarkers.forEach(m => dashboardMapInstance.removeLayer(m));
  interactiveMarkers.forEach(m => interactiveMapInstance.removeLayer(m));
  
  dashboardMarkers = [];
  interactiveMarkers = [];

  fmc_store.tickets.forEach(ticket => {
    // Hide markers if resolved more than 5 days ago and not overridden
    if (!validate_pin_expiry(ticket)) {
      return;
    }

    let pinType = 'active-new';
    if (ticket.status === 'IN PROGRESS') pinType = 'in-progress';
    else if (ticket.status === 'RESOLVED' || ticket.status === 'CLOSED') pinType = 'resolved';

    const customIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `<div class="marker-pin ${pinType}"></div><div class="marker-label">#${ticket.id}:<br>${ticket.title.split(' ')[0]}</div>`,
      iconSize: [40, 48],
      iconAnchor: [7, 7]
    });

    const miniIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `<div class="marker-pin ${pinType}" style="transform: scale(0.75);"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });

    if (interactiveMapInstance) {
      const marker = L.marker([ticket.coordinates.lat, ticket.coordinates.lng], { icon: customIcon })
        .addTo(interactiveMapInstance);
      
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        fmc_store.focus_ticket_id = ticket.id;
        interactiveMapInstance.setView([ticket.coordinates.lat, ticket.coordinates.lng], 16);
        render_tracking_detail_card();
      });

      interactiveMarkers.push(marker);
    }

    if (dashboardMapInstance) {
      const marker = L.marker([ticket.coordinates.lat, ticket.coordinates.lng], { icon: miniIcon })
        .addTo(dashboardMapInstance);
      
      dashboardMarkers.push(marker);
    }
  });

  // User location marker
  if (cityCenter) {
    const userLocationIcon = L.divIcon({
      className: 'custom-leaflet-marker user-location-marker-container',
      html: `<div class="marker-pin user-location"></div><div class="marker-label" style="background-color: #3b82f6; color: #ffffff; border-color: #3b82f6; font-weight: bold; font-family: 'JetBrains Mono', monospace; font-size: 9px; padding: 1px 4px;">YOU</div>`,
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

  // Snap map tab camera to selected ticket
  if (fmc_store.activeTab === 'map' && fmc_store.focus_ticket_id) {
    const selected = fmc_store.tickets.find(t => t.id === fmc_store.focus_ticket_id);
    if (selected && interactiveMapInstance) {
      interactiveMapInstance.setView([selected.coordinates.lat, selected.coordinates.lng], 16);
    }
  }
}

// Render tracking detail card in map sidebar
function render_tracking_detail_card() {
  const panel = document.getElementById('tracking-detail-panel');
  if (!panel) return;

  const ticket = fmc_store.tickets.find(t => t.id === fmc_store.focus_ticket_id);
  
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
  ticket.timeline.forEach((step, index) => {
    const isCompleted = step.complete;
    const dotClass = isCompleted ? (ticket.status === 'IN PROGRESS' && index === 1 ? 'in-progress' : 'complete') : 'pending';
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
    
    <div class="tracking-timeline">
      ${timelineStepsHTML}
    </div>
    
    ${ticket.status !== 'RESOLVED' && ticket.status !== 'CLOSED' ? `
      <div style="margin-top: auto; padding-top: 24px; display:flex; gap:8px;">
        <button class="btn btn-secondary" id="btn-upvote-issue" style="flex:1;" ${fmc_store.upvoted_registry.includes(ticket.id) ? 'disabled' : ''}>
          ${fmc_store.upvoted_registry.includes(ticket.id) ? 'Upvoted' : 'Upvote'}
        </button>
        <button class="btn btn-primary" id="btn-resolve-issue-mock" style="flex:1;">
          Resolve
        </button>
      </div>
    ` : (() => {
      const isResolvedOrClosed = ticket.status === 'RESOLVED' || ticket.status === 'CLOSED';
      let isOlderThan5Days = false;
      if (isResolvedOrClosed && ticket.resolvedDate) {
        const resolvedTime = new Date(ticket.resolvedDate).getTime();
        const currentTime = new Date().getTime();
        const diffDays = (currentTime - resolvedTime) / (1000 * 60 * 60 * 24);
        isOlderThan5Days = diffDays > 5;
      }
      if (isOlderThan5Days) {
        const hasPin = fmc_store.pin_overrides && fmc_store.pin_overrides.includes(ticket.id);
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

  // Bind panel button actions
  const upvoteBtn = document.getElementById('btn-upvote-issue');
  if (upvoteBtn) {
    upvoteBtn.addEventListener('click', () => {
      ticket.upvotes = (ticket.upvotes || 0) + 1;
      
      const countEl = document.getElementById('issue-upvotes-count');
      if (countEl) countEl.textContent = ticket.upvotes;
      
      upvoteBtn.disabled = true;
      upvoteBtn.textContent = 'Upvoted';

      if (!fmc_store.upvoted_registry.includes(ticket.id)) {
        fmc_store.upvoted_registry.push(ticket.id);
        localStorage.setItem('community_upvoted_issues', JSON.stringify(fmc_store.upvoted_registry));
      }

      const customIdx = customIssues.findIndex(i => i.id === ticket.id);
      if (customIdx !== -1) {
        customIssues[customIdx].upvotes = ticket.upvotes;
        localStorage.setItem('community_custom_issues', JSON.stringify(customIssues));
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
      customLogs.unshift(newLog);
      localStorage.setItem('community_custom_activity_logs', JSON.stringify(customLogs));
      sync_ui_elements();
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

      const customIdx = customIssues.findIndex(i => i.id === ticket.id);
      if (customIdx !== -1) {
        customIssues[customIdx].status = 'RESOLVED';
        customIssues[customIdx].resolvedDate = ticket.resolvedDate;
        customIssues[customIdx].timeline = ticket.timeline;
        localStorage.setItem('community_custom_issues', JSON.stringify(customIssues));
      }

      customLogs.unshift(newLog);
      localStorage.setItem('community_custom_activity_logs', JSON.stringify(customLogs));

      sync_ui_elements();
    });
  }

  const toggleHistoryPinBtn = document.getElementById('btn-toggle-history-pin');
  if (toggleHistoryPinBtn) {
    toggleHistoryPinBtn.addEventListener('click', () => {
      if (!fmc_store.pin_overrides) {
        fmc_store.pin_overrides = [];
      }
      const idx = fmc_store.pin_overrides.indexOf(ticket.id);
      if (idx === -1) {
        fmc_store.pin_overrides.push(ticket.id);
      } else {
        fmc_store.pin_overrides.splice(idx, 1);
      }
      localStorage.setItem('community_forced_history_pins', JSON.stringify(fmc_store.pin_overrides));
      render_leaflet_pins();
      render_tracking_detail_card();
    });
  }
}
