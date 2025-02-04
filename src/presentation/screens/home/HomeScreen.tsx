import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { Layout, Text, Spinner, useTheme } from '@ui-kitten/components'
import { useHeroes } from '../../hooks/useHeroes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { VerticalCarousel } from '../../components/heroes/VerticalCarousel'
import SpiderSpinner from '../../components/ui/SpiderSpinner'
import { useAuth } from '../../hooks/useAuth'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../navigation/StackNavigator'
import { MyIcon } from '../../components/ui/MyIcon'

export const HomeScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { top, bottom } = useSafeAreaInsets()
  const { isLoading, heroes, nextHeroes } = useHeroes()
  const theme = useTheme()

  const handleLogout = () => {
    logout();
    navigation.navigate('LoginScreen');
  }

  if (isLoading) {
    return (
      <Layout style={[
        styles.loadingContainer, 
        { paddingTop: top + 20, backgroundColor: theme['background-basic-color-1'] }
      ]}>
        <SpiderSpinner />
        <Text category='s1' style={[styles.loadingText, { color: theme['text-basic-color'] }]}>
          Cargando héroes...
        </Text>
      </Layout>
    )
  }

  return (
    <Layout style={[
      styles.container, 
      { 
        paddingTop: top + 20,
        backgroundColor: theme['background-basic-color-1']
      }
    ]}>
      {/* Botón de Logout */}
      <TouchableOpacity
        style={[styles.logoutButton, { top: top + 10 }]}
        onPress={handleLogout}
        accessibilityLabel="Cerrar sesión"
        activeOpacity={0.7}
      >
        <MyIcon 
          name='log-out-outline' 
          styles={[styles.icon, { tintColor: theme['color-primary-500'] }]} 
        />
      </TouchableOpacity>

      {/* Encabezado */}
      {user && (
        <View style={[styles.header, { marginTop: (Platform.OS === 'android' ? 50 : 10) }]}>
          <Text
            category='h5'
            style={[
              styles.title,
              { color: theme['text-basic-color'] }
            ]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            Bienvenido{'\n'}
            <Text category='h4' style={styles.userName}>
              {user?.name} {user?.lastName}
            </Text>
          </Text>
        </View>
      )}

      {/* Carrusel */}
      <VerticalCarousel
        heroes={heroes}
        loadNextPage={nextHeroes}
      />
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16
  },
  loadingText: {
    fontWeight: 'bold',
    letterSpacing: 1.5
  },
  header: {
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1.5,
    lineHeight: 28
  },
  userName: {
    fontFamily: 'Marvel-Regular',
    letterSpacing: 3,
    marginTop: 4,
  },
  logoutButton: {
    position: 'absolute',
    zIndex: 999,
    left: 20,
    padding: 8,
    borderRadius: 20
  },
  icon: {
    width: 28,
    height: 28,
  },
})