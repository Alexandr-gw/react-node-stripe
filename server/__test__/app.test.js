const request = require('supertest');
const express = require('express');
const paymentRoutes = require('../routes/paymentRoutes'); 
const bookRoutes = require('../routes/bookRoutes'); 

jest.mock('../controllers/paymentController');
jest.mock('../controllers/bookController');

const { handleCreateCheckoutSession } = require('../controllers/paymentController');
const {
    getBooks,
    addBook,
    updateBook,
    deleteBook,
} = require('../controllers/bookController');

const app = express();
app.use(express.json()); 
app.use('/api/payment', paymentRoutes);
app.use('/api/books', bookRoutes);

describe('Integration Tests for Payment and Book Routes', () => {
    describe('/api/payment', () => {
        it('POST /create-checkout-session should call handleCreateCheckoutSession', async () => {
            handleCreateCheckoutSession.mockImplementation((req, res) => {
                res.status(200).json({ id: 'sess_123', url: 'https://checkout.stripe.com/session_id' });
            });

            const response = await request(app)
                .post('/api/payment/create-checkout-session')
                .send({ stripePriceId: 'price_123' });

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('id', 'sess_123');
            expect(response.body).toHaveProperty('url', 'https://checkout.stripe.com/session_id');
            expect(handleCreateCheckoutSession).toHaveBeenCalled();
        });
    });

    describe('/api/books', () => {
        it('GET / should return all books', async () => {
            const mockBooks = [{ id: '1', title: 'Book One' }, { id: '2', title: 'Book Two' }];
            getBooks.mockImplementation((req, res) => {
                res.status(200).json(mockBooks);
            });

            const response = await request(app).get('/api/books');

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockBooks);
            expect(getBooks).toHaveBeenCalled();
        });

        it('POST / should add a new book', async () => {
            const newBook = { title: 'New Book' };
            const savedBook = { id: '3', title: 'New Book' };
            addBook.mockImplementation((req, res) => {
                res.status(201).json(savedBook);
            });

            const response = await request(app)
                .post('/api/books')
                .send(newBook);

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual(savedBook);
            expect(addBook).toHaveBeenCalled();
        });

        it('PUT /:id should update a book', async () => {
            const updatedBook = { title: 'Updated Book' };
            const mockUpdatedBook = { id: '1', title: 'Updated Book' };
            updateBook.mockImplementation((req, res) => {
                res.status(200).json(mockUpdatedBook);
            });

            const response = await request(app)
                .put('/api/books/1')
                .send(updatedBook);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockUpdatedBook);
            expect(updateBook).toHaveBeenCalled();
        });

        it('DELETE /:id should delete a book', async () => {
            deleteBook.mockImplementation((req, res) => {
                res.status(204).end();
            });

            const response = await request(app).delete('/api/books/1');

            expect(response.statusCode).toBe(204);
            expect(response.body).toEqual({});
            expect(deleteBook).toHaveBeenCalled();
        });
    });
});  