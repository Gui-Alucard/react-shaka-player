import React from 'react'
import PropTypes from 'prop-types'

import Row from './Row'
import Text from './Text'

const ParentalRatingComponent = ({
  parentalRating,
  size = 16,
  increaseSizeSelfClassified = false,
  textProps = {},
  selfClassified,
  ...props
}: any) => {
  return (
    <>
      {parentalRating && (
        <Row
          size={increaseSizeSelfClassified && selfClassified ? size + 5 : size}
          borderRadius={3}
          alignItems='center'
          justifyContent='center'
          bg={`parentalRating.${parentalRating}`}
          mx={8}
          {...props}
        >
          <Text
            variant={selfClassified ? 'little' : 'tiny'}
            lineHeight={1}
            fontFamily={'\'Urbanist\', \'Arial\', \'Helvetica Neue\', \'Helvetica\', sans-serif'}
            color={parentalRating === '10' || parentalRating == '12' ? '#000' : '#fff'}
            fontWeight={700}
            {...textProps}
          >
            {selfClassified && 'A'}
            {parentalRating}
          </Text>
        </Row>
      )}
    </>
  )
}
ParentalRatingComponent.propTypes = {
  textProps: PropTypes.object,
  size: PropTypes.number,
  parentalRating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selfClassified: PropTypes.bool,
  increaseSizeSelfClassified: PropTypes.bool
}

export default ParentalRatingComponent
