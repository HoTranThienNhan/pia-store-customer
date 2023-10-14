import AdminPage from "../pages/AdminPage/AdminPage";
import HomePage from "../pages/HomePage/HomePage";
import MenuPage from "../pages/MenuPage/MenuPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import MyCartPage from "../pages/MyCartPage/MyCartPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import UserEditProfilePage from "../pages/UserEditProfilePage/UserEditProfilePage";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import OrderSuccessPage from "../pages/OrderSuccessPage/OrderSuccessPage";
import MyOrdersPage from "../pages/MyOrdersPage/MyOrdersPage";


export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/mycart',
        page: MyCartPage,
        isShowHeader: true,
        exact: false,
    },
    {
        path: '/mycart/checkout',
        page: CheckoutPage,
        isShowHeader: true,
        exact: false,
    },
    {
        path: '/mycart/checkout/order-success',
        page: OrderSuccessPage,
        isShowHeader: true,
        exact: false,
    },
    {
        path: '/myorders',
        page: MyOrdersPage,
        isShowHeader: true,
        exact: false,
    },
    {
        path: '/menu',
        page: MenuPage,
        isShowHeader: true,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/menu/:type',
        page: MenuPage,
        isShowHeader: true,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/menu/products/:id',
        page: ProductPage,
        isShowHeader: true,
        isPrivate: false,
        exact: true,
    },
    {
        path: '/signin',
        page: SignInPage,
        isShowHeader: false,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/signup',
        page: SignUpPage,
        isShowHeader: false,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/user/profile',
        page: UserProfilePage,
        isShowHeader: true,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/user/profile/edit',
        page: UserEditProfilePage,
        isShowHeader: true,
        isPrivate: false,
        exact: false,
    },
    // admin routes
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: true,
        isPrivate: true,
        exact: false,
    },
    // remaining routes
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: false,
        isPrivate: false,
        exact: false,
    },
]