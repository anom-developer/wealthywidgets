import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WeatherWidget } from './WeatherWidget';

const mockForecast = [
  { day: 'Mon', high: 24, low: 16, condition: 'sunny' as const },
  { day: 'Tue', high: 22, low: 15, condition: 'cloudy' as const },
];

describe('WeatherWidget', () => {
  it('renders temperature, location, and condition', () => {
    render(
      <WeatherWidget
        location="Amsterdam"
        temperature={21}
        unit="C"
        condition="sunny"
        feelsLike={20}
        humidity={60}
      />,
    );

    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('21°C')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByText('Feels like')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();
  });

  it('renders forecast strip when showForecast is true', () => {
    render(
      <WeatherWidget
        location="London"
        temperature={15}
        showForecast
        forecast={mockForecast}
      />,
    );

    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('24°')).toBeInTheDocument();
    expect(screen.getByText('Tue')).toBeInTheDocument();
  });

  it('triggers onAiGenerate callback on prompt submission', async () => {
    const handleAi = jest.fn().mockResolvedValue(undefined);
    render(<WeatherWidget onAiGenerate={handleAi} />);

    const input = screen.getByLabelText('AI weather prompt');
    await userEvent.type(input, 'Tokyo rainy 18C');

    const btn = screen.getByLabelText('Generate');
    await userEvent.click(btn);

    expect(handleAi).toHaveBeenCalledWith('Tokyo rainy 18C');
  });
});

