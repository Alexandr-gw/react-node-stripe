const request = require('supertest');
const app = require('../app');
const { addProduct } = require('../services/stripeService');
require('uuid');

jest.mock('../services/stripeService');
jest.mock('uuid', () => ({ v4: () => '123456789' }));

describe('bookValidation middleware', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/books/', () => {
    test('should return 200 for valid book data', async () => {
      const validBook = {
        title: 'An added Book',
        author: 'Jane Doe',
        price: 25.99,
        read: false
      };

      const responseBook = {
        author: 'Jane Doe',
        id: expect.any(String),
        price: "25.99",
        read: false,
        stripePriceId: null,
        title: 'An added Book',
        updatedOn: null
      };

      addProduct.mockResolvedValue('mockedBook');

      const response = await request(app).post('/api/books/').send(validBook);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        book: responseBook
      });
      expect(response.body.book).toMatchObject(validBook);
    });

    test('should return 400 and validation errors for missing title', async () => {
      const invalidBook = {
        title: '',
        author: 'Jane Doe',
        price: 25.99,
        read: false
      };

      const response = await request(app).post('/api/books').send(invalidBook);

      expect(response.status).toBe(400);
      expect(response.body.errors).toContain('Title is required');
    });

    test('should return 400 and validation errors for missing author', async () => {
      const invalidBook = {
        title: 'An Updated Book',
        author: '',
        price: 25.99,
        read: false
      };

      const response = await request(app).post('/api/books').send(invalidBook);

      expect(response.status).toBe(400);
      expect(response.body.errors).toContain('Author is required');
    });

    test('should return 400 and validation errors for invalid price', async () => {
      const invalidBook = {
        title: 'An added Book',
        author: 'Jane Doe',
        price: -10,
        read: false
      };

      const response = await request(app).post('/api/books').send(invalidBook);

      expect(response.status).toBe(400);
      expect(response.body.errors).toContain('Price must be greater than 0');
    });
  });

  describe('PUT /api/books', () => {
    test('should return 201 for valid book data', async () => {
      const validBook = {
        id: "02a1364f-db9a-4a0c-846a-f9f607e004f3",
        title: 'A Great Book',
        author: 'Jane Doe',
        price: 19.99,
        read: true,
        stripePriceId: "price_1PthfkRtZj5jJHBhXDcY0mxu",
        updatedOn: null
      };

      const response = await request(app).put('/api/books/02a1364f-db9a-4a0c-846a-f9f607e004f3').send(validBook);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Book added successfully');
      expect(response.body.book).toMatchObject(validBook);
    });

    test('should return 400 and validation errors for missing title', async () => {
      const invalidBook = {
        id: "02a1364f-db9a-4a0c-846a-f9f607e004f3",
        title: '',
        author: 'Jane Doe',
        price: 19.99,
        read: true,
        stripePriceId: "price_1PthfkRtZj5jJHBhXDcY0mxu",
        updatedOn: null
      };

      const response = await request(app).put('/api/books/02a1364f-db9a-4a0c-846a-f9f607e004f3').send(invalidBook);

      expect(response.status).toBe(400);
      expect(response.body.errors).toContain('Title is required');
    });

    test('should return 400 and validation errors for missing author', async () => {
      const invalidBook = {
        id: "02a1364f-db9a-4a0c-846a-f9f607e004f3",
        title: 'A Great Book',
        author: '',
        price: 19.99,
        read: true,
        stripePriceId: "price_1PthfkRtZj5jJHBhXDcY0mxu",
        updatedOn: null
      };

      const response = await request(app).put('/api/books/02a1364f-db9a-4a0c-846a-f9f607e004f3').send(invalidBook);

      expect(response.status).toBe(400);
      expect(response.body.errors).toContain('Author is required');
    });

    test('should return 400 and validation errors for missing price', async () => {
      const invalidBook = {
        id: "02a1364f-db9a-4a0c-846a-f9f607e004f3",
        title: 'A Great Book',
        author: 'Jane Doe',
        price: '',
        read: true,
        stripePriceId: "price_1PthfkRtZj5jJHBhXDcY0mxu",
        updatedOn: null
      };

      const response = await request(app).put('/api/books/02a1364f-db9a-4a0c-846a-f9f607e004f3').send(invalidBook);

      expect(response.status).toBe(400);
      expect(response.body.errors).toContain('Price must be a number');
    });

    test('should return 400 and validation errors for negative price', async () => {
      const invalidBook = {
        id: "02a1364f-db9a-4a0c-846a-f9f607e004f3",
        title: 'A Great Book',
        author: 'Jane Doe',
        price: -5,
        read: true,
        stripePriceId: "price_1PthfkRtZj5jJHBhXDcY0mxu",
        updatedOn: null
      };

      const response = await request(app).put('/api/books/02a1364f-db9a-4a0c-846a-f9f607e004f3').send(invalidBook);

      expect(response.status).toBe(400);
      expect(response.body.errors).toContain('Price must be greater than 0');
    });
  });
});