import HomePage from "../pages/HomePage/HomePage";
import MenuPage from "../pages/MenuPage/MenuPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/menu/product',
        page: ProductPage,
        isShowHeader: true
    },
    {
        path: '/menu',
        page: MenuPage,
        isShowHeader: true
    },
    {
        path: '/signin',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/signup',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: false
    },
]