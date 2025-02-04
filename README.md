This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Install Dependencies

Before running the application, install the required dependencies by running the following command:

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

## Step 3: Configure Environment Variables

Clone the `.env.template` file to `.env` and configure the necessary environment variables, including your public and private keys from [Marvel Developer](https://developer.marvel.com):

```bash
cp .env.template .env
```

Edit the `.env` file and set your Marvel API keys:

```
MARVEL_PUBLIC_KEY=your_public_key_here
MARVEL_PRIVATE_KEY=your_private_key_here
```

## Step 4: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

