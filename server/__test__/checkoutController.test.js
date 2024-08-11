const { handleCreateCheckoutSession } = require('../controllers/paymentController');
const { getBooks } = require('../services/bookService');
const { createCheckoutSession, findProduct } = require('../services/stripeService');

jest.mock('../services/bookService');
jest.mock('../services/stripeService');

describe('handleCreateCheckoutSession', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        quantity: 1,
        id: 'book1'
      }
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should return 404 if the book is not found in mock data', async () => {
    getBooks.mockReturnValue([]);

    await handleCreateCheckoutSession(req, res);

    expect(getBooks).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Product not found in mock data' });
  });

  it('should return 500 if finding product in Stripe fails', async () => {
    const mockBooks = [{ id: 'book1', title: 'Book 1', price: 100 }];
    getBooks.mockReturnValue(mockBooks);
    findProduct.mockRejectedValue(new Error('Stripe error'));

    await handleCreateCheckoutSession(req, res);

    expect(getBooks).toHaveBeenCalled();
    expect(findProduct).toHaveBeenCalledWith(mockBooks[0]);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error finding product in Stripe' });
  });

  it('should return 404 if the product is not found in Stripe', async () => {
    const mockBooks = [{ id: 'book1', title: 'Book 1', price: 100 }];
    getBooks.mockReturnValue(mockBooks);
    findProduct.mockResolvedValue(null);

    await handleCreateCheckoutSession(req, res);

    expect(getBooks).toHaveBeenCalled();
    expect(findProduct).toHaveBeenCalledWith(mockBooks[0]);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Product not found in Stripe' });
  });

  it('should return 500 if creating checkout session fails', async () => {
    const mockBooks = [{ id: 'book1', title: 'Book 1', price: 100 }];
    const mockProduct = { id: 'prod_123', default_price: 'price_123' };
    getBooks.mockReturnValue(mockBooks);
    findProduct.mockResolvedValue(mockProduct);
    createCheckoutSession.mockRejectedValue(new Error('Stripe error'));

    await handleCreateCheckoutSession(req, res);

    expect(getBooks).toHaveBeenCalled();
    expect(findProduct).toHaveBeenCalledWith(mockBooks[0]);
    expect(createCheckoutSession).toHaveBeenCalledWith(mockProduct.default_price, req.body.quantity);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error creating checkout session in Stripe' });
  });

  it('should return the session URL if successful', async () => {
    const mockBooks = [{ id: 'book1', title: 'Book 1', price: 100 }];
    const mockProduct = { id: 'prod_123', default_price: 'price_123' };
    const mockSession = { url: 'https://checkout.stripe.com/session_id' };
    getBooks.mockReturnValue(mockBooks);
    findProduct.mockResolvedValue(mockProduct);
    createCheckoutSession.mockResolvedValue(mockSession);

    await handleCreateCheckoutSession(req, res);

    expect(getBooks).toHaveBeenCalled();
    expect(findProduct).toHaveBeenCalledWith(mockBooks[0]);
    expect(createCheckoutSession).toHaveBeenCalledWith(mockProduct.default_price, req.body.quantity);
    expect(res.json).toHaveBeenCalledWith(mockSession.url);
  });
});
