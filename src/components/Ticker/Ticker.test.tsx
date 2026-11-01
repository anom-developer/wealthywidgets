import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Ticker } from './Ticker';

describe('Ticker Component', () => {
  it('renders without crashing', () => {
    render(<Ticker />);
    expect(screen.getByRole('region', { name: /financial ticker bar/i })).toBeInTheDocument();
  });

  it('renders default symbols', () => {
    render(<Ticker />);
    const btcElements = screen.getAllByText('BTC');
    expect(btcElements.length).toBeGreaterThan(0);
  });

  it('renders LIVE badge when live=true', () => {
    render(<Ticker live={true} />);
    expect(screen.getByText('LIVE')).toBeInTheDocument();
  });

  it('hides LIVE badge when live=false', () => {
    render(<Ticker live={false} />);
    expect(screen.queryByText('LIVE')).not.toBeInTheDocument();
  });

  it('calls onItemClick when an item is clicked', () => {
    const handleClick = jest.fn();
    render(<Ticker onItemClick={handleClick} />);
    const items = screen.getAllByText('BTC');
    fireEvent.click(items[0]);
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies light theme class when requested', () => {
    const { container } = render(<Ticker theme="light" />);
    expect(container.firstChild).toHaveClass('ww-ticker--light');
  });
});

