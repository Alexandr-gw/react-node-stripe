const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {
  createCheckoutSession,
  findProduct,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../services/stripeService');
const { updateStripePriceId, updateUpdatedOn, getBooks } = require('../services/bookService');
const { listProducts } = require('../utils/stripeUtils');
const { v4: uuidv4 } = require('uuid');

jest.mock('stripe');
jest.mock('../services/bookService');
jest.mock('../utils/stripeUtils');
jest.mock('uuid');

describe('Stripe Service', () => {
  beforeEach(() => {
    stripe.products.create.mockClear();
    stripe.products.update.mockClear();
    stripe.prices.create.mockClear();
    stripe.prices.update.mockClear();
    stripe.checkout.sessions.create.mockClear();
  });

  describe('findProduct', () => {
    it('should find and return a product', async () => {
      const mockProducts = { data: [{ id: 'prod_123', name: 'Test Product' }] };
      listProducts.mockResolvedValue(mockProducts);

      const book = { id: 'prod_123', title: 'Test Book' };
      const product = await findProduct(book);

      expect(listProducts).toHaveBeenCalled();
      expect(product).toEqual(mockProducts.data[0]);
    });

    it('should throw an error if product is not found', async () => {
      listProducts.mockRejectedValue(new Error('Stripe error'));

      const book = { id: 'prod_123', title: 'Test Book' };

      await expect(findProduct(book)).rejects.toThrow('Could not find product in Stripe');
    });
  });

  describe('addProduct', () => {
    it('should add a product and return it', async () => {
      uuidv4.mockReturnValue('uuid_123');
      const mockProduct = { id: 'uuid_123', name: 'Test Product' };
      stripe.products.create.mockResolvedValue(mockProduct);

      const book = { title: 'Test Book', price: 100 };
      const product = await addProduct(book);

      expect(uuidv4).toHaveBeenCalled();
      expect(stripe.products.create).toHaveBeenCalledWith({
        id: 'uuid_123',
        name: 'Test Book',
        description: 'No description',
        default_price_data: {
          currency: 'cad',
          unit_amount: 10000,
        }
      });
      expect(product).toEqual(mockProduct);
    });

    it('should throw an error if product creation fails', async () => {
      stripe.products.create.mockRejectedValue(new Error('Stripe error'));

      const book = { title: 'Test Book', price: 100 };

      await expect(addProduct(book)).rejects.toThrow('Could not create product in Stripe');
    });
  });

  describe('updateProduct', () => {
    it('should update a product and return it', async () => {
      const mockProduct = { id: 'prod_123', name: 'Updated Product' };
      stripe.products.update.mockResolvedValue(mockProduct);
      const mockPrice = { id: 'price_123' };
      stripe.prices.create.mockResolvedValue(mockPrice);
      getBooks.mockReturnValue([{ id: 'prod_123', stripePriceId: 'price_456' }]);

      const book = { title: 'Updated Book', price: 200 };
      await updateProduct('prod_123', book);

      expect(stripe.products.update).toHaveBeenCalledWith('prod_123', {
        name: 'Updated Book',
        description: 'No description',
      });
      expect(stripe.prices.create).toHaveBeenCalledWith({
        currency: 'cad',
        unit_amount: 20000,
        product: 'prod_123'
      });
      expect(stripe.products.update).toHaveBeenCalledWith('prod_123', {
        default_price: 'price_123',
      });
      expect(stripe.prices.update).toHaveBeenCalledWith('price_456', {
        active: false
      });
      expect(updateStripePriceId).toHaveBeenCalledWith('prod_123', 'price_123');
      expect(updateUpdatedOn).toHaveBeenCalledWith('prod_123', false);
    });

    it('should log an error if book is not provided', async () => {
      console.log = jest.fn();
      await updateProduct('prod_123', null);
      expect(console.log).toHaveBeenCalledWith('Error occur while updating book in Stripe API');
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product by deactivating it', async () => {
      const mockProducts = { data: [{ id: 'prod_123' }] };
      listProducts.mockResolvedValue(mockProducts);

      await deleteProduct('prod_123');

      expect(listProducts).toHaveBeenCalled();
      expect(stripe.products.update).toHaveBeenCalledWith('prod_123', {
        active: false
      });
    });

    it('should throw an error if product deletion fails', async () => {
      listProducts.mockRejectedValue(new Error('Stripe error'));

      await expect(deleteProduct('prod_123')).rejects.toThrow('Could not delete product in Stripe');
    });
  });

  describe('createCheckoutSession', () => {
    it('should create a checkout session and return it', async () => {
      const mockSession = { id: 'sess_123', url: 'https://checkout.stripe.com/session_id' };
      stripe.checkout.sessions.create.mockResolvedValue(mockSession);

      const session = await createCheckoutSession('price_123');

      expect(stripe.checkout.sessions.create).toHaveBeenCalledWith({
        line_items: [
          {
            price: 'price_123',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/SuccessPage`,
        cancel_url: `${process.env.CLIENT_URL}/CancelPage`,
      });
      expect(session).toEqual(mockSession);
    });
  });
});
