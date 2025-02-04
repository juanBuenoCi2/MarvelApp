import React, { useEffect, useRef } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet, ScrollView, View, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Comics, Heroes } from '../../../core/modelos/heroes.entity';
import { HeroesPoster } from '../heroes/HeroesPoster';

interface Props {
    Comics: Comics[];
    title?: string;
    loadNextPage?: () => void;
}

export const HorizontalCarousel = ({ Comics, title, loadNextPage }: Props) => {
    const isLoading = useRef(false);

    useEffect(() => {
        isLoading.current = false;
    }, [Comics]);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (isLoading.current) return;

        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        const isEndReached = (contentOffset.x + layoutMeasurement.width + 500) >= contentSize.width;

        if (!isEndReached) return;

        isLoading.current = true;
        loadNextPage && loadNextPage();
    };

    return (
        <Layout style={styles.container}>
            {title && (
                <Text style={styles.title}>
                    {title}
                </Text>
            )}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
                contentContainerStyle={styles.flatListContainer}
            >
                <View style={styles.itemsContainer}>
                    {Comics.map((item, index) => (
                        <View 
                            key={`${item.id}-${index}`}
                            style={styles.poster}
                        >
                            <HeroesPoster 
                                heroe={item} 
                                width={150} 
                                height={250} 
                                space={0}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 300,
        marginVertical: 10,
        marginBottom:50
    },
    title: {
        color:'#ED1D24',
        fontSize: 23,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 10,
    },
    flatListContainer: {
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    itemsContainer: {
        flexDirection: 'row',
    },
    poster: {
        marginRight: 15,
    }
});