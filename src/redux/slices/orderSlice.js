import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [],
    shippingAddress: {},
    paymentMethod: '',
    itemPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            // orderProductItems means order items which are about to be added to cart
            const { orderProductItems } = action?.payload;
            // sameOrderItems means there are the same order items in cart 
            // orderItems means order items in cart
            const sameOrderItems = state?.orderItems?.find((item) => item?.product === orderProductItems.product);
            if (sameOrderItems) {
                sameOrderItems.amount += orderProductItems.amount;
            } else {
                state.orderItems.push(orderProductItems);
            }
        },
        increaseAmount: (state, action) => {
            const {productId} = action?.payload;
            // indicatedOrderItems means the order items which are indicated in cart
            // orderItems means order items in cart
            const indicatedOrderItems = state?.orderItems?.find((item) => item?.product === productId);
            indicatedOrderItems.amount++;
        },
        decreaseAmount: (state, action) => {
            const {productId} = action?.payload;
            // indicatedOrderItems means the order items which are indicated in cart
            // orderItems means order items in cart
            const indicatedOrderItems = state?.orderItems?.find((item) => item?.product === productId);
            indicatedOrderItems.amount--;
        },
        removeOrderProduct: (state, action) => {
            const { productId } = action?.payload;
            // differentOrderItems means there are the different order items in cart 
            // orderItems means order items in cart
            const differentOrderItems = state?.orderItems?.find((item) => item?.product !== productId);
            differentOrderItems.orderItems = differentOrderItems;
        },
    },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct } = orderSlice.actions

export default orderSlice.reducer