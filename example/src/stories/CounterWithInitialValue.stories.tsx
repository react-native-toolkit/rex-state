import React from 'react';
import type { Story, Meta } from '@storybook/react/types-6-0';
import { CounterWithInitialValue } from './Counter';

export default {
  title: 'Example/Counter with Initial Value',
  component: CounterWithInitialValue,
} as Meta;

const Template: Story<{}> = (args) => <CounterWithInitialValue {...args} />;

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {};
