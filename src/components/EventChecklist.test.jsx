import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EventChecklist from './EventChecklist';

describe('EventChecklist Virtual Queue Logic', () => {
  it('renders correctly', () => {
    render(<EventChecklist />);
    expect(screen.getByText('My Itinerary')).toBeInTheDocument();
    expect(screen.getByText('AI in Sports Tech')).toBeInTheDocument();
  });

  it('allows a user to join the virtual queue', () => {
    render(<EventChecklist />);
    const joinButtons = screen.getAllByRole('button', { name: /Join virtual queue/i });
    expect(joinButtons.length).toBeGreaterThan(0);
    
    // Simulate joining queue
    fireEvent.click(joinButtons[0]);
    // Since component state updates to 'queued', the queue position text should appear
    expect(screen.getByText(/#\d+ in Queue/i)).toBeInTheDocument();
  });
});
