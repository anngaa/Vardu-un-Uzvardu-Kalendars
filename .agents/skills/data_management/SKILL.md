---
name: data_management
description: Instrukcijas vārda dienu datu apstrādei, meklēšanai un JSON failu struktūrai.
---

# Datu Pārvaldības Skill

Šis skill apraksta, kā strādāt ar latviešu vārda dienu datiem projektā.

## Datu avoti (`/data`)
- `namedays.json`: Galvenais apvienotais fails.
- `name-days-lv.json`: Oficiālais kalendārs.
- `name-days-lv-extended.json`: Paplašinātais saraksts (inc. uzvārdi).

## JSON formāts
Dati ir organizēti pēc datuma atslēgas `MM-DD`:
```json
"12-31": {
  "names": ["Silvestrs", "Kalvis", "Gvido"],
  "extended": ["Gudmunds", "Silvestra"]
}
```

## Meklēšanas implementācija
Meklējot vārdus, jāpārbauda gan `names`, gan `extended` saraksti.
Piemērs efektīvai meklēšanai:
```typescript
const results = Object.entries(namedays).filter(([date, data]) => {
  return data.names.some(n => n.toLowerCase().includes(query)) || 
         data.extended.some(n => n.toLowerCase().includes(query));
});
```

## Datu atjaunošana
Ja tiek pievienoti jauni vārdi:
1. Atjauniniet attiecīgo JSON failu.
2. Pārliecinieties, ka JSON formāts ir derīgs.
3. Ja izmantojat `npx expo start --clear`, Metro serveris pārlādēs datus automātiski.
