import Player from '../Player';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Player',
  component: Player,
} as ComponentMeta<typeof Player>;

// TODO: Delete this line after replacing `any` with the proper type for `args`
const Template: ComponentStory<typeof Player> = (args: any) => {
  return <Player {...args} />
}

export const Default = Template.bind({});
Default.args = { /* args go here */ };
