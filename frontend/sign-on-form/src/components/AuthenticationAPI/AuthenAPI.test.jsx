import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { login, register, useLogout } from "./AuthenAPI.jsx";
//import { useNavigate } from 'react-router-dom';



// Mock setup
describe('Authentication API', () => {
  let mock;

  // Initializes the mock adapter before all tests
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  // Resets the mock adapter after each test to ensure clean state
  afterEach(() => {
    mock.reset();
  });

  // Restores Axios to its original state after all tests
  afterAll(() => {
    mock.restore();
  });

  // Tests success and failure cases for login
  describe('login', () => {
    it('should log in successfully and save token', async () => {
      const mockToken = 'mock-jwt-token';
      const mockResponse = { token: mockToken };

      mock.onPost('http://localhost:8000/api/login').reply(200, mockResponse);

      const result = await login('testuser', 'password123');
      expect(result).toBe(true);
      expect(localStorage.getItem('token')).toBe(mockToken);
    });

    it('should fail login with incorrect credentials', async () => {
      mock.onPost('http://localhost:8000/api/login').reply(401, { error: 'Invalid credentials' });

      const result = await login('wronguser', 'wrongpassword');
      expect(result).toBe(false);
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  // Tests success and failure cases for registering
  describe('register', () => {
    it('should register successfully', async () => {
      const mockResponse = { message: 'User registered successfully' };

      mock.onPost('http://localhost:8000/api/signup').reply(201, mockResponse);

      const result = await register('newuser', 'newuser@example.com', 'password123');
      expect(result).toBe(true);
    });

    it('should fail registration with existing username', async () => {
      mock.onPost('http://localhost:8000/api/signup').reply(400, { error: 'Username already exists' });

      const result = await register('existinguser', 'existinguser@example.com', 'password123');
      expect(result).toBe(false);
    });
  });
});