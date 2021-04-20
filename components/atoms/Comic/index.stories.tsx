import Component from '.'

export default {
  title: 'Atoms/Comic',
  component: Component,
}
const Template = (args) => <Component {...args} />

export const standardComic = Template.bind({})
standardComic.args = {
  month: '1',
  num: 1,
  link: '',
  year: '2006',
  news: '',
  safe_title: 'Barrel - Part 1',
  transcript:
    "[[A boy sits in a barrel which is floating in an ocean.]]\nBoy: I wonder where I'll float next?\n[[The barrel drifts into the distance. Nothing else can be seen.]]\n{{Alt: Don't we all.}}",
  alt: "Don't we all.",
  img: '/comics/barrel_cropped_(1).jpg',
  title: 'Barrel - Part 1',
  day: '1',
  height: 311,
  width: 577,
}
export {}
