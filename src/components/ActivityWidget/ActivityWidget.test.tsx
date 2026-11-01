import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActivityWidget } from './ActivityWidget';

const mockItems = [
  { id: 1, label: 'PR #101 merged', description: 'feat: add widgets', status: 'success' as const, timestamp: '10m ago' },
  { id: 2, label: 'Deploy failed', description: 'Error in container', status: 'danger' as const, timestamp: '1h ago' },
  { id: 3, label: 'Release v2.0', description: 'Production rollout', status: 'info' as const, timestamp: '2h ago' },
];

describe('ActivityWidget', () => {
  it('renders title and activity items', () => {
    render(<ActivityWidget title="Project Feed" items={mockItems} />);
    expect(screen.getByText('Project Feed')).toBeInTheDocument();
    expect(screen.getByText('PR #101 merged')).toBeInTheDocument();
    expect(screen.getByText('Deploy failed')).toBeInTheDocument();
    expect(screen.getByText('Release v2.0')).toBeInTheDocument();
  });

  it('renders empty message when no items', () => {
    render(<ActivityWidget items={[]} />);
    expect(screen.getByText('No activity yet.')).toBeInTheDocument();
  });

  it('supports show more toggle when items exceed maxVisible', async () => {
    const manyItems = [
      { id: 1, label: 'Item 1' },
      { id: 2, label: 'Item 2' },
      { id: 3, label: 'Item 3' },
      { id: 4, label: 'Item 4' },
      { id: 5, label: 'Item 5' },
      { id: 6, label: 'Item 6' },
    ];
    render(<ActivityWidget items={manyItems} maxVisible={3} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
    expect(screen.queryByText('Item 4')).not.toBeInTheDocument();

    const toggle = screen.getByRole('button', { name: 'Show 3 more' });
    await userEvent.click(toggle);

    expect(screen.getByText('Item 4')).toBeInTheDocument();
    expect(screen.getByText('Show less')).toBeInTheDocument();
  });

  it('calls onAiGenerate on submit', async () => {
    const handleAi = jest.fn().mockResolvedValue(undefined);
    render(<ActivityWidget items={mockItems} onAiGenerate={handleAi} />);
    
    const input = screen.getByLabelText('AI generation prompt');
    await userEvent.type(input, '5 git commits');
    
    const btn = screen.getByLabelText('Generate with AI');
    await userEvent.click(btn);

    expect(handleAi).toHaveBeenCalledWith('5 git commits');
  });
});

