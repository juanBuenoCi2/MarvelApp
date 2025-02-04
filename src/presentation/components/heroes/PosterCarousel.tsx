import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { Heroes } from '../../../core/modelos/heroes.entity'
import { ScrollView } from 'react-native-gesture-handler';
import { HeroesPoster } from './HeroesPoster';

interface Props {
    heroes: Heroes[];
    height?: number;
}


export const PosterCarousel= ({height = 440, heroes}:Props) => {
  return (
    <Layout style={{height}}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {
                heroes.map(heroe => (
                    <HeroesPoster  key={heroe.id} heroe={heroe} />
                ))
            }

        </ScrollView>
        
    </Layout>
  )
}
