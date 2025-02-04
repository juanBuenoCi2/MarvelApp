import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Comics, Heroes } from '../../../core/modelos/heroes.entity';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props {
    heroe: Heroes | Comics;
    height?: number;
    width?: number;
    space?: number;
}

export const HeroesPoster = ({ heroe, height = 420, width = 300, space = 10 }: Props) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    return (
        <>
            {"title" in heroe ? 
                <Pressable
                    style={({ pressed }) => ({
                        width,
                        height,
                        padding: space,
                    })}
                >
                    <Layout style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: heroe.thumbnail.replace("http://", "https://") }}
                            resizeMode="cover"
                        />
                    </Layout>
                </Pressable>
                :
                <Pressable
                    onPress={() => navigation.navigate('DetailsScreen', { heroe: heroe })}
                    style={({ pressed }) => ({
                        width,
                        height,
                        marginHorizontal: 0,
                        padding: 10,
                        opacity: pressed ? 0.9 : 1,
                    })}
                >
                    <Layout style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: heroe.thumbnail.replace("http://", "https://") }}
                            resizeMode="cover"
                        />
                        
                        <View style={styles.textOverlay}>
                            <Text category='h6' style={styles.title}>{heroe.name}</Text>
                            <Text category='s1' style={styles.subtitle}>
                                {heroe.comicsNumber} comics
                            </Text>
                        </View>
                    </Layout>
                </Pressable>
            }
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderRadius: 18,
    },
    imageContainer: {
        flex: 1,
        borderRadius: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 9,
        position: 'relative',
    },
    textOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    subtitle: {
        color: '#f0f0f0',
        textAlign: 'center',
        marginTop: 4,
        fontSize: 14,
    }
})