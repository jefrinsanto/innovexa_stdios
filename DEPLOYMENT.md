# INNOVEXA STUDIOS — Production Deployment Guide

Free/low-cost stack: **Vercel or Netlify** (frontend) + **Render or Railway** (backend) +
**MongoDB Atlas** (database). All three have usable free tiers as of writing — verify current
pricing/limits yourself before committing, since free-tier terms change over time.

---

## 1. Database — MongoDB Atlas

1. Create an account at [mongodb.com/atlas](https://www.mongodb.com/atlas) and create a new
   **free M0 cluster** (pick a region close to wherever you deploy the backend).
2. **Database Access** → add a database user with a strong password (this is separate from
   your Atlas login). Note the username/password — you'll need them in the connection string.
3. **Network Access** → add IP address `0.0.0.0/0` ("Allow access from anywhere").
   This is the pragmatic choice for platforms like Render/Railway whose outbound IPs aren't
   fixed/listed — but it means Atlas relies entirely on your database user's password for
   protection. Use a long, random password, and rotate it if it's ever exposed (e.g. committed
   to git by accident).
4. **Connect** → "Drivers" → copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
   ```
5. Add your database name before the `?`:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/innovexa-studios?retryWrites=true&w=majority
   ```
   This full string is your `MONGO_URI`.

---

## 2. Backend — Render or Railway

Either works the same way conceptually: point the platform at your GitHub repo's `backend/`
folder and set environment variables in its dashboard (never commit a real `.env` file).

### Render
1. Push the project to a GitHub repo.
2. [render.com](https://render.com) → **New → Web Service** → connect the repo.
3. **Root directory:** `backend`
4. **Build command:** `npm install`
5. **Start command:** `npm start`
6. **Environment variables** (Render dashboard → Environment): see checklist below.
7. Deploy. Render gives you a URL like `https://innovexa-studios-api.onrender.com`.
8. Note: Render's free tier spins the service down after inactivity — the first request after
   idle can take 30–60s to respond. Fine for a portfolio-stage site; worth knowing so a cold
   start isn't mistaken for a bug.

### Railway (alternative)
1. [railway.app](https://railway.app) → **New Project → Deploy from GitHub repo**.
2. Set the service's root directory to `backend`.
3. Railway auto-detects `npm start`. Add environment variables in the service's **Variables** tab.
4. Deploy. Railway gives you a public domain (or generate one under **Settings → Networking**).

*(Cyclic, mentioned in your brief, has changed its free-tier terms substantially since this
guide was written and its current status should be checked directly at cyclic.sh before relying
on it — Render/Railway are the more predictable free options right now.)*

---

## 3. Frontend — Vercel or Netlify

### Vercel
1. [vercel.com](https://vercel.com) → **New Project** → import the GitHub repo.
2. **Root directory:** `frontend`
3. **Framework preset:** Vite (auto-detected)
4. **Build command:** `npm run build` · **Output directory:** `dist`
5. **Environment variables** → add `VITE_API_URL` = your deployed backend's contact endpoint,
   e.g. `https://innovexa-studios-api.onrender.com/api/contact`
6. Deploy.

### Netlify (alternative)
1. [netlify.com](https://netlify.com) → **Add new site → Import an existing project**.
2. **Base directory:** `frontend` · **Build command:** `npm run build` · **Publish directory:** `frontend/dist`
3. **Site settings → Environment variables** → add `VITE_API_URL` as above.
4. Deploy.

**Important:** `VITE_API_URL` is baked into the JS bundle at *build* time, not read at runtime.
If you change it later, you must trigger a new build/deploy — editing the env var alone in the
dashboard does nothing until the next build runs.

---

## 4. Wire CORS to the real frontend domain

Once the frontend has a real URL (e.g. `https://innovexa-studios.vercel.app`), update the
backend's `CLIENT_URL` environment variable on Render/Railway to include it:

```
CLIENT_URL=https://innovexa-studios.vercel.app
```

You can keep the local dev origins too (comma-separated) if you still want to test locally
against the deployed backend:

```
CLIENT_URL=https://innovexa-studios.vercel.app,http://localhost:5173
```

Redeploy the backend after changing this — like the frontend's env var, it's read once at
server startup (`server.js` reads `process.env.CLIENT_URL` when it boots), so a running
instance won't pick up the change until it restarts.

---

## 5. Environment variable checklist

### Backend (Render/Railway dashboard)
| Variable | Example | Notes |
|---|---|---|
| `PORT` | `5000` | Most platforms inject their own `PORT` and ignore this — fine to leave it, harmless either way |
| `MONGO_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/innovexa-studios` | From Atlas, step 1 |
| `CLIENT_URL` | `https://innovexa-studios.vercel.app` | Your deployed frontend's real origin |
| `SMTP_HOST` | `smtp.gmail.com` | Or your provider's SMTP host |
| `SMTP_PORT` | `465` | |
| `SMTP_USER` | `you@gmail.com` | The sending account |
| `SMTP_PASS` | *(16-char App Password)* | Not your real Gmail password — see Phase 1 notes |
| `NOTIFY_EMAIL` | `jefrinabcde@gmail.com` | Where lead notifications land |

### Frontend (Vercel/Netlify dashboard)
| Variable | Example | Notes |
|---|---|---|
| `VITE_API_URL` | `https://innovexa-studios-api.onrender.com/api/contact` | Full contact endpoint, not just the domain |

### Pre-launch check
- [ ] Submitted the live contact form end-to-end (not just a health-check ping) and confirmed a document landed in MongoDB Atlas
- [ ] Confirmed the notification email actually arrived (check spam folder the first time)
- [ ] Confirmed the browser console shows no CORS errors on the deployed frontend
- [ ] Confirmed `VITE_API_URL` points at `https://...`, not `http://localhost:5000` (easy copy-paste mistake)
- [ ] Rotated any credentials that were ever pasted into a chat, screenshot, or committed to git history
