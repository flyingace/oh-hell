import Card from '../Card';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Card',
  component: Card,
} as ComponentMeta<typeof Card>;

// TODO: Delete this line after replacing `any` with the proper type for `args`
const Template: ComponentStory<typeof Card> = (args: any) => {
  return <Card {...args} />
}

export const Default = Template.bind({});
Default.args = { /* args go here */ };
