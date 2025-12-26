// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';  // ← Change 'rest' to 'http' and add HttpResponse

export const handlers = [
  http.post('/api/login', async ({ request }) => {  // ← Use http.post and { request }
    const { email, password } = await request.json();  // ← Parse body like this

    if (email === 'admin@gmail.com' && password === 'Admin123') {
      return HttpResponse.json({
        msg: 'Login successful',
        token: 'fake-jwt-token',  // keep this fake one for test consistency
        user: {
          id: '69382642cc9bd093dcbf93aa',
          name: 'admin',
          email: 'admin@gmail.com',
          role: 'admin'
        },
        redirectTo: '/admin/dashboard'
      });
    }

    return HttpResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }),
];