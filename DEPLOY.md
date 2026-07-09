# Deploy na Vercel — Led Tehnika

## Uređivanje sadržaja (prije deploya)

Vidi [KEYSTATIC.md](KEYSTATIC.md) — `npm run admin` → http://localhost:3000/keystatic

---

## Deploy (korak po korak)

### 1. Push na GitHub

```bash
git add .
git commit -m "CMS migracija"
git push origin main
```

Repo: https://github.com/dragang1/led-tehnika

### 2. Vercel

1. Idi na https://vercel.com/new
2. Importuj `dragang1/led-tehnika`
3. Klikni Deploy

Sajt radi odmah — sadržaj se čita iz `content/` u gitu.

### 3. Domen

U Vercel → Settings → Domains:

- `ledtehnika.com`
- `www.ledtehnika.com` (redirect na bez www)
- `admin.ledtehnika.com` (opciono, za web admin)

### 4. SEO provjera nakon deploya

```bash
npm run verify:seo -- --base https://ledtehnika.com
```

### 5. Ugasi Render/Strapi

Tek nakon 24–48h kad sve radi — ugasi `led-backend-62tj.onrender.com`.

---

## admin.ledtehnika.com (opciono)

Potrebno samo ako želiš uređivati putem weba bez lokalnog `npm run admin`.

1. `npm run admin` → http://localhost:3000/keystatic
2. **Create GitHub App** → wizard popuni `.env`
3. Kopiraj iz `.env` u Vercel env varijable:
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET`
   - `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
   - `KEYSTATIC_GITHUB_REPO=dragang1/led-tehnika`
   - `KEYSTATIC_ADMIN_HOST=admin.ledtehnika.com`
4. Redeploy na Vercelu

Admin: https://admin.ledtehnika.com
