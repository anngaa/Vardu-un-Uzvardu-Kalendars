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
- **Android Navigation Bar:** Tiek iestatīta `_layout.tsx` failā un `app.json`.
- **SystemUI:** `SystemUI.setBackgroundColorAsync('#efefef')` ir kritisks, lai novērstu balto fonu caurspīdīgajām sistēmas pogām.
- **OTA Updates:** JavaScript un aseta izmaiņas var nosūtīt caur Metro serveri (`r` terminālī). Natīvās izmaiņas (jaunas bibliotēkas) prasa jaunu EAS build.

## GitHub integrācija
Pirms katra jauna build'a ir ieteicams veikt `git push`, lai EAS varētu izmantot jaunāko koda versiju.
Repozitorijs: `https://github.com/anngaa/Vardu-un-Uzvardu-Kalendars.git`

## Problēmu novēršana
Ja pēc izmaiņām navigācijas josla kļūst balta:
1. Pārbaudiet `app.json` - `backgroundColor` jābūt `#efefef`.
2. Pārbaudiet `app/_layout.tsx` - `SystemUI` un `NavigationBar` krāsām jābūt iestatītām.
3. Veiciet jaunu EAS build, ja tika mainītas pakotnes.
