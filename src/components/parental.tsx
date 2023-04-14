import React from 'react';
import { IPlayerProps } from '../types';
import Column from './Column';
import Row from './Row';
import Text from './Text';
import ParentalRating from './ParentalRating';

const Parental = (props: IPlayerProps) => {
  const { content } = props

  return (
    <div>
      {content && !content.isLive && content?.episode?.parental_rating && (
        <Column
          position='fixed'
          height={content.isIphone ? '-webkit-fill-available' : 'fit-content'}
          top={30}
          left={30}
          alignItems='center'
          zIndex={3}
          style={{ pointerEvents: content.showControls && content.showParentalRating ? 'none' : 'auto' }}
          opacity={!content.showControls && content.showParentalRating ? 1 : 0}
          {...props}
        >
          <Row alignItems='center' width='100%' mt={42} px={46}>
            <Text variant='small' textShadow='0px 1px 2px black' borderLeft='2px solid #ef4846' px={8}>
              Classificação
            </Text>
            <ParentalRating
              parentalRating={content?.episode?.parental_rating}
              selfClassified={content?.episode?.self_classified}
              size={25}
              increaseSizeSelfClassified={true}
              textProps={{ variant: 'small', fontWeight: 'bold', fontFamily: '\'Urbanist\', \'Arial\', \'Helvetica Neue\', \'Helvetica\', sans-serif' }}
            />
          </Row>
          <Row alignItems='center' width='100%' mt={8} px={46}>
            <Text variant='tiny' textShadow='0px 1px 2px black' pl={10}>
              {content?.episode?.parental_rating_justification}
            </Text>
          </Row>
        </Column>
      )}
    </div>
  )
};

export { Parental };
