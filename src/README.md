Local frontend src notes.

- API endpoints are configured via env vars:
  - VITE_AUTH_URL (auth_service, default http://127.0.0.1:8080)
  - VITE_POST_URL (post_service, default http://127.0.0.1:8084)
  - VITE_TIMELINE_URL (timeline_service, default http://127.0.0.1:8085)
  - VITE_FOLLOW_URL (follow_service, default http://127.0.0.1:8082)

- Auth token is stored in localStorage under `token`.
- Use `npm run dev` to start the app after installing deps.
