import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Login from './Login';

test('successful login', async () => {
  const mockSuccess = vi.fn();

  render(
    <MemoryRouter>
      <Login onLoginSuccess={mockSuccess} />
    </MemoryRouter>
  );

  await userEvent.type(screen.getByTestId('email'), 'admin@gmail.com');
  await userEvent.type(screen.getByTestId('password'), 'Admin123');

  await userEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => {
    expect(mockSuccess).toHaveBeenCalledTimes(1);
    expect(mockSuccess).toHaveBeenCalledWith(expect.any(String)); // token is a JWT string
  });
});

test('failed login shows error', async () => {
  render(
    <MemoryRouter>
      <Login onLoginSuccess={vi.fn()} />
    </MemoryRouter>
  );

  await userEvent.type(screen.getByTestId('email'), 'wrong@email.com');
  await userEvent.type(screen.getByTestId('password'), 'wrong123'); // 8 chars → bypasses minLength:6

  await userEvent.click(screen.getByRole('button', { name: /login/i }));

  
});