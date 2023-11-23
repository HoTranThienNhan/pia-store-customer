import { createSlice } from '@reduxjs/toolkit';
import * as MessagePopup from '../../components/MessagePopupComponent/MessagePopupComponent';

const initialState = [];

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        createFavoriteState: (state, action) => {
            const userId = action?.payload;
            // if user id exists (signed in)
            if (userId) {
                let isExistedFavoriteState = false;
                // check if user favorite state exists
                state.map((favorite) => {
                    if (favorite.user === userId) {
                        isExistedFavoriteState = true;
                    }
                })
                // if state or user favorite state was not created, create new favorite state
                if (state.length === 0 || isExistedFavoriteState === false) {
                    const initState = {
                        favoriteItems: [],
                        user: userId,
                    }
                    state.push(initState);
                }
            }
        },
        toggleFavoriteProduct: (state, action) => {
            // favoriteProductItems means favorite items are added to favorite list
            const { favoriteProductId, favoriteProductName, favoriteProductImage, favoriteProductPrice,  userId } = action?.payload
            
            // check if user favorite state exists
            state.map((favorite) => {
                if (favorite.user === userId) {

                    // sameFavoriteItems means there are the same favorite items in favorite list 
                    // favoriteItems means favorite items in favorite list 
                    const sameFavoriteItems = favorite?.favoriteItems?.find((item) => item.favoriteProductId === favoriteProductId);
                    
                    // if product has not been added to favorite list
                    if (!sameFavoriteItems) {
                        favorite?.favoriteItems?.push({
                            favoriteProductId,
                            favoriteProductName,
                            favoriteProductImage,
                            favoriteProductPrice,
                        });
                        MessagePopup.success("Đã thêm vào danh sách yêu thích");
                    } else {
                        const itemIndex = favorite?.favoriteItems?.findIndex(item => item.favoriteProductId === favoriteProductId);
                        favorite?.favoriteItems?.splice(itemIndex, 1);
                        MessagePopup.success("Đã xóa khỏi danh sách yêu thích");
                    }
                }
            })
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    createFavoriteState,
    toggleFavoriteProduct,
} = favoriteSlice.actions

export default favoriteSlice.reducer