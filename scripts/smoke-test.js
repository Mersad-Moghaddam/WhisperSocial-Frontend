const http = require('http')

const services = [
  { name: 'auth', path: '/api/auth/health' },
  { name: 'posts', path: '/api/posts/health' },
  { name: 'follow', path: '/api/follow/health' },
  { name: 'timeline', path: '/api/timeline/health' },
]

function check(path) {
  return new Promise((resolve) => {
    const opts = { hostname: 'localhost', port: 3000, path, method: 'GET' }
    const req = http.request(opts, (res) => {
      resolve({ path, statusCode: res.statusCode })
    })
    req.on('error', (err) => resolve({ path, error: err.message }))
    req.end()
  })
}

;(async () => {
  console.log('Running smoke tests against Vite dev server proxy (http://localhost:3000)')
  for (const s of services) {
    // eslint-disable-next-line no-await-in-loop
    const res = await check(s.path)
    if (res.error) {
      console.log(`${s.name}: ERROR - ${res.error}`)
    } else {
      console.log(`${s.name}: HTTP ${res.statusCode}`)
    }
  }
})()
