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
            const { productId } = action?.payload;
            // indicatedOrderItems contains the order items which are indicated in cart
            // orderItems means order items in cart
            const indicatedOrderItems = state?.orderItems?.find((item) => item?.product === productId);
            indicatedOrderItems.amount++;
        },
        decreaseAmount: (state, action) => {
            const { productId } = action?.payload;
            // indicatedOrderItems contains the order items which are indicated in cart
            // orderItems means order items in cart
            const indicatedOrderItems = state?.orderItems?.find((item) => item?.product === productId);
            indicatedOrderItems.amount--;
        },
        removeOrderProduct: (state, action) => {
            const { productId } = action?.payload;
            // differentOrderItems contains the order items which are removed (filtering the others) 
            // orderItems means order items in cart
            const differentOrderItems = state?.orderItems?.filter((item) => item?.product !== productId);
            state.orderItems = differentOrderItems;
        },
        removeMultipleOrderProducts: (state, action) => {
            const { listCheckedProducts } = action?.payload;
            // orderItemsNotInList contains multiple order items in list (filtering the others)
            // orderItems means order items in cart
            const orderItemsInList = state?.orderItems?.filter((item) => !listCheckedProducts.includes(item?.product));
            state.orderItems = orderItemsInList;
        },
    },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, removeMultipleOrderProducts } = orderSlice.actions

export default orderSlice.reducer