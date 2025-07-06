import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
const App = () => {
  const ctx = require.context('../src/app'); // 👈 this line points to your real app folder
  return <ExpoRoot context={ctx} />;
};

registerRootComponent(App);