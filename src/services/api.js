/**
 * Mock Asynchronous API Service
 * Models realistic network latency and data fetching patterns for enterprise architecture.
 */

// Simulated network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchEvents = async () => {
  await delay(600); // Simulate network round-trip
  return [
    { id: 1, title: 'Opening Keynote', time: '10:00 AM', status: 'completed', type: 'required' },
    { id: 2, title: 'AI in Sports Tech', time: '11:30 AM', status: 'pending', type: 'optional' },
    { id: 3, title: 'Networking Lunch', time: '1:00 PM', status: 'pending', type: 'social' },
    { id: 4, title: 'VR Hardware Lab', time: '3:00 PM', status: 'queued', type: 'workshop', queuePosition: 4, capacityFull: true },
    { id: 5, title: 'Startup Pitch', time: '4:00 PM', status: 'pending', type: 'workshop', capacityFull: true }
  ];
};

export const fetchFoodMenu = async () => {
  await delay(500);
  return [
    { id: 1, name: 'Artisan Coffee', price: '150 RS', image: '☕' },
    { id: 2, name: 'Avocado Toast', price: '250 RS', image: '🍞' },
    { id: 3, name: 'Energy Smoothie', price: '200 RS', image: '🥤' }
  ];
};

export const fetchAlerts = async () => {
  await delay(400);
  return {
    alerts: [
      { id: 1, type: 'urgent', title: 'Schedule Change', message: 'The AI Workshop has been moved from Room 4B to the Main Stage.', time: '2 mins ago' },
      { id: 2, type: 'info', title: 'Food Court Busy', message: 'Current wait times at the main food court exceed 20 mins. Use pre-order to save time!', time: '15 mins ago' }
    ],
    faqs: [
      { id: 1, iconType: 'wifi', q: 'Campus WiFi', a: 'Network: CampusSync_Guest | Pass: events2026' },
      { id: 2, iconType: 'navigation', q: 'Lost & Found', a: 'Located at the North Entrance Information Desk.' }
    ]
  };
};
