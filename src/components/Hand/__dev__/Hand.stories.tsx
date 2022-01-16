import Hand from '../Hand';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Hand',
  component: Hand,
} as ComponentMeta<typeof Hand>;

// TODO: Delete this line after replacing `any` with the proper type for `args`
const Template: ComponentStory<typeof Hand> = (args: any) => {
  return <Hand {...args} />
}

export const Default = Template.bind({});
Default.args = { /* args go here */ };
