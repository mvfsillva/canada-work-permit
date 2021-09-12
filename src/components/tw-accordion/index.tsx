import { useRef, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

type AccordionProps = {
  title: React.ReactNode
  children: React.ReactNode
}

const Arrow = styled.img<{ active?: boolean }>(({ active }) => [
  tw`transform duration-700 ease`,
  active && tw`rotate-180`
])

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [active, setActive] = useState(false)
  const [height, setHeight] = useState('0px')
  const contentSpace = useRef(null)

  function toggleAccordion() {
    setActive(!active)
    setHeight(active ? '0px' : `${contentSpace.current.scrollHeight}px`)
  }

  return (
    <div tw="flex flex-col overflow-hidden">
      <button
        tw="appearance-none cursor-pointer focus:outline-none flex items-center justify-between"
        onClick={toggleAccordion}
      >
        <p tw="inline-block text-black" className="light">
          {title}
        </p>
        <Arrow
          style={{ maxWidth: '20px' }}
          src="icon-down.svg"
          alt="Chevron icon"
          active={active}
        />
      </button>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        tw="overflow-hidden transition-all duration-700 ease-in-out"
      >
        {children}
      </div>
    </div>
  )
}

export default Accordion
