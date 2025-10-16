# Copilot Instructions for my-first-mob-app

## Project Overview
This is an Expo 54 + React Native 0.81 mobile app using:
- **File-based routing** via `expo-router` (v6) with tab and stack navigation
- **NativeWind** (v4) for Tailwind CSS styling on native components
- **React 19** with new architecture enabled (`newArchEnabled: true` in `app.json`)
- **TypeScript** with strict mode and path aliases (`@/*`)

## Architecture & Routing

### Navigation Structure
- **Root Layout**: `app/_layout.tsx` - Stack navigator with:
  - `(tabs)` - Bottom tab navigation (hidden header)
  - `movies/[id]` - Dynamic movie details route (hidden header)
- **Tab Layout**: `app/(tabs)/_layout.tsx` - Custom tab bar with 4 tabs:
  - `index` (Home) - Main landing screen
  - `search` - Search functionality
  - `saved` - Saved items
  - `profile` - User profile
- **Dynamic Routes**: `app/movies/[id].tsx` - Movie details using `useLocalSearchParams()` hook

### Routing Patterns
- Group routes with `(folderName)` - e.g., `app/(tabs)/` creates a route group
- Dynamic params with `[param]` - e.g., `movies/[id].tsx` → `/movies/123`
- Access params via `useLocalSearchParams()` from `expo-router`
- Typed routes enabled via `experiments.typedRoutes` in `app.json`

## Project Structure
```
app/
  ├── (tabs)/          # Tab navigation group
  │   ├── _layout.tsx  # Tab bar with custom TabIcon component
  │   ├── index.tsx    # Home tab
  │   ├── search.tsx   # Search tab
  │   ├── saved.tsx    # Saved tab
  │   └── profile.tsx  # Profile tab
  ├── movies/
  │   └── [id].tsx     # Dynamic movie details
  ├── _layout.tsx      # Root stack navigator
  └── globals.css      # Tailwind directives
constants/
  ├── icons.ts         # Icon asset exports
  └── images.ts        # Image asset exports
interfaces/
  └── interfaces.d.ts  # TypeScript interfaces
types/
  └── images.d.ts      # Image type definitions
```

## Styling with NativeWind

### Custom Theme
Tailwind config includes custom color palette:
```js
colors: {
  primary: "#030014",      // Deep dark blue
  secondary: "#151312",    // Dark brown
  light: { 100-300 },      // Purple/blue/gray tints
  dark: { 100-200 },       // Dark purple shades
  accent: "#AB8BFF"        // Purple accent
}
```

### Patterns
- Use `className` prop on React Native components (NativeWind convention)
- Example: `<View className="flex-1 justify-center items-center">`
- Inline styles still work: `<View style={styles.container}>`
- Global styles in `app/globals.css` (imported in root `_layout.tsx`)
- Tailwind content paths configured for `app/**` and `components/**`

### Custom Tab Bar Styling
- Custom rounded tab bar with absolute positioning (see `app/(tabs)/_layout.tsx`)
- `TabIcon` component uses `ImageBackground` for focused state with highlight effect
- Unfocused tabs show grayscale icons with tint color

## Asset Management
- **Icons**: Imported from `constants/icons.ts` - centralized icon exports
- **Images**: Imported from `constants/images.ts` - centralized image exports
- **Usage Pattern**: Import from constants, cast to `ImageSourcePropType` for type safety
  ```tsx
  import { icons } from "@/constants/icons";
  <Image source={icons.home as ImageSourcePropType} />
  ```

## Key Commands
```bash
npm start              # Start Expo dev server
npm run android        # Launch on Android emulator
npm run ios            # Launch on iOS simulator
npm run web            # Run in web browser
npm run lint           # Run ESLint (expo lint)
npx expo start --clear # Clear cache and restart
```

## Development Notes
- React Compiler experimental feature enabled (`experiments.reactCompiler: true`)
- Edge-to-edge display on Android (`android.edgeToEdgeEnabled: true`)
- Supports dark mode (`userInterfaceStyle: "automatic"`)
- Deep linking scheme: `myfirstmobapp://`

## Common Patterns
- **Path Alias**: Use `@/*` for imports (resolves to project root)
  - `import { icons } from "@/constants/icons"`
- **TypeScript**: Define interfaces in `interfaces/` directory
- **Type Definitions**: Add custom types in `types/` directory
- **Components**: No shared components yet - add to `components/` when needed
- **Platform-specific**: Use `.ios.tsx` / `.android.tsx` extensions
