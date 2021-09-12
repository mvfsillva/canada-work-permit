import { createRef } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { DateUtils } from 'react-day-picker'
import { format as dateFnsFormat, parse as dateFnsParse } from 'date-fns'
import { withTheme } from 'styled-components'

import Input from 'components/input'

import * as S from './styles'

type DateFieldProps = {
  name?: string
  value: Date
  disabled?: boolean
  hasError?: boolean
  onChange?(event: { target: { name: string; value: string } }): void
  theme: {
    colors: Record<string, string>
  }
}

const DATE_FORMAT = 'yyyy-MM-dd'

function formatDate(date: Date, format: string): string {
  return dateFnsFormat(date, format)
}

function parseDate(strDate: string, format: string) {
  const parsed = dateFnsParse(strDate, format, new Date())

  return DateUtils.isDate(parsed) ? parsed : undefined
}

function DateField(props: DateFieldProps): React.ReactElement {
  const { name, value, hasError, disabled, onChange } = props
  const handleDayClick = (selectedDate: Date): void =>
    onChange({ target: { name, value: formatDate(selectedDate, DATE_FORMAT) } })
  const displayValueFactory = (): string | Date => value

  const inputProps = {
    id: name,
    disabled,
    name,
    hasError,
    readOnly: true,
    'data-testid': name
  }

  const dayPickerProps = {
    className: 'Selectable',
    numberOfMonths: 1,
    onDayClick: handleDayClick,
    modifiers: {
      disabled: [
        {
          after: new Date()
        }
      ]
    }
  }

  return (
    <S.LibStyles>
      <DayPickerInput
        component={Input}
        ref={createRef()}
        onDayChange={handleDayClick}
        format={DATE_FORMAT}
        formatDate={formatDate}
        parseDate={parseDate}
        value={displayValueFactory()}
        placeholder={`${dateFnsFormat(new Date(), DATE_FORMAT)}`}
        inputProps={inputProps}
        dayPickerProps={dayPickerProps}
        clickUnselectsDay
        hideOnDayClick
        data-testid="date-field"
        overlayComponent={({ children, ...props }) => {
          return (
            <S.Overlay {...props}>
              <S.OverlayToolbar />
              {children}
            </S.Overlay>
          )
        }}
      />
    </S.LibStyles>
  )
}

export default withTheme(DateField)
