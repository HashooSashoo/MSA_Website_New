// Rice MSA Website - Prayer Times Header Widget
// Shared script to update header prayer times on all pages

(function() {
    'use strict';

    // Rice University coordinates (Houston, TX)
    const LOCATION = {
        latitude: 29.7174,
        longitude: -95.4018
    };

    // Default settings
    const DEFAULT_SETTINGS = {
        method: 2,      // ISNA
        school: 0,      // Shafi
        date: null      // Today
    };

    // Load saved settings or use defaults
    function loadSettings() {
        const savedSettings = localStorage.getItem('prayerSettings');
        if (savedSettings) {
            return JSON.parse(savedSettings);
        }
        return { ...DEFAULT_SETTINGS };
    }

    // Convert 24-hour time to 12-hour format
    function convertTo12Hour(time24) {
        const [hours, minutes] = time24.split(':');
        let hour = parseInt(hours);
        const minute = minutes;

        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        return `${hour}:${minute} ${period}`;
    }

    // Fetch prayer times from Aladhan API
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

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch prayer times');
            }

            const data = await response.json();
            if (data.code === 200 && data.data) {
                updateHeaderPrayerTimes(data.data.timings);
            } else {
                throw new Error('Invalid API response');
            }
        } catch (error) {
            console.error('Error fetching prayer times for header:', error);
            // Silently fail - keep existing times displayed
        }
    }

    // Update header widget with prayer times
    function updateHeaderPrayerTimes(timings) {
        const prayers = {
            Fajr: timings.Fajr,
            Dhuhr: timings.Dhuhr,
            Asr: timings.Asr,
            Maghrib: timings.Maghrib,
            Isha: timings.Isha
        };

        // Update header prayer items
        const headerPrayerItems = document.querySelectorAll('.prayer-times-header .prayer-item');

        headerPrayerItems.forEach((item) => {
            if (!item.classList.contains('jummah-item')) {
                const prayerName = item.querySelector('.prayer-name');
                const prayerTimeSpan = item.querySelector('.prayer-time');

                if (prayerName && prayerTimeSpan) {
                    const name = prayerName.textContent;
                    if (prayers[name]) {
                        prayerTimeSpan.textContent = convertTo12Hour(prayers[name]);
                    }
                }
            }
        });
    }

    // Initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        const savedSettings = loadSettings();

        // Set date to today if not specified
        if (!savedSettings.date) {
            savedSettings.date = new Date().toISOString().split('T')[0];
        }

        // Only fetch if header widget exists
        if (document.querySelector('.prayer-times-header')) {
            fetchPrayerTimes(savedSettings);
        }
    }
})();
