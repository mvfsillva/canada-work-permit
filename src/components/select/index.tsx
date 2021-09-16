import { cloneElement, useState, useEffect } from 'react'
import { withTheme } from 'styled-components'
import { rgba } from 'polished'
import ReactSelect, {
  Props as ReactSelectProps,
  StylesConfig,
  OptionTypeBase,
  components
} from 'react-select'

type SelectProps = Omit<ReactSelectProps, 'onChange'> & {
  icon?: React.ReactElement
  borderless?: boolean
  hasError?: boolean
  onChange?(event: { target: { name: string; value: OptionTypeBase } }): void
  theme: {
    border: Record<string, string>
    colors: Record<string, string>
    spaces: Record<string, string>
    transition: Record<string, string>
    font: Record<string, string>
  }
}

function Select(
  props: React.PropsWithChildren<SelectProps>
): React.ReactElement {
  const { name, icon, options, onChange, theme, hasError, ...restProps } = props
  const [bodyElement, setBodyElement] = useState(undefined)

  useEffect(() => {
    setBodyElement(document.body)
  }, [])

  const inputStyles = {
    color: theme.colors.black,
    '&:focus, &:active': {
      boxShadow: `0 0 0 2px ${rgba(theme.colors.darkGray, 1)}`
    }
  }

  const styles: StylesConfig = {
    container: (styles) => ({
      ...styles,
      width: '100%',
      color: theme.colors.black
    }),
    control: (styles) => ({
      ...styles,
      border: 0,
      flexWrap: 'nowrap',
      borderRadius: theme.border.radius,
      boxShadow: `0 0 0 1px ${
        hasError ? rgba(theme.colors.primary, 1) : rgba(theme.colors.black, 1)
      }`,
      '&:hover': {
        boxShadow: `0 0 0 2px ${rgba(theme.colors.darkGray, 0.3)}`
      },
      '&:focus, &:active': {
        boxShadow: `0 0 0 2px ${rgba(theme.colors.darkGray, 0.3)}`
      }
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: theme.colors.black,
      '&:hover': {
        color: theme.colors.darkGray
      }
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    valueContainer: (styles) => ({
      ...styles,
      color: theme.colors.black,
      '&:hover': {
        color: theme.colors.darkGray
      }
    }),
    placeholder: (styles) => ({
      ...styles,
      // marginLeft: theme.spaces.xsmall,
      marginRight: theme.spaces.xsmall,
      inputStyles,
      color: theme.colors.darkGray
    }),
    input: (styles) => ({
      ...styles,
      inputStyles
    }),
    singleValue: (styles) => ({
      ...styles,
      // marginLeft: theme.spaces.xsmall,
      marginRight: theme.spaces.xsmall
    }),
    option: (styles, state) => ({
      ...styles,
      background: 'transparent',
      cursor: 'pointer',
      color: state.isSelected ? theme.colors.secondary : theme.colors.primary,
      fontWeight: state.isSelected ? 'bolder' : 'normal',
      transition: theme.transition.ease,
      '&:hover': {
        color: theme.colors.primary,
        fontWeight: 'bolder'
      }
    }),
    menu: (styles) => ({ ...styles, zIndex: 9999 }),
    menuPortal: (styles) => ({ ...styles, zIndex: 9999 })
  }

  const ValueContainer = ({ children, ...props }) => {
    return (
      components.ValueContainer && (
        <components.ValueContainer {...props}>
          {Boolean(children) &&
            Boolean(icon) &&
            cloneElement(icon, {
              style: { position: 'absolute', left: 6 }
            })}
          {children}
        </components.ValueContainer>
      )
    )
  }

  return (
    <ReactSelect
      name={name}
      inputId={name}
      options={options}
      isSearchable={false}
      components={{ ValueContainer }}
      menuPortalTarget={bodyElement}
      value={restProps.value}
      onChange={(option: OptionTypeBase) => {
        const selected = {
          name,
          value: option
        }
        onChange && onChange({ target: selected })
      }}
      styles={styles}
      {...restProps}
    />
  )
}

export default withTheme(Select)
