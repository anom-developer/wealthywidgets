import type { Meta, StoryObj } from '@storybook/react';
import { Ticker } from './Ticker';

const meta: Meta<typeof Ticker> = {
  title: 'Widgets/Ticker',
  component: Ticker,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Ticker>;

export const Default: Story = {
  args: {
    speed: 30,
    live: true,
  },
};

export const LightTheme: Story = {
  args: {
    theme: 'light',
    speed: 25,
  },
};

export const PillVariant: Story = {
  args: {
    variant: 'pill',
    speed: 20,
  },
};

