const bookService = require('../services/bookService');
const { addProduct, updateProduct, deleteProduct } = require('../services/stripeService');
const { getBooks, addBook, updateBook, deleteBook } = require('../controllers/bookController');

jest.mock('../services/bookService');
jest.mock('../services/stripeService');

describe('Book Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            end: jest.fn(),
        };
    });

    describe('getBooks', () => {
        it('should return a list of books', async () => {
            const mockBooks = [{ id: '1', title: 'Test Book' }];
            bookService.getBooks.mockReturnValue(mockBooks);

            await getBooks(req, res);

            expect(bookService.getBooks).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockBooks);
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            bookService.getBooks.mockImplementation(() => {
                throw error;
            });

            await getBooks(req, res);

            expect(bookService.getBooks).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Could not fetch books' });
        });
    });

    describe('addBook', () => {
        it('should add a book and return it', async () => {
            const mockBook = { title: 'New Book' };
            const mockProduct = { id: 'prod_123' };
            const mockSavedBook = { ...mockBook, id: '1', stripeProductId: 'prod_123' };

            req.body = mockBook;
            addProduct.mockResolvedValue(mockProduct);
            bookService.addBook.mockReturnValue(mockSavedBook);

            await addBook(req, res);

            expect(addProduct).toHaveBeenCalledWith(mockBook);
            expect(bookService.addBook).toHaveBeenCalledWith(mockBook, mockProduct);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockSavedBook);
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.body = { title: 'New Book' };
            addProduct.mockRejectedValue(error);

            await addBook(req, res);

            expect(addProduct).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Could not add book' });
        });
    });

    describe('updateBook', () => {
        it('should update a book and return it', async () => {
            const mockUpdatedBook = { title: 'Updated Book' };
            const mockBook = { id: '1', ...mockUpdatedBook };

            req.params = { id: '1' };
            req.body = mockUpdatedBook;
            updateProduct.mockResolvedValue();
            bookService.updateBook.mockReturnValue(mockBook);

            await updateBook(req, res);

            expect(updateProduct).toHaveBeenCalledWith('1', mockUpdatedBook);
            expect(bookService.updateBook).toHaveBeenCalledWith('1', mockUpdatedBook);
            expect(bookService.updateUpdatedOn).toHaveBeenCalledWith('1', true);
            expect(res.json).toHaveBeenCalledWith(mockBook);
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params = { id: '1' };
            req.body = { title: 'Updated Book' };
            updateProduct.mockRejectedValue(error);

            await updateBook(req, res);

            expect(updateProduct).toHaveBeenCalledWith('1', req.body);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Could not update book' });
        });
    });

    describe('deleteBook', () => {
        it('should delete a book and return 204', async () => {
            req.params = { id: '1' };

            await deleteBook(req, res);

            expect(deleteProduct).toHaveBeenCalledWith('1');
            expect(bookService.deleteBook).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.end).toHaveBeenCalled();
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params = { id: '1' };
            deleteProduct.mockRejectedValue(error);

            await deleteBook(req, res);

            expect(deleteProduct).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Could not delete book' });
        });
    });
});
