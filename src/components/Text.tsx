import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { space, layout, typography, color, position, variant, border, shadow } from 'styled-system'

const HUGEST = 'hugest'
const HUGER = 'huger'
const HUGE = 'huge'
const BIGGEST = 'biggest'
const BIGGER = 'bigger'
const BIG = 'big'
const LARGE = 'large'
const MEDIUM = 'medium'
const NORMAL = 'normal'
const DEFAULT = 'default'
const REGULAR = 'regular'
const SMALL = 'small'
const SMALLER = 'smaller'
const SMALLEST = 'smallest'
const LITTLE = 'little'
const TINY = 'tiny'
const TINIEST = 'tiniest'
const TINIER = 'tinier'
const BABY = 'baby'
const BABIER = 'babier'

const Text = ({ children, ...props }: any) => <Paragraph {...props}>{children}</Paragraph>

const Paragraph = styled.p(
  ({ capitalizeFirstLetter, theme, hoverColor, limitLines }: any) => {
    if (!capitalizeFirstLetter && !hoverColor && !limitLines) {
      return ''
    }
    if (capitalizeFirstLetter) {
      return `
        &:first-letter {
          text-transform: uppercase;
        }
      `
    }
    if (hoverColor) {
      return `
      transition: all linear 200ms;
      &:hover {
        color: ${theme.colors[hoverColor]};
        border-bottom-color: ${theme.colors[hoverColor]};
      }
      `
    }
    return `
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${limitLines};
      -webkit-box-orient: vertical;
    `
  },
  variant({
    variants: {
      [HUGEST]: {
        fontSize: 50,
        lineHeight: '45px'
      },
      [HUGER]: {
        fontSize: 35,
        lineHeight: '40px'
      },
      [HUGE]: {
        fontSize: 30,
        lineHeight: '42px'
      },
      [BIGGEST]: {
        fontSize: 26,
        lineHeight: '38px'
      },
      [BIGGER]: {
        fontSize: 25,
        lineHeight: '36px'
      },
      [BIG]: {
        fontSize: 22,
        lineHeight: '31px'
      },
      [LARGE]: {
        fontSize: 21,
        lineHeight: '29px'
      },
      [MEDIUM]: {
        fontSize: 18,
        lineHeight: '29px'
      },
      [DEFAULT]: {
        fontSize: 20,
        lineHeight: '24px'
      },
      [NORMAL]: {
        fontSize: 19,
        lineHeight: '28px'
      },
      [REGULAR]: {
        fontSize: 17,
        lineHeight: '25px'
      },
      [SMALL]: {
        fontSize: 16,
        lineHeight: '23px'
      },
      [SMALLER]: {
        fontSize: 15,
        lineHeight: '21px'
      },
      [SMALLEST]: {
        fontSize: 14,
        lineHeight: '20px'
      },
      [LITTLE]: {
        fontSize: 13,
        lineHeight: '19px'
      },
      [TINY]: {
        fontSize: 14,
        lineHeight: '17px'
      },
      [TINIEST]: {
        fontSize: 12,
        lineHeight: '14px'
      },
      [TINIER]: {
        fontSize: 11,
        lineHeight: '15px'
      },
      [BABY]: {
        fontSize: 10,
        lineHeight: '10px'
      },
      [BABIER]: {
        fontSize: 9,
        lineHeight: '13px'
      }
    }
  }),
  space,
  layout,
  typography,
  color,
  position,
  border,
  shadow
)

Text.defaultProps = {
  color: 'white',
  variant: 'medium',
  fontFamily: '\'Urbanist\', \'Arial\', \'Helvetica Neue\', \'Helvetica\', sans-serif',
  textDecoration: 'none'
}

Text.propTypes = {
  variant: PropTypes.oneOfType([
    PropTypes.oneOf([
      HUGEST,
      HUGER,
      HUGE,
      BIGGEST,
      BIGGER,
      BIG,
      LARGE,
      MEDIUM,
      NORMAL,
      DEFAULT,
      REGULAR,
      SMALL,
      SMALLER,
      SMALLEST,
      LITTLE,
      TINY,
      TINIEST,
      TINIER,
      BABY,
      BABIER
    ]),
    PropTypes.arrayOf(
      PropTypes.oneOf([
        HUGEST,
        HUGER,
        HUGE,
        BIGGEST,
        BIGGER,
        BIG,
        LARGE,
        MEDIUM,
        NORMAL,
        DEFAULT,
        REGULAR,
        SMALL,
        SMALLER,
        SMALLEST,
        LITTLE,
        TINY,
        TINIEST,
        TINIER,
        BABY,
        BABIER
      ])
    )
  ]),
  whiteSpace: PropTypes.string,
  capitalizeFirstLetter: PropTypes.bool,
  textTransform: PropTypes.string,
  hoverColor: PropTypes.string,
  limitLines: PropTypes.number,
  ...space.prototype,
  ...layout.prototype,
  ...typography.prototype,
  ...color.prototype,
  ...position.prototype,
  ...border.prototype
}

export default Text
