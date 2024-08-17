jest.mock('stripe');
jest.mock('../services/bookService');
jest.mock('../utils/stripeUtils');
jest.mock('uuid');

describe('Stripe Service', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('findProduct', () => {
        beforeEach(() => {
          jest.resetModules();
          jest.restoreAllMocks();
        });
      
        it('should find and return a product', async () => {
          const mockProducts = { data: [{ id: 'prod_123', name: 'Test Product' }] };
      
          jest.spyOn(require('../utils/stripeUtils'), 'listProducts').mockResolvedValue(mockProducts);
      
          const book = { id: 'prod_123', title: 'Test Book' };
          const { findProduct } = require('../services/stripeService');
      
          const product = await findProduct(book);
      
          expect(require('../utils/stripeUtils').listProducts).toHaveBeenCalled();
          expect(product).toEqual(mockProducts.data[0]);
        });
      
        it('should throw an error if product is not found', async () => {
          jest.spyOn(require('../utils/stripeUtils'), 'listProducts').mockRejectedValue(new Error('Stripe error'));
      
          const book = { id: 'prod_123', title: 'Test Book' };
          const { findProduct } = require('../services/stripeService');
      
          await expect(findProduct(book)).rejects.toThrow('Could not find product in Stripe');
        });
      });
      

    describe('addProduct', () => {
        beforeEach(() => {
            jest.resetModules();
        });

        it('should add a product and return it', async () => {
            const book = { title: "New", author: "ew", price: "12", read: false };

            const mockStripe = {
                products: {
                    create: jest.fn().mockResolvedValue({
                        title: "New",
                        author: "ew",
                        price: "12",
                        read: false,
                        id: "22ffe251-636a-41d9-a655-81fb01a7c87d"
                    })
                }
            };

            jest.mock('stripe', () => {
                return jest.fn(() => mockStripe);
            });

            const { addProduct } = require('../services/stripeService');

            const result = await addProduct(book);


            expect(mockStripe.products.create).toHaveBeenCalledTimes(1);

            expect(result).toEqual({
                title: "New",
                author: "ew",
                price: "12",
                read: false,
                id: "22ffe251-636a-41d9-a655-81fb01a7c87d"
            });
        });

        it('should throw an error if product creation fails', async () => {
            jest.resetAllMocks();

            const mockStripe = {
                products: {
                    create: jest.fn().mockRejectedValue(new Error('Stripe error'))
                }
            };

            jest.mock('stripe', () => {
                return jest.fn(() => mockStripe);
            });

            const book = { title: "New", author: "ew", price: "12", read: false };

            const { addProduct } = require('../services/stripeService');

            await expect(addProduct(book)).rejects.toThrow('Could not create product in Stripe');
            expect(mockStripe.products.create).toHaveBeenCalledTimes(1);

        });

    });

    describe('updateProduct', () => {
        beforeEach(() => {
            jest.resetModules();
            jest.resetAllMocks();
        });

        it('should update a product and return it', async () => {
            console.log = jest.fn();

            const mockProduct = { id: 'prod_123', name: 'Updated Product' };
            const mockPrice = { id: 'price_123' };

            const mockStripe = {
                products: {
                    update: jest.fn().mockResolvedValue(mockProduct),
                },
                prices: {
                    create: jest.fn().mockResolvedValue(mockPrice),
                    update: jest.fn(),
                },
            };

            jest.mock('stripe', () => jest.fn(() => mockStripe));

            jest.mock('../services/bookService', () => ({
                updateStripePriceId: jest.fn(),
                updateUpdatedOn: jest.fn(),
                getBooks: jest.fn().mockReturnValue([
                    { id: 'prod_123', stripePriceId: 'price_456' },
                ]),
            }));

            const { updateProduct } = require('../services/stripeService');

            const req = {
                params: { id: 'prod_123' },
                body: { title: 'Updated Book', price: 200 },
            };

            await updateProduct('prod_123', req.body);

            expect(mockStripe.products.update).toHaveBeenCalledWith('prod_123', {
                name: 'Updated Book',
                description: 'No description',
            });

            expect(mockStripe.prices.create).toHaveBeenCalledWith({
                currency: 'cad',
                unit_amount: 20000,
                product: 'prod_123',
            });

            expect(mockStripe.products.update).toHaveBeenCalledWith('prod_123', {
                default_price: 'price_123',
            });

            expect(mockStripe.prices.update).toHaveBeenCalledWith('price_456', { active: false });
            expect(console.log).toHaveBeenCalledWith('---Book Updated Book updated in Stripe API ---');
        });

        it('should log an error if book is not provided', async () => {
            console.log = jest.fn();
            const { updateProduct } = require('../services/stripeService');

            await updateProduct('prod_123', null);

            expect(console.log).toHaveBeenCalledWith('Error occur while updating book in Stripe API');
        });
    });

    describe('deleteProduct', () => {
        beforeEach(() => {
            jest.resetModules();
            jest.resetAllMocks();
        });

        it('should deactivate a product if it exists', async () => {
            const mockProducts = { data: [{ id: 'prod_123', name: 'Test Product' }] };
            const mockId = 'prod_123';

            const mockStripe = {
                products: {
                    update: jest.fn().mockResolvedValue(),
                }
            };

            jest.mock('stripe', () => {
                return jest.fn(() => mockStripe);
            });

            jest.spyOn(require('../utils/stripeUtils'), 'listProducts').mockResolvedValue(mockProducts);

            const { deleteProduct } = require('../services/stripeService');

            await deleteProduct(mockId);

            expect(mockStripe.products.update).toHaveBeenCalledWith('prod_123', { active: false });

            jest.restoreAllMocks();
        });

        it('should not call stripe.products.update if product does not exist', async () => {
            const mockProducts = { data: [] };
            const mockStripe = {
                products: {
                    update: jest.fn(),
                },
            };

            jest.mock('stripe', () => jest.fn(() => mockStripe));

            jest.spyOn(require('../utils/stripeUtils'), 'listProducts').mockResolvedValue(mockProducts);

            const { deleteProduct } = require('../services/stripeService');

            await deleteProduct('prod_123');

            expect(mockStripe.products.update).not.toHaveBeenCalled();
        });

        it('should throw an error if there is an issue deleting the product', async () => {
            const mockProducts = {
                data: [{ id: 'prod_123', name: 'Test Product' }],
            };

            const mockStripe = {
                products: {
                    update: jest.fn().mockRejectedValue(new Error('Stripe error')),
                },
            };

            jest.mock('stripe', () => jest.fn(() => mockStripe));

            jest.spyOn(require('../utils/stripeUtils'), 'listProducts').mockResolvedValue(mockProducts);

            const { deleteProduct } = require('../services/stripeService');

            await expect(deleteProduct('prod_123')).rejects.toThrow('Could not delete product in Stripe');
            expect(mockStripe.products.update).toHaveBeenCalledWith('prod_123', { active: false });
        });

        it('should log an error if the listProducts call fails', async () => {
            const mockStripe = {
                products: {
                    update: jest.fn(),
                },
            };

            jest.mock('stripe', () => jest.fn(() => mockStripe));

            jest.spyOn(require('../utils/stripeUtils'), 'listProducts').mockRejectedValue(new Error('List products error'));

            console.error = jest.fn();

            const { deleteProduct } = require('../services/stripeService');

            await expect(deleteProduct('prod_123')).rejects.toThrow('Could not delete product in Stripe');
            expect(console.error).toHaveBeenCalledWith('Error deleting product in Stripe:', expect.any(Error));
            expect(mockStripe.products.update).not.toHaveBeenCalled();
        });
    });


    describe('createCheckoutSession', () => {
        let mockStripe;

        beforeEach(() => {
            jest.resetModules();
            jest.restoreAllMocks();

            mockStripe = {
                checkout: {
                    sessions: {
                        create: jest.fn(),
                    },
                },
            };

            jest.mock('stripe', () => jest.fn(() => mockStripe));
        });

        it('should create a checkout session and return it', async () => {
            const mockSession = { id: 'sess_123', url: 'https://checkout.stripe.com/session_id' };
            mockStripe.checkout.sessions.create.mockResolvedValue(mockSession);

            const stripePriceId = 'price_123';

            const { createCheckoutSession } = require('../services/stripeService');
            const session = await createCheckoutSession(stripePriceId);

            expect(mockStripe.checkout.sessions.create).toHaveBeenCalledWith({
                line_items: [
                    {
                        price: stripePriceId,
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${process.env.CLIENT_URL}/SuccessPage`,
                cancel_url: `${process.env.CLIENT_URL}/CancelPage`,
            });
            expect(session).toEqual(mockSession);
        });

        it('should throw an error if creating checkout session fails', async () => {
            mockStripe.checkout.sessions.create.mockRejectedValue(new Error('Stripe error'));

            const stripePriceId = 'price_123';

            const { createCheckoutSession } = require('../services/stripeService');

            await expect(createCheckoutSession(stripePriceId)).rejects.toThrow('Stripe error');
            expect(mockStripe.checkout.sessions.create).toHaveBeenCalledWith({
                line_items: [
                    {
                        price: stripePriceId,
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${process.env.CLIENT_URL}/SuccessPage`,
                cancel_url: `${process.env.CLIENT_URL}/CancelPage`,
            });
        });
    });

});