import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EventChecklist from './EventChecklist';
import * as api from '../services/api';

vi.mock('../services/api', () => ({
  fetchEvents: vi.fn()
}));

describe('EventChecklist API Integration', () => {
  it('loads events asynchronously and allows queue joining', async () => {
    api.fetchEvents.mockResolvedValue([
      { id: 4, title: 'VR Hardware Lab', time: '3:00 PM', status: 'pending', type: 'workshop', capacityFull: true }
    ]);

    render(<EventChecklist />);
    
    // Verify initial loading state
    expect(screen.getByText(/Loading itinerary/i)).toBeInTheDocument();

    // Wait for the mock API to resolve and render the event
    await waitFor(() => {
      expect(screen.getByText('VR Hardware Lab')).toBeInTheDocument();
    });

    // Find the Join Queue button using the ARIA accessible name
    const joinButtons = screen.getAllByRole('button', { name: /Join virtual queue/i });
    expect(joinButtons.length).toBeGreaterThan(0);
    
    // Simulate joining the queue
    fireEvent.click(joinButtons[0]);
    
    // Verify status dynamically updates
    expect(screen.getByText(/in Queue/i)).toBeInTheDocument();
  });
});
