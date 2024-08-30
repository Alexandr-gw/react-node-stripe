const request = require('supertest');
const app = require('../app'); 

describe('POST /api/books', () => {
  test('should return 201 for valid book data', async () => {
    const validBook = {
      title: 'A Great Book',
      author: 'Jane Doe',
      price: 19.99,
      read: true,
    };

    const response = await request(app).post('/api/books').send(validBook);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Book added successfully');
    expect(response.body.book).toMatchObject(validBook);
  });

  test('should return 400 and validation errors for missing title', async () => {
    const invalidBook = {
      title: '',
      author: 'Jane Doe',
      price: 19.99,
      read: true,
    };

    const response = await request(app).post('/api/books').send(invalidBook);

    expect(response.status).toBe(400);
    expect(response.body.errors).toContain('Title is required');
  });

  test('should return 400 and validation errors for missing author', async () => {
    const invalidBook = {
      title: 'A Great Book',
      author: '',
      price: 19.99,
      read: true,
    };

    const response = await request(app).post('/api/books').send(invalidBook);

    expect(response.status).toBe(400);
    expect(response.body.errors).toContain('Author is required');
  });

  test('should return 400 and validation errors for missing price', async () => {
    const invalidBook = {
      title: 'A Great Book',
      author: 'Jane Doe',
      price: '',
      read: true,
    };

    const response = await request(app).post('/api/books').send(invalidBook);

    expect(response.status).toBe(400);
    expect(response.body.errors).toContain('Price must be a number');
  });

  test('should return 400 and validation errors for negative price', async () => {
    const invalidBook = {
      title: 'A Great Book',
      author: 'Jane Doe',
      price: -5,
      read: true,
    };

    const response = await request(app).post('/api/books').send(invalidBook);

    expect(response.status).toBe(400);
    expect(response.body.errors).toContain('Price must be greater than 0');
  });

  test('should allow the "read" field to be optional', async () => {
    const validBookWithoutRead = {
      title: 'A Great Book',
      author: 'Jane Doe',
      price: 19.99,
    };

    const response = await request(app).post('/api/books').send(validBookWithoutRead);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Book added successfully');
    expect(response.body.book).toMatchObject(validBookWithoutRead);
  });
});
