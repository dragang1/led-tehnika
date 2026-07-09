# Keystatic admin — kako uređivati proizvode

## Odmah (lokalno) — radi bez dodatnog setupa

```bash
npm run admin
```

Otvori u browseru: **http://localhost:3000/keystatic**

Tu mijenjaš proizvode, kategorije, slider. Izmjene se spremaju u `content/` folder.

Kad završiš:

```bash
git add .
git commit -m "Ažuriran sadržaj"
git push
```

Vercel automatski objavi novu verziju sajta. **SEO URL-ovi ostaju isti.**

---

## Šta NE dirati u adminu

- Polje **slug** — SEO URL zavisi od njega
- Imena YAML fajlova u `content/products/`

---

## admin.ledtehnika.com (kasnije, opciono)

Ako želiš uređivati sa bilo kojeg računara bez lokalnog dev servera:

1. Otvori `http://localhost:3000/keystatic`
2. Klikni **Create GitHub App** i slijedi korake
3. Kopiraj vrijednosti iz `.env` u Vercel (Settings → Environment Variables)
4. Redeploy

Detalji: [DEPLOY.md](DEPLOY.md)
