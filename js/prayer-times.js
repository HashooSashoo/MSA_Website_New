// Rice MSA Website - Prayer Times API Integration
// Using Aladhan API for accurate prayer times

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // CONFIGURATION
    // ============================================

    // Rice University coordinates (Houston, TX)
    const LOCATION = {
        latitude: 29.7174,
        longitude: -95.4018,
        city: 'Houston',
        country: 'USA'
    };

    // Default settings
    const DEFAULT_SETTINGS = {
        method: 2,      // ISNA
        school: 0,      // Shafi
        date: null      // Today
    };

    // ============================================
    // MODAL FUNCTIONALITY
    // ============================================

    const settingsIcon = document.getElementById('prayerSettingsIcon');
    const settingsModal = document.getElementById('prayerSettingsModal');
    const closeModalBtn = document.getElementById('closeSettingsModal');
    const cancelBtn = document.getElementById('cancelSettings');
    const saveBtn = document.getElementById('saveSettings');

    const calculationMethodSelect = document.getElementById('calculationMethod');
    const schoolSelect = document.getElementById('school');
    const dateInput = document.getElementById('prayerDate');

    // Load saved settings or use defaults
    function loadSettings() {
        const savedSettings = localStorage.getItem('prayerSettings');
        if (savedSettings) {
            return JSON.parse(savedSettings);
        }
        return { ...DEFAULT_SETTINGS };
    }

    // Save settings to localStorage
    function saveSettings(settings) {
        localStorage.setItem('prayerSettings', JSON.stringify(settings));
    }

    // Initialize form with saved settings
    function initializeForm() {
        const settings = loadSettings();
        calculationMethodSelect.value = settings.method;
        schoolSelect.value = settings.school;

        // Set date input to today if no saved date
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = settings.date || today;
    }

    // Open modal
    if (settingsIcon) {
        settingsIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            settingsModal.classList.add('active');
            initializeForm();
        });
    }

    // Close modal functions
    function closeModal() {
        settingsModal.classList.remove('active');
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    settingsModal.addEventListener('click', function(e) {
        if (e.target === settingsModal) {
            closeModal();
        }
    });

    // Save settings and fetch new prayer times
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            const settings = {
                method: parseInt(calculationMethodSelect.value),
                school: parseInt(schoolSelect.value),
                date: dateInput.value
            };

            saveSettings(settings);
            fetchPrayerTimes(settings);
            closeModal();
        });
    }

    // ============================================
    // PRAYER TIMES API INTEGRATION
    // ============================================

    async function fetchPrayerTimes(settings) {
        try {
            // Format date for API (DD-MM-YYYY)
            const dateObj = new Date(settings.date || new Date());
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;

            // Build API URL
            const apiUrl = `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${LOCATION.latitude}&longitude=${LOCATION.longitude}&method=${settings.method}&school=${settings.school}`;

            console.log('Fetching prayer times from:', apiUrl);

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch prayer times');
            }

            const data = await response.json();
            if (data.code === 200 && data.data) {
                updatePrayerTimes(data.data.timings);
                console.log('Prayer times updated successfully');
            } else {
                throw new Error('Invalid API response');
            }
        } catch (error) {
            console.error('Error fetching prayer times:', error);
            alert('Failed to fetch prayer times. Please check your internet connection and try again.');
        }
    }

    // ============================================
    // DAYLIGHT SAVINGS DETECTION
    // ============================================

    // Returns true if Houston is currently observing CDT (UTC-5), false if CST (UTC-6)
    function isHoustonDST() {
        const now = new Date();
        const januaryOffset = new Date(now.getFullYear(), 0, 1).getTimezoneOffset();
        const julyOffset = new Date(now.getFullYear(), 6, 1).getTimezoneOffset();
        const stdOffset = Math.max(januaryOffset, julyOffset);
        return now.getTimezoneOffset() < stdOffset;
    }

    // Returns the two Jummah times based on DST
    function getJummahTimes() {
        return isHoustonDST()
            ? { first: '2:00 PM', second: '3:00 PM' }
            : { first: '1:00 PM', second: '2:00 PM' };
    }

    // ============================================
    // UPDATE UI WITH PRAYER TIMES
    // ============================================

    function convertTo12Hour(time24) {
        // Time format from API is "HH:MM"
        const [hours, minutes] = time24.split(':');
        let hour = parseInt(hours);
        const minute = minutes;

        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        return { hour, minute, period };
    }

    function updatePrayerTimes(timings) {
        // Prayer times from API
        const prayers = {
            Fajr: timings.Fajr,
            Dhuhr: timings.Dhuhr,
            Asr: timings.Asr,
            Maghrib: timings.Maghrib,
            Isha: timings.Isha
        };

        // Update header widget
        const headerPrayerItems = document.querySelectorAll('.prayer-times-header .prayer-item');

        headerPrayerItems.forEach((item) => {
            if (!item.classList.contains('jummah-item')) {
                const prayerName = item.querySelector('.prayer-name').textContent;
                const prayerTimeSpan = item.querySelector('.prayer-time');

                if (prayers[prayerName]) {
                    const { hour, minute, period } = convertTo12Hour(prayers[prayerName]);
                    prayerTimeSpan.textContent = `${hour}:${minute} ${period}`;
                }
            }
        });

        // Update main prayer times box
        const prayerColumns = document.querySelectorAll('.prayer-column');

        prayerColumns.forEach((column) => {
            const prayerName = column.querySelector('.prayer-name-large').textContent;
            const prayerTimeSpan = column.querySelector('.prayer-time-large');

            if (prayers[prayerName]) {
                const { hour, minute, period } = convertTo12Hour(prayers[prayerName]);
                prayerTimeSpan.innerHTML = `${hour}<span class="colon">:</span>${minute} ${period}`;
            }
        });

        // Update Jummah times based on DST
        const jummah = getJummahTimes();

        // Header widget — two .prayer-time spans inside .jummah-item
        const jummahItem = document.querySelector('.prayer-times-header .jummah-item');
        if (jummahItem) {
            const spans = jummahItem.querySelectorAll('.prayer-time');
            if (spans[0]) spans[0].innerHTML = jummah.first.replace(':', '<span class="colon">:</span>');
            if (spans[1]) spans[1].innerHTML = jummah.second.replace(':', '<span class="colon">:</span>');
        }

        // Main prayer box — single .prayer-time-large in .prayer-jummah-column
        const jummahColumn = document.querySelector('.prayer-jummah-column .prayer-time-large');
        if (jummahColumn) {
            const f = jummah.first.replace(':', '<span class="colon">:</span>');
            const s = jummah.second.replace(':', '<span class="colon">:</span>');
            jummahColumn.innerHTML = `${f} &nbsp; ${s}`;
        }
    }

    // ============================================
    // INITIALIZE ON PAGE LOAD
    // ============================================

    // Fetch prayer times on page load with saved settings
    const savedSettings = loadSettings();

    // Set date to today if not specified
    if (!savedSettings.date) {
        savedSettings.date = new Date().toISOString().split('T')[0];
    }

    fetchPrayerTimes(savedSettings);

    // Optional: Auto-refresh prayer times at midnight
    function scheduleNextUpdate() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const timeUntilMidnight = tomorrow - now;

        setTimeout(() => {
            const settings = loadSettings();
            settings.date = new Date().toISOString().split('T')[0];
            saveSettings(settings);
            fetchPrayerTimes(settings);
            scheduleNextUpdate(); // Schedule next update
        }, timeUntilMidnight);
    }

    scheduleNextUpdate();

    console.log('Prayer times module initialized');
});

