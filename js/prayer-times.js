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
        let prayerIndex = 0;

        headerPrayerItems.forEach((item, index) => {
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

                // Update with blinking colon
                prayerTimeSpan.innerHTML = `${hour}<span class="colon">:</span>${minute} ${period}`;
            }
        });
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
