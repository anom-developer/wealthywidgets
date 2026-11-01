import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FinanceWidget } from './FinanceWidget';

const mockItems = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 60000,
    change24h: 2.5,
    high24h: 61000,
    low24h: 59000,
    volume24h: '$25B',
    marketCap: '$1.2T',
    sparkline: [59000, 59500, 60000],
    icon: '₿',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3000,
    change24h: -1.2,
    high24h: 3100,
    low24h: 2950,
    sparkline: [3100, 3050, 3000],
    icon: 'Ξ',
  },
];

describe('FinanceWidget', () => {
  it('renders default title and items', () => {
    render(<FinanceWidget items={mockItems} />);
    expect(screen.getByText('Market Watch')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getAllByText('BTC').length).toBeGreaterThan(0);
  });

  it('formats price with currency symbol', () => {
    render(<FinanceWidget items={mockItems} currency="USD" />);
    expect(screen.getByText('$60,000.00')).toBeInTheDocument();
  });

  it('renders positive change badge with green style', () => {
    render(<FinanceWidget items={mockItems} />);
    const badge = screen.getByText('▲ +2.50%');
    expect(badge).toHaveClass('ww-finance__change-badge--positive');
  });

  it('switches active asset when tab is clicked', async () => {
    const handleSelect = jest.fn();
    render(<FinanceWidget items={mockItems} onSelectAsset={handleSelect} />);
    
    const ethTab = screen.getByRole('tab', { name: /ETH/i });
    await userEvent.click(ethTab);

    expect(handleSelect).toHaveBeenCalledWith('ETH');
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
    expect(screen.getByText('▼ -1.20%')).toBeInTheDocument();
  });

  it('switches currency when select changes', async () => {
    const handleCurrency = jest.fn();
    render(<FinanceWidget items={mockItems} onCurrencyChange={handleCurrency} />);
    
    const select = screen.getByLabelText('Select currency');
    fireEvent.change(select, { target: { value: 'EUR' } });

    expect(handleCurrency).toHaveBeenCalledWith('EUR');
    expect(screen.getByText('€60,000.00')).toBeInTheDocument();
  });

  it('calls onAiGenerate when prompt is submitted', async () => {
    const handleAi = jest.fn().mockResolvedValue(undefined);
    render(<FinanceWidget items={mockItems} onAiGenerate={handleAi} />);
    
    const input = screen.getByLabelText('AI financial prompt');
    await userEvent.type(input, 'Forecast next quarter');
    
    const btn = screen.getByRole('button', { name: 'Analyze with AI' });
    await userEvent.click(btn);

    expect(handleAi).toHaveBeenCalledWith('Forecast next quarter');
  });
});

