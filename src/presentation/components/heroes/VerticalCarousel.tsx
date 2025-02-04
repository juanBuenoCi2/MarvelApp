import React, { useEffect, useRef } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet } from 'react-native';
import { HeroesPoster } from './HeroesPoster';
import { Heroes } from '../../../core/modelos/heroes.entity';

interface Props {
    heroes: Heroes[];
    title?: string;
    loadNextPage?: () => void;
}

export const VerticalCarousel = ({ heroes, title, loadNextPage }: Props) => {
    const isLoading = useRef(false);

    useEffect(() => {
        isLoading.current = false
    }, [heroes])


    // Función para manejar el desplazamiento
    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {

        if (isLoading.current) return;
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

        const isEndReached = (contentOffset.y + layoutMeasurement.height + 1000) >= contentSize.height
        if (!isEndReached) return;

        isLoading.current = true

        //cargar siguentes heroes
        loadNextPage && loadNextPage()

    };

    return (

        <Layout style={{ flex: 1, width: '100%' }}>
            {title && (
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: '300',
                        marginLeft: 10,
                        marginBottom: 10,
                    }}
                >
                    {title}
                </Text>
            )}
            <FlatList
                data={heroes}
                renderItem={({ item }) => <HeroesPoster heroe={item} width={190} height={300} />}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                contentContainerStyle={styles.flatListContainer} 
                style={styles.flatList}
                onScroll={onScroll}  
                scrollEnabled={true}  
            />
        </Layout>
    );
};

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
        paddingHorizontal: 10,  
    },
    flatListContainer: {
        justifyContent: 'center',  
        alignItems: 'center',      
        paddingBottom: 10,         
    },
});
