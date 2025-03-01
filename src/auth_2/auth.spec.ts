 import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000';

test.describe('User Authentication', () => {
  test('should sign up a new user', async ({ request }) => {
    const response = await request.post(`${baseUrl}/auth/signup`, {
      data: {
        phoneNumber: '1234567890',
        userType: 'customer',
        provider: 'phone',
      },
    });
    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.message).toBe('User registered successfully!');
  });

  test('should verify user with correct OTP', async ({ request }) => {
    const response = await request.post(`${baseUrl}/auth/verify`, {
      data: {
        phoneNumber: '1234567890',
        userType: 'customer',
        verificationCode: '123456',
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toBe('User verified successfully!');
  });

  test('should not verify user with incorrect OTP', async ({ request }) => {
    const response = await request.post(`${baseUrl}/auth/verify`, {
      data: {
        phoneNumber: '1234567890',
        userType: 'customer',
        verificationCode: '999999',
      },
    });
    expect(response.status()).toBe(401);
  });
});
