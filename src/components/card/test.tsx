import { renderWithTheme } from 'helpers/testing-library'

import Card from '.'

describe('<Button />', () => {
  test('should render a button', () => {
    const { getByTestId } = renderWithTheme(
      <Card
        title="Process Time by IRCC"
        content="23 weeks"
        footer="Last update: 27/08/2021"
      />
    )

    expect(getByTestId(/card/)).toBeInTheDocument()
  })

  test('should render the correct variant', () => {
    const { container } = renderWithTheme(
      <Card
        title="Process Time by IRCC"
        content="23 weeks"
        footer="Last update: 27/08/2021"
        variant="skyBlue"
      />
    )

    expect(container.firstChild).toHaveStyle({ 'border-bottom-color': '#54A0FF' })
  })
})
