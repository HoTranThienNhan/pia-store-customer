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
import ReviewPage from "../pages/ReviewPage/ReviewPage";


export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/mycart',
        page: MyCartPage,
        isShowHeader: true,
        isShowFooter: true,
        exact: true,
    },
    {
        path: '/mycart/checkout',
        page: CheckoutPage,
        isShowHeader: true,
        isShowFooter: true,
        exact: true,
    },
    {
        path: '/mycart/checkout/order-success',
        page: OrderSuccessPage,
        isShowHeader: true,
        isShowFooter: true,
        exact: true,
    },
    {
        path: '/myorders',
        page: MyOrdersPage,
        isShowHeader: true,
        isShowFooter: true,
        exact: true,
    },
    {
        path: '/menu',
        page: MenuPage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: true,
    },
    {
        path: '/menu/:type',
        page: MenuPage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: true,
    },
    {
        path: '/menu/products/:id',
        page: ProductPage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: true,
    },
    {
        path: '/review/:orderId/:productId',
        page: ReviewPage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: true,
    },
    {
        path: '/signin',
        page: SignInPage,
        isShowHeader: false,
        isShowFooter: true,
        isPrivate: false,
        exact: true,
    },
    {
        path: '/signup',
        page: SignUpPage,
        isShowHeader: false,
        isShowFooter: true,
        isPrivate: false,
        exact: true,
    },
    {
        path: '/user/profile',
        page: UserProfilePage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: true,
    },
    {
        path: '/user/profile/edit',
        page: UserEditProfilePage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: true,
    },
    // admin routes
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: true,
        isShowFooter: false,
        isPrivate: true,
        exact: true,
    },
    // remaining routes
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: false,
        isShowFooter: false,
        isPrivate: false,
        exact: true,
    },
]