---
name: build_and_deploy
description: Informācija par EAS buildiem, natīvajām atkarībām un Android navigācijas joslas konfigurāciju.
---

# Build un Deploy Skill

Šis skill palīdz orientēties Expo natīvajā konfigurācijā un build procesos.

## EAS Development Builds
Aplikācija izmanto custom natīvās pakotnes (`expo-navigation-bar`, `expo-system-ui`), tāpēc standarta Expo Go var nedarboties pilnībā. Jāizmanto **Development Builds**.

Build komanda:
```bash
eas build --profile development --platform android
```

## Natīvā konfigurācija
Aplikācija izmanto **edge-to-edge** režīmu, tāpēc natīvās API fonu funkcijas (piem., `setBackgroundColorAsync`) tiek ignorētas. Krāsu kontrole notiek caur layout elementiem:
- **Root View:** `app/_layout.tsx` failā root `View` elementam ir jābūt ar `flex:1` un pareizo `backgroundColor`.
- **BottomTabBar:** Custom komponentei `components/BottomTabBar.tsx` ir jānodrošina pietiekams padding apakšā (`insets.bottom`), lai fons nosegtu sistēmas joslu.

## GitHub integrācija
Pirms katra jauna build'a ir ieteicams veikt `git push`, lai EAS varētu izmantot jaunāko koda versiju.
Repozitorijs: `https://github.com/anngaa/Vardu-un-Uzvardu-Kalendars.git`

## Problēmu novēršana
Ja pēc izmaiņām navigācijas josla kļūst balta:
1. Pārbaudiet `app/_layout.tsx` - vai root `View` ir `flex:1` un ar pareizo krāsu.
2. Pārbaudiet `components/BottomTabBar.tsx` - vai padding apakšā ir vismaz `insets.bottom`.
3. Pārbaudiet `app.json` - `backgroundColor` jābūt saskaņotam.
