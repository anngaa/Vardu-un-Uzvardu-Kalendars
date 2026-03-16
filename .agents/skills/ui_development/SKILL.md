---
name: ui_development
description: Vadlīnijas UI komponentu izstrādei, ievērojot projekta estētiku un Tailwind CSS principus.
---

# UI Izstrādes Skill

Šis skill apraksta, kā veidot jaunus UI elementus, lai tie iekļautos esošajā "premium" dizainā.

## Krāsu sistēma
Lietojiet tikai šādas krāsas jauniem komponentiem:
- `bg-[#f6f3ea]` - Galvenes (Header) fons.
- `bg-[#ffffff]` - Galvenā satura fons.
- `bg-[#eff2e9]` - Vārda dienu balonu (Bubbles) krāsa.
- `bg-[#efefef]` - Apakšējā tabu josla un sistēmas navigācija.
- `text-[#262626]` - Galvenais teksts.
- `text-[#737373]` - Sekundārais teksts.

## Ikonu lietošana
Ikonām jāizmanto `components/SolarIcon.tsx`:
```tsx
import SolarIcon from "./SolarIcon";

// Lietošana:
<SolarIcon name="magnifer-linear" size={24} color="#262626" />
```
Ja nepieciešama jauna ikona, tā jāpievieno `SolarIcon.tsx` kā jauns `case` ar SVG kodu no Solar Icons komplekta (Linear stils).

## Tailwind un NativeWind
- Izmantojiet `className` stila definēšanai.
- Sarežģītākiem stiliem (piem., loka efektiem) lietojiet `style` propu kopā ar Tailwind.
- Atcerieties par `SafeAreaView` lietošanu no `react-native-safe-area-context`.

## Komponentu piemērs
Ievērojiet šādu struktūru kartītēm:
```tsx
<View className="bg-white rounded-3xl p-6 shadow-sm">
  <Text className="text-[#262626] font-bold text-lg">Virasraksts</Text>
  <Text className="text-[#737373] mt-1">Apraksts</Text>
</View>
```
