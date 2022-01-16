import Table from '../Table';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Table',
  component: Table,
} as ComponentMeta<typeof Table>;

// TODO: Delete this line after replacing `any` with the proper type for `args`
const Template: ComponentStory<typeof Table> = (args: any) => {
  return <Table {...args} />
}

export const Default = Template.bind({});
Default.args = { /* args go here */ };
