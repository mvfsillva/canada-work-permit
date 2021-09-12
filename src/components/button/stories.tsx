import styled from 'styled-components'

import Button from '.'

const Div = styled.div`
  button {
    margin-right: 10px;
  }
`

export default {
  title: 'Components/Button',
  component: Button
}

export function Default() {
  return (
    <Div>
      <Button onClick={() => console.log('clicked')} label="Click Me" />
      <Button
        variant="primary"
        onClick={() => console.log('clicked')}
        label="Click Me"
      />
      <Button
        variant="secondary"
        onClick={() => console.log('clicked')}
        label="Click Me"
      />
      <Button
        variant="skyBlue"
        onClick={() => console.log('clicked')}
        label="Click Me"
      />
    </Div>
  )
}
