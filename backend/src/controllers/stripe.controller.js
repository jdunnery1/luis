import stripe from "stripe";

const nStripe = new stripe(`sk_test_51RKLaSD5mItnEVPOik9KQXsbUBD7ctUWa2PnKnOicQCoMo2Y7P12VabU91bGCrdCkcUw8bptzlUMZIaX3Y3yxFoT00gyF8sDs7`)


export const createSession = async(req, res) => {
    try {
        const products = req.body.products
        const lineItems = products.map((product)=>({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.title,
                    images: []
                },
                unit_amount:product.price*100
            },
            quantity: 1
        }))

        const session = await nStripe.checkout.sessions.create({
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
            },
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/checkout'
        })

        res.json({id: session.id})

    } catch (e) {
        console.log(e)
    }
}