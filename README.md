# Tutos AV — Plateforme de tutoriels audiovisuels

Site Next.js pour présenter des tutoriels vidéo réalisés par des étudiants en audiovisuel.

## Stack

- **Next.js 14**
- **TypeScript**
- **Tailwind CSS**
- Données en **JSON statique** 
- Support **YouTube**, **Vimeo**, et **MP4** local
- **Likes** et **commentaires**

## Installation

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000)

## Structure

```
src/
├── app/
│   ├── api/
│   │   ├── videos/route.ts      # GET /api/videos?category=&q=
│   │   ├── likes/route.ts       # GET|POST /api/likes
│   │   └── comments/route.ts    # GET|POST /api/comments
│   ├── videos/[id]/page.tsx     # Page détail vidéo
│   ├── page.tsx                 # Page d'accueil
│   └── layout.tsx
├── components/
│   ├── VideoCard.tsx            # Carte vidéo (grille)
│   ├── VideoGrid.tsx            # Grille avec filtres et recherche
│   ├── VideoPlayer.tsx          # Player YouTube / Vimeo / MP4
│   └── LikesComments.tsx        # Système de likes et commentaires
└── lib/
    ├── videos.json              # ← Ajoute tes vidéos ici
    ├── store.ts                 # Store in-memory (remplacer par DB)
    └── types.ts                 # Types TypeScript
```

## Ajouter une vidéo

Édite `src/lib/videos.json` :

```json
{
  "id": "7",
  "title": "Mon tutoriel",
  "author": "Prénom Nom",
  "promo": "BUT MMI 2025",
  "category": "Montage",
  "tags": ["montage", "Premiere"],
  "description": "Description courte du tuto.",
  "type": "youtube",          // "youtube" | "vimeo" | "mp4"
  "videoId": "YOUTUBE_ID",   // pour YouTube et Vimeo
  // "videoUrl": "/videos/mon-fichier.mp4",  // pour MP4 local
  "thumbnail": "https://img.youtube.com/vi/YOUTUBE_ID/maxresdefault.jpg",
  "duration": "10:00",
  "date": "2025-01-01"
}
```

## Passer à une vraie base de données

1. Remplace `src/lib/store.ts` par Supabase, Prisma, ou autre
2. Remplace `src/lib/videos.json` par des appels DB dans les routes API
3. Les composants React n'ont pas besoin de changer

## Catégories disponibles

Cadrage · Lumière · Son · Montage · Post-production · Motion

(Modifiable dans `src/components/VideoGrid.tsx`)
