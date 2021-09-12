import styled from 'styled-components'
import Select from '.'

const Div = styled.div`
  display: flex;
  > div {
    margin-right: 10px;
    width: 50%;
  }
`

export default {
  title: 'Components/Select',
  component: Select
}

export function Default() {
  return <Select />
}

export function WithIcon() {
  return (
    <Div>
      <Select
        options={[
          { value: 'Toronto', label: 'Toronto' },
          { label: 'Vancouver', value: 'Vancouver' }
        ]}
      />
      <Select
        options={[
          { value: 'Toronto', label: 'Toronto' },
          { label: 'Vancouver', value: 'Vancouver' }
        ]}
      />
    </Div>
  )
}
