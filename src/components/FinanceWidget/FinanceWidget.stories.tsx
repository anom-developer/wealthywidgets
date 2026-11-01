import type { Meta, StoryObj } from '@storybook/react';
import { FinanceWidget } from './FinanceWidget';

const meta: Meta<typeof FinanceWidget> = {
  title: 'Widgets/FinanceWidget',
  component: FinanceWidget,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FinanceWidget>;

export const Default: Story = {
  args: {
    title: 'Market Watch',
    currency: 'USD',
    showSparkline: true,
    showDetails: true,
  },
};

export const CryptoOnly: Story = {
  args: {
    title: 'Crypto Portfolio',
    currency: 'USD',
    items: [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        price: 64280.5,
        change24h: 3.42,
        high24h: 65100.0,
        low24h: 62800.0,
        volume24h: '$28.4B',
        marketCap: '$1.26T',
        sparkline: [62800, 63100, 62900, 63500, 63800, 64100, 64280],
        icon: '₿',
      },
      {
        symbol: 'SOL',
        name: 'Solana',
        price: 154.3,
        change24h: 7.15,
        high24h: 156.0,
        low24h: 142.5,
        volume24h: '$4.1B',
        marketCap: '$72.5B',
        sparkline: [142.5, 144.0, 147.2, 149.0, 152.4, 154.3],
        icon: '◎',
      },
    ],
  },
};

export const WithAiGeneration: Story = {
  args: {
    title: 'AI Market Intelligence',
    currency: 'USD',
    onAiGenerate: async (prompt: string) => {
      await new Promise((r) => setTimeout(r, 1200));
      console.log('Generated AI insight for prompt:', prompt);
    },
  },
};

