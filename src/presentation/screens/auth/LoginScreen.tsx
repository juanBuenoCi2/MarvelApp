import React from 'react';
import { Layout, Text, Button, Input, useTheme, CheckBox, Spinner } from '@ui-kitten/components';
import { ScrollView, View, StyleSheet, useWindowDimensions, Animated, Image, Alert } from 'react-native';
import { MyIcon } from '../../components/ui/MyIcon';
import { RootStackParams } from '../../navigation/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { useAuth } from '../../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }

export const LoginScreen = ({ navigation }: Props) => {
    const { height } = useWindowDimensions();
    const theme = useTheme();
    const formPosition = React.useRef(new Animated.Value(height)).current;
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const { login } = useAuth();

    React.useEffect(() => {
        Animated.spring(formPosition, {
            toValue: height * 0.42,
            useNativeDriver: false,
            bounciness: 8,
            speed: 5,
        }).start();
    }, []);

    React.useEffect(() => {
        checkStoredCredentials();
    }, []);

    const checkStoredCredentials = async () => {
        try {
            const storedEmail = await AsyncStorage.getItem('email');
            const storedPassword = await AsyncStorage.getItem('password');
            if (storedEmail && storedPassword) {
                setEmail(storedEmail);
                setPassword(storedPassword);
                setRememberMe(true);
            }
        } catch (error) {
            console.error('Error loading credentials:', error);
        }
    };
    const handleLogin = async () => {
        if (!validateEmail(email) || !password) {
            Alert.alert('Error', 'Por favor ingresa credenciales válidas');
            return;
        }

        setLoading(true);
        try {
            await login(email, password);

            if (rememberMe) {
                await AsyncStorage.multiSet([
                    ['email', email],
                    ['password', password],
                ]);
            } else {
                await AsyncStorage.multiRemove(['email', 'password']);
            }

            navigation.navigate('HomeScreen');
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error en el inicio de sesión',error.message);
              } else {
                console.log("Error desconocido", error);
              }
            
        } finally {
            setLoading(false);
        }
    };

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    return (
        <Layout style={styles.container}>
            <View style={[styles.topContainer, { backgroundColor: theme['color-primary-500'], }]}>
                <Image
                    source={require('../../../assets/marvel.png')}
                    // Estilo directo
                    style={{
                        marginTop: 60,
                        width: 350,  
                        height: 300  
                    }}
                />
                <Text category='h1' status='control' style={styles.welcomeText}>
                    ¡Bienvenido!
                </Text>
            </View>
            <Animated.View
                style={[
                    styles.bottomSheet,
                    {
                        backgroundColor: theme['background-basic-color-1'],
                        top: formPosition,
                        height: height * 0.65
                    }
                ]}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <Layout style={styles.formContainer}>
                        <Text category='h2' style={styles.title}>Ingresar</Text>
                        <Text category='p2' appearance='hint' style={styles.subtitle}>
                            Por favor, ingrese para continuar
                        </Text>

                        <Input
                            placeholder='Correo electrónico'
                            value={email}
                            onChangeText={setEmail}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            accessoryLeft={<MyIcon name='email-outline' styles={styles.icon} />}
                            style={styles.input}
                            size='large'
                        />

                        <Input
                            placeholder='Contraseña'
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize='none'
                            secureTextEntry
                            accessoryLeft={<MyIcon name='lock-outline' styles={styles.icon} />}
                            style={styles.input}
                            size='large'
                        />

                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                checked={rememberMe}
                                onChange={setRememberMe}
                                status='primary'
                            />
                            <Text category='s1' style={styles.checkboxText}>Recordar mis datos</Text>
                        </View>

                        <Button
                            style={styles.button}
                            onPress={handleLogin}
                            accessoryRight={loading ? () => <Spinner size='small' /> : undefined}
                            disabled={loading}
                            size='large'>
                            {loading ? 'Cargando...' : 'Ingresar'}
                        </Button>

                        <View style={styles.footer}>
                            <Text appearance='hint'>¿No tienes cuenta?, usa esta: </Text>
                            <Text status='primary' category='s1'>
                                IronMan@gmail.com 123456
                            </Text>
                            <Text appearance='hint' category='s1' style={{ marginTop: 60 }}>
                                Data provided by Marvel. © 2025 MARVEL
                            </Text>

                        </View>
                    </Layout>
                </ScrollView>
            </Animated.View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        height: '100%',
        alignItems: 'center',
    },
    welcomeText: {
        marginTop: 200,
        fontSize: 32,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,

    },
    bottomSheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 30,
    },
    formContainer: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 40,
        paddingTop: 30,
    },
    title: {
        marginBottom: 8,
        fontWeight: 'bold',
    },
    subtitle: {
        marginBottom: 30,
    },
    input: {
        marginBottom: 20,
        borderRadius: 12,
    },
    icon: {
        width: 24,
        height: 24,
    },
    button: {
        marginTop: 10,
        borderRadius: 12,
    },
    footer: {
        marginTop: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
      },
      checkboxText: {
        marginLeft: 10,
      },
});