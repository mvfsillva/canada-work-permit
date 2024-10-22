import { fireEvent, cleanup } from '@testing-library/react'
import { renderWithTheme } from 'helpers/testing-library'

import Button from '.'

afterEach(cleanup)

const handleClick = jest.fn()

describe('<Button />', () => {
  test('should render a button', () => {
    const { getByTestId } = renderWithTheme(
      <Button onClick={handleClick}>Click Me</Button>
    )

    expect(getByTestId(/button/)).toBeInTheDocument()
  })

  test('should call a function after clicking on the button', () => {
    const { getByTestId } = renderWithTheme(
      <Button onClick={handleClick}>Click Me</Button>
    )

    fireEvent.click(getByTestId(/button/))
    expect(handleClick).toBeCalled()
  })

  test('should render the button color correctly', () => {
    const { container } = renderWithTheme(
      <Button variant="primary" onClick={handleClick}>
        Click Me
      </Button>
    )

    expect(container.firstChild).toHaveStyle({
      'background-color': 'rgb(238, 82, 83)'
    })
  })
})
