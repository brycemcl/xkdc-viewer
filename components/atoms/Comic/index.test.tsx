import { render } from '@testing-library/react'
import { standardComic as StandardComic } from './index.stories'

test('renders', () => {
  render(<StandardComic {...StandardComic.args} />)
})
