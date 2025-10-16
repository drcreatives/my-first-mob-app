# Copilot Instructions for my-first-mob-app

## Project Overview
This is an Expo 54 + React Native 0.81 mobile app using:
- **File-based routing** via `expo-router` (v6) - routes defined in `app/` directory
- **NativeWind** (v4) for Tailwind CSS styling on native components
- **React 19** with new architecture enabled (`newArchEnabled: true` in `app.json`)
- **TypeScript** with strict mode and path aliases (`@/*`)

## Architecture & Routing
- Entry point: `app/_layout.tsx` (renders `<Stack />` and imports globals.css)
- Routes automatically created from files in `app/` - e.g., `app/index.tsx` → `/` route
- Typed routes enabled via `experiments.typedRoutes` in `app.json`

## Styling with NativeWind
- Use Tailwind utility classes via `className` prop on React Native components
- Example from `app/index.tsx`: `<View className="flex-1 justify-center items-center">`
- Global styles in `app/globals.css` (imported in `_layout.tsx`)
- **Critical**: When adding new components, update `tailwind.config.js` content paths
  - Current: `["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"]`
  - Must add `"./app/**/*.{ts,tsx}"` to include app directory files
- NativeWind configured in both `babel.config.js` and `metro.config.js`

## Key Commands
```bash
npm start              # Start Expo dev server
npm run android        # Launch on Android emulator
npm run ios            # Launch on iOS simulator
npm run web            # Run in web browser
npm run lint           # Run ESLint (expo lint)
npm run reset-project  # Clear starter code, create blank app/
```

## Development Notes
- React Compiler experimental feature enabled (`experiments.reactCompiler: true`)
- Edge-to-edge display on Android (`android.edgeToEdgeEnabled: true`)
- Supports dark mode (`userInterfaceStyle: "automatic"`)
- Deep linking scheme: `myfirstmobapp://`

## Common Patterns
- Import from `react-native` for core components: `View`, `Text`, etc.
- Use `@/*` path alias for imports (resolves to project root)
- No separate components directory yet - add to `components/` when needed
- Platform-specific code via `.ios.tsx` / `.android.tsx` extensions (expo-router convention)
