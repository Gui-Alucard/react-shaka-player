import styled, { StyledComponent, css } from 'styled-components'
import { flexbox, space, layout, color, border, position } from 'styled-system'

const Row: StyledComponent<"div", any, any, never> = styled.div(
  css,
  flexbox,
  space,
  layout,
  color,
  border,
  position
)

Row.propTypes = {
  ...flexbox.prototype,
  ...space.prototype,
  ...layout.prototype,
  ...color.prototype,
  ...border.prototype,
  ...position.prototype
}

export const RowDesktop = styled(Row)`
  display: none;
  @media (min-width: 1200px) {
    display: flex;
  }
`

export const RowMobile = styled(Row)`
  display: flex;
  @media (min-width: 1200px) {
    display: none;
  }
`

export default Row
