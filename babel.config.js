module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Cada plugin con opciones debe ser un array [nombre, {opciones}]
    [
      'module:react-native-dotenv', 
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env'
      }
    ]
  ],
};