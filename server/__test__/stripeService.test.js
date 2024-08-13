const stripe = require('stripe');
const {
    createCheckoutSession,
    findProduct,
    addProduct,
    updateProduct,
    deleteProduct
} = require('../services/stripeService');
const { updateStripePriceId, updateUpdatedOn, getBooks } = require('../services/bookService');
const { listProducts } = require('../utils/stripeUtils');

jest.mock('stripe');
jest.mock('../services/bookService');
jest.mock('../utils/stripeUtils');
jest.mock('uuid');

describe('Stripe Service', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            params: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            end: jest.fn()
        };

        jest.resetAllMocks();
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
        beforeEach(() => {
            jest.resetModules();
        });

        test('should add a product and return it', async () => {
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
            
            await addProduct(book);

            expect(mockStripe.products.create).toHaveBeenCalledWith(500);
            //expect(res.json).toHaveBeenCalledWith({ error: 'Could not create product in Stripe' });
        });
    });

    describe('updateProduct', () => {
        it('should update a product and return it', async () => {
            const mockProduct = { id: 'prod_123', name: 'Updated Product' };
            stripe.products.update.mockResolvedValue(mockProduct);
            const mockPrice = { id: 'price_123' };
            stripe.prices.create.mockResolvedValue(mockPrice);
            getBooks.mockReturnValue([{ id: 'prod_123', stripePriceId: 'price_456' }]);

            req.params.id = 'prod_123';
            req.body = { title: 'Updated Book', price: 200 };

            await updateProduct(req, res);

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
            expect(res.json).toHaveBeenCalledWith(mockProduct);
        });

        it('should log an error if book is not provided', async () => {
            console.log = jest.fn();
            await updateProduct(req, res);

            expect(console.log).toHaveBeenCalledWith('Error occur while updating book in Stripe API');
        });
    });

    describe('deleteProduct', () => {
        it('should delete a product by deactivating it', async () => {
            const mockProducts = { data: [{ id: 'prod_123' }] };
            listProducts.mockResolvedValue(mockProducts);

            req.params.id = 'prod_123';

            await deleteProduct(req, res);

            expect(listProducts).toHaveBeenCalled();
            expect(stripe.products.update).toHaveBeenCalledWith('prod_123', {
                active: false
            });
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.end).toHaveBeenCalled();
        });

        it('should throw an error if product deletion fails', async () => {
            listProducts.mockRejectedValue(new Error('Stripe error'));

            req.params.id = 'prod_123';

            await deleteProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Could not delete product in Stripe' });
        });
    });

    describe('createCheckoutSession', () => {
        it('should create a checkout session and return it', async () => {
            const mockSession = { id: 'sess_123', url: 'https://checkout.stripe.com/session_id' };
            stripe.checkout.sessions.create.mockResolvedValue(mockSession);

            req.body.stripePriceId = 'price_123';

            await createCheckoutSession(req, res);

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
            expect(res.json).toHaveBeenCalledWith(mockSession.url);
        });

        it('should return an error if creating checkout session fails', async () => {
            stripe.checkout.sessions.create.mockRejectedValue(new Error('Stripe error'));

            req.body.stripePriceId = 'price_123';

            await createCheckoutSession(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Could not create checkout session in Stripe' });
        });
    });
});
