import { useNavigation, useRoute } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack';
import { Layout, Spinner, Text, useTheme } from '@ui-kitten/components'
import React from 'react'
import { RootStackParams } from '../../navigation/StackNavigator';
import { useComics } from '../../hooks/useComics';
import { VerticalCarousel } from '../../components/heroes/VerticalCarousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ComicsHeader } from '../../components/comics/ComicsHeader';
import { Image, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { HorizontalCarousel } from '../../components/comics/HorizontalCarousel';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import SpiderSpinner from '../../components/ui/SpiderSpinner';
import { MyIcon } from '../../components/ui/MyIcon';

interface Props extends StackScreenProps<RootStackParams, 'DetailsScreen'> { };

export const DetailsScreen = ({ route }: Props) => {
  const { height: screenHeight } = useWindowDimensions();
  const navigation = useNavigation();
  const { heroe } = route.params;
  const { top } = useSafeAreaInsets();
  const { isLoading, nextComics, comics } = useComics(heroe.id)
  const theme = useTheme();

  if (isLoading) {
    return (
      <Layout style={[styles.loadingContainer, { 
        paddingTop: top + 20,
        backgroundColor: theme['background-basic-color-1']
      }]}>
        <SpiderSpinner />
      </Layout>
    )
  }

  return (
    <ScrollView style={{ backgroundColor: theme['background-basic-color-1'] }}>
      <Layout style={{ flex: 1 }}>
        <View style={{ ...styles.imageContainer, height: screenHeight * 0.5 }}>
          <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={styles.gradient}
          />
          <View style={[styles.imageBorder, {
            borderColor: theme['color-primary-500'],
            shadowColor: theme['color-primary-600']
          }]}>
            <Image 
              style={styles.posterImage}
              source={{ uri: heroe.thumbnail.replace("http://", "https://") }}
              resizeMode="cover" 
            />
          </View>
        </View>

        <View style={styles.marginContainer}>
          <Text style={[
            styles.title,
            {
              color: theme['color-primary-500'],
              textShadowColor: theme['color-primary-600'],
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 4
            }
          ]}>
            {heroe.name.toUpperCase()}
          </Text>
          <View style={[styles.comicLine, { backgroundColor: theme['color-accent-500'] }]} />
        </View>

        <View style={styles.backButton}>
          <Pressable 
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [
              styles.backButtonContainer,
              { opacity: pressed ? 0.7 : 1 }
            ]}
          >
            <MyIcon styles={[styles.icon, { marginLeft: 1 }]} name={'arrow-back-outline'} />
          </Pressable>
        </View>

        {heroe.description && (
          <View style={styles.descriptionContainer}>
            <Text style={[
              styles.sectionTitle,
              {
                color: theme['color-primary-500'],
                borderColor: theme['color-accent-500']
              }
            ]}>
              HISTORIA
            </Text>
            <Text style={[
              styles.descriptionText,
              { color: theme['text-basic-color'] }
            ]}>
              {heroe.description}
            </Text>
          </View>
        )}

        <HorizontalCarousel 
          title={'CÓMICS'} 
          Comics={comics} 
          loadNextPage={nextComics}
          
        />
      </Layout>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16
  },
  spinner: {
    transform: [{ scale: 1.5 }]
  },
  loadingText: {
    fontWeight: 'bold',
    letterSpacing: 1.5
  },
  imageContainer: {
    width: '100%',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 100,
    zIndex: 2
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 9
  },
  posterImage: {
    flex: 1,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 10
  },
  comicLine: {
    height: 4,
    width: 100,
    borderRadius: 2,
    marginVertical: 15
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    top: 45,
    left: 20,
  },
  backButtonContainer: {
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 8
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3
  },
  descriptionContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 2,
    paddingBottom: 5,
    alignSelf: 'flex-start'
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'color-primary-500',
  },
});