import Deck from '../Deck';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Deck',
  component: Deck,
} as ComponentMeta<typeof Deck>;

// TODO: Delete this line after replacing `any` with the proper type for `args`
const Template: ComponentStory<typeof Deck> = (args: any) => {
  return <Deck {...args} />
}

export const Default = Template.bind({});
Default.args = { /* args go here */ };
