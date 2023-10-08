import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [],
    selectedOrderItems: [],
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
            const sameOrderItems = state?.orderItems?.find((item) => item?.product === orderProductItems?.product);
            if (sameOrderItems) {
                sameOrderItems.amount += orderProductItems.amount;
            } else {
                state?.orderItems?.push(orderProductItems);
            }
        },
        setAmount: (state, action) => {
            const { productId, value } = action?.payload;
            // indicatedOrderItems contains the order items which are indicated in cart
            // orderItems means order items in cart
            const indicatedOrderItems = state?.orderItems?.find((item) => item?.product === productId);
            indicatedOrderItems.amount = value;
            // same with selected order items
            const indicatedSelectedOrderItems = state?.selectedOrderItems?.find((item) => item?.product === productId);
            if (indicatedSelectedOrderItems) {
                indicatedSelectedOrderItems.amount = value;
            }
        },
        increaseAmount: (state, action) => {
            const { productId, maxProductCount } = action?.payload;
            // indicatedOrderItems contains the order items which are indicated in cart
            // orderItems means order items in cart
            const indicatedOrderItems = state?.orderItems?.find((item) => item?.product === productId);
            if (indicatedOrderItems?.amount < maxProductCount) {
                indicatedOrderItems.amount++;
            }
            // same with selected order items
            const indicatedSelectedOrderItems = state?.selectedOrderItems?.find((item) => item?.product === productId);
            if (indicatedSelectedOrderItems?.amount < maxProductCount) {
                indicatedSelectedOrderItems.amount++;
            }
        },
        decreaseAmount: (state, action) => {
            const { productId, minProductCount } = action?.payload;
            // indicatedOrderItems contains the order items which are indicated in cart
            // orderItems means order items in cart
            const indicatedOrderItems = state?.orderItems?.find((item) => item?.product === productId);
            if (indicatedOrderItems?.amount > minProductCount) {
                indicatedOrderItems.amount--;
            }
            // same with selected order items
            const indicatedSelectedOrderItems = state?.selectedOrderItems?.find((item) => item?.product === productId);
            if (indicatedSelectedOrderItems?.amount > minProductCount) {
                indicatedSelectedOrderItems.amount--;
            }
        },
        removeOrderProduct: (state, action) => {
            const { productId } = action?.payload;
            // differentOrderItems contains the order items which are removed (filtering the others) 
            // orderItems means order items in cart
            const differentOrderItems = state?.orderItems?.filter((item) => item?.product !== productId);
            state.orderItems = differentOrderItems;
            // same with selected order items
            const differentSelectedOrderItems = state?.selectedOrderItems?.filter((item) => item?.product !== productId);
            state.selectedOrderItems = differentSelectedOrderItems;
        },
        removeMultipleOrderProducts: (state, action) => {
            const { listCheckedProducts } = action?.payload;
            // orderItemsNotInList contains multiple order items in list (filtering the others)
            // orderItems means order items in cart
            const orderItemsInList = state?.orderItems?.filter((item) => !listCheckedProducts.includes(item?.product));
            state.orderItems = orderItemsInList;
            // same with selected order items
            const selectedOrderItemsInList = state?.selectedOrderItems?.filter((item) => !listCheckedProducts.includes(item?.product));
            state.selectedOrderItems = selectedOrderItemsInList;
        },
        selectedOrderProducts: (state, action) => {
            const { listCheckedProducts } = action?.payload;
            const selectedOrderProducts = [];
            state.orderItems?.forEach((item) => {
                if (listCheckedProducts?.includes(item.product)) {
                    selectedOrderProducts.push(item);
                }
            });
            state.selectedOrderItems = selectedOrderProducts;
        },
    },
})

// Action creators are generated for each case reducer function
export const { 
    addOrderProduct, 
    setAmount, 
    increaseAmount, 
    decreaseAmount, 
    removeOrderProduct, 
    removeMultipleOrderProducts,
    selectedOrderProducts,
} = orderSlice.actions

export default orderSlice.reducer