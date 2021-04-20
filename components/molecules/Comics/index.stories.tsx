import Component from '.'

export default {
  title: 'Molecules/Comics',
  component: Component,
}
const Template = (args) => <Component {...args} />

export const standard = Template.bind({})
standard.args = {
  comics: [
    {
      month: '4',
      num: 2448,
      link: '',
      year: '2021',
      news: '',
      safe_title: 'Eradication',
      transcript: '',
      alt: 'When you get to hell, tell smallpox we say hello.',
      img: '/comics/eradication.png',
      title: 'Eradication',
      day: '9',
      height: 274,
      width: 563,
    },
    {
      month: '4',
      num: 2450,
      link: '',
      year: '2021',
      news: '',
      safe_title: 'Post Vaccine Social Scheduling',
      transcript: '',
      alt: "As if these problems weren't NP-hard enough.",
      img: '/comics/post_vaccine_social_scheduling.png',
      title: 'Post Vaccine Social Scheduling',
      day: '14',
      height: 248,
      width: 628,
    },
    {
      month: '4',
      num: 2451,
      link: '',
      year: '2021',
      news: '',
      safe_title: 'AI Methodology',
      transcript: '',
      alt:
        "We've learned that weird spacing and diacritics in the methodology description are apparently the key to good research; luckily, we've developed an AI tool to help us figure out where to add them.",
      img: '/comics/ai_methodology.png',
      title: 'AI Methodology',
      day: '16',
      height: 396,
      width: 267,
    },
  ],
}