// ============================================
// LOCATION MODAL
// ============================================

// Locations with photo folders. Folder images must be named "<prefix>_1.jpg" ... "<prefix>_<count>.jpg".
const LOCATION_PHOTOS = {
    'Kyle Morrow Room': { folder: 'kyle_morrow_room', prefix: 'kmr', count: 3 },
    'Prayer Room': { folder: 'prayer_room', prefix: 'pr', count: 5 }
};

let currentPhotoSet = null;
let currentPhotoIndex = 0;

function updateModalPhoto(useFade) {
    const img = document.getElementById('locationModalImg');
    if (!currentPhotoSet) return;

    const src = `../image_files/${currentPhotoSet.folder}/${currentPhotoSet.prefix}_${currentPhotoIndex + 1}.jpg`;

    if (useFade) {
        img.style.opacity = '0';
        const onLoad = function() {
            img.style.opacity = '1';
            img.removeEventListener('load', onLoad);
        };
        img.addEventListener('load', onLoad);
        img.src = src;
    } else {
        img.src = src;
        img.style.opacity = '1';
    }
}

function openLocationModal(name, sublabel, mapEmbedUrl) {
    const overlay = document.getElementById('locationModalOverlay');
    document.getElementById('locationModalName').textContent = name;
    document.getElementById('locationModalSublabel').textContent = sublabel;

    const img = document.getElementById('locationModalImg');
    const fallback = document.getElementById('locationModalImgFallback');
    const prevBtn = document.getElementById('locationModalPrev');
    const nextBtn = document.getElementById('locationModalNext');

    currentPhotoSet = LOCATION_PHOTOS[name] || null;
    currentPhotoIndex = 0;

    if (currentPhotoSet) {
        img.alt = name;
        updateModalPhoto(false);
        img.style.display = 'block';
        fallback.style.display = 'none';
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    } else {
        img.style.display = 'none';
        fallback.style.display = 'block';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }

    if (mapEmbedUrl) {
        const src = mapEmbedUrl.startsWith('http') ? mapEmbedUrl : 'https://' + mapEmbedUrl;
        document.getElementById('locationModalMap').src = src;
    } else {
        const query = encodeURIComponent(name + ' ' + sublabel + ' Rice University Houston TX');
        document.getElementById('locationModalMap').src =
            'https://maps.google.com/maps?q=' + query + '&output=embed';
    }

    overlay.classList.add('active');
}

function closeLocationModal() {
    const overlay = document.getElementById('locationModalOverlay');
    overlay.classList.remove('active');
    document.getElementById('locationModalMap').src = '';
}

document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.getElementById('locationModalPrev');
    const nextBtn = document.getElementById('locationModalNext');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!currentPhotoSet) return;
            currentPhotoIndex = (currentPhotoIndex - 1 + currentPhotoSet.count) % currentPhotoSet.count;
            updateModalPhoto(true);
        });

        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!currentPhotoSet) return;
            currentPhotoIndex = (currentPhotoIndex + 1) % currentPhotoSet.count;
            updateModalPhoto(true);
        });
    }
});
