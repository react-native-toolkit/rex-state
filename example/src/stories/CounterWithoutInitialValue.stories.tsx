import React from 'react';
import type { Story, Meta } from '@storybook/react/types-6-0';
import { CounterWithoutInitialValue } from './Counter';

export default {
  title: 'Example/Counter without Initial Value',
  component: CounterWithoutInitialValue,
} as Meta;

const Template: Story<{}> = (args) => <CounterWithoutInitialValue {...args} />;

export const WithoutInitialValue = Template.bind({});
WithoutInitialValue.args = {};
