# Vārdu un Uzvārdu Kalendārs - Aģenta instrukcijas

Šis fails satur informāciju par projekta arhitektūru, dizaina principiem un tehniskajiem lēmumiem, lai palīdzētu aģentam efektīvāk strādāt pie šīs aplikācijas.

## Projekta apskats
"Vārdu un Uzvārdu Kalendārs" ir React Native (Expo) aplikācija latviešu vārda dienu apskatei, ietverot gan oficiālo kalendāru, gan paplašināto versiju ar uzvārdiem.

## Tehnoloģiju steks
- **Framework:** Expo (SDK 55) ar Expo Router.
- **Valoda:** TypeScript.
- **Styling:** Tailwind CSS caur NativeWind.
- **Data:** JSON faili `/data` direktorijā.
- **Native:** EAS builds (Development profile).

## Dizaina principi un estētika
Aplikācija fokusējas uz "premium" un tīru vizuālo identitāti.
- **Krāsu palete:**
  - Galvenais fons (Header): `#f6f3ea` (krēmkrāsa).
  - Satura fons (Main Content): `#ffffff` (balts).
  - Vārda dienu baloni (Bubbles): `#eff2e9` (zaļgana krēmkrāsa).
  - Apakšējā tabu josla un sistēmas navigācija (Bottom Tab & Nav): `#efefef` (pelēks).
  - Teksts/Ikonas (Active): `#262626`.
  - Teksts/Ikonas (Inactive): `#737373`.
- **Ikonas:** Custom SVG komponentes no `components/SolarIcon.tsx`. Alfabēta secībā sakārtotas lineārās ikonas.
- **Layout:**
  - Headerim ir vizuāls loks (arc) apakšā.
  - Horizontāls `DayPills` saraksts datumu izvēlei.
  - `BottomTabBar` ir custom komponente ar specifisku Android 12 navigācijas joslas fixu.

## Datu struktūra (`/data`)
- `namedays.json`: Galvenā datu bāze. Atslēga ir formātā `MM-DD`.
  ```json
  "01-01": {
    "names": ["Vārds1", "Vārds2"],
    "extended": ["Vārds3", "Vārds4"]
  }
  ```
- Meklēšanas loģika parasti tiek realizēta caur `components/SearchView.tsx`.

## Native un Build specifika
- **Android Navigation Bar:** Tā kā aplikācija izmanto edge-to-edge režīmu, natīvās API funkcijas (piem., `setBackgroundColorAsync`) tiek ignorētas. Tā vietā krāsa tiek kontrolēta caur:
  1. Root `View` (ar `flex:1` un `backgroundColor: '#efefef'`) `app/_layout.tsx` failā.
  2. `BottomTabBar.tsx` apakšējo paddingu, kas aizpilda sistēmas joslas zonu.
- **Piezīme:** Mainot natīvās atkarības (piem., instalējot jaunas pakotnes), OBLIGĀTI nepieciešams jauns EAS build.

## Darba plūsma
1. Visas UI izmaiņas jāveic, ievērojot esošo krāsu paleti un Tailwind klašu stilu.
2. Pirms jauna EAS build palaišanas pārliecinieties, ka visas izmaiņas ir augšupielādētas GitHub.
3. Repozitorijs: [Vardu-un-Uzvardu-Kalendars](https://github.com/anngaa/Vardu-un-Uzvardu-Kalendars.git)
