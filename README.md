# INNOVEXA STUDIOS — Website

Full-stack marketing site: React (Vite + Tailwind + Framer Motion) frontend,
Express + MongoDB + Nodemailer backend.

```
innovexa-studios/
├── backend/
│   ├── models/Contact.js       # Mongoose schema
│   ├── routes/contact.js       # POST /api/contact (save + email)
│   ├── server.js               # Express app entry point
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/         # Header, Hero, Services, Metrics, Connect, Footer
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── tailwind.config.js
    ├── vite.config.js
    ├── package.json
    └── .env.example
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# edit .env: set MONGO_URI, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL
npm run dev        # nodemon, http://localhost:5000
```

**Gmail SMTP note:** you cannot use your normal Gmail password. Enable
2-Step Verification on the sending Gmail account, then create an
[App Password](https://myaccount.google.com/apppasswords) and use that
16-character value as `SMTP_PASS`. `NOTIFY_EMAIL` is the address that
receives lead notifications (defaults to jefrinabcde@gmail.com).

**MongoDB:** either run MongoDB locally (`mongodb://127.0.0.1:27017/innovexa-studios`)
or use a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster and paste
its connection string into `MONGO_URI`.

## 2. Frontend setup

```bash
cd frontend
npm install
npm run dev         # http://localhost:5173
```

The Vite dev server proxies `/api/*` requests to `http://localhost:5000`
(see `vite.config.js`), so the contact form works out of the box against
the local backend without any extra config. For production, set
`VITE_API_URL` to your deployed API's full contact endpoint.

## 3. Build for production

```bash
cd frontend
npm run build        # outputs static site to frontend/dist
```

Deploy `frontend/dist` to any static host (Vercel, Netlify, S3 + CloudFront)
and the `backend/` folder to any Node host (Render, Railway, EC2, etc.),
pointing `VITE_API_URL` / `CLIENT_URL` at each other's live URLs.
