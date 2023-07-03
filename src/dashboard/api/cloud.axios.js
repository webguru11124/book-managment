import axios from "axios";
import { getStoreItem } from "../services/localstorage.service"; // Update the path according to your project structure

const api = "http://localhost:8100/api";
const applicationToken =
    process.env.APPLICATION_TOKEN || "eaf2f95635a43f2:ff4313e9a93a9d6";

export const apiSearch = `${api}`;
export const apiResource = `${api}/api/resource`;
export const loginUrl = "/login";
export const registerUrl =
    "/mymb_ecommerce.utils.auth.create_customer_and_user";
export const searchUrl = "/mymb_ecommerce.mymb_b2c.solr_search.";
export const orderUrl = "/mymb_ecommerce.mymb_ecommerce.order.create_quotation";
export const paymentUrl =
    "/mymb_ecommerce.mymb_ecommerce.payment.payment_request";
export const salesOrderUrl =
    "/mymb_ecommerce.mymb_ecommerce.order.get_sales_orders_for_current_customer";
export const getAddressUrl =
    "/mymb_ecommerce.mymb_ecommerce.order.get_addresses_for_current_customer";
export const updateProfileUrl = "/mymb_ecommerce.utils.auth.update_user_info";
export const updatePasswordUrl =
    "/mymb_ecommerce.utils.auth.update_user_password";
export const getUserInfoUrl = "/mymb_ecommerce.utils.auth.get_user_info";
export const getWishlistUrl =
    "/mymb_ecommerce.mymb_ecommerce.wishlist.get_from_wishlist?page=1&per_page=10";
export const addWishList =
    "/mymb_ecommerce.mymb_ecommerce.wishlist.add_to_wishlist";
export const removeWishList =
    "/mymb_ecommerce.mymb_ecommerce.wishlist.remove_from_wishlist";
export const addReviewUrl =
    "/mymb_ecommerce.mymb_ecommerce.item_review.add_item_review";
export const getReviewsUrl =
    "/mymb_ecommerce.mymb_ecommerce.item_review.get_item_reviews";
export const removeReviewUrl =
    "/mymb_ecommerce.mymb_ecommerce.item_review.delete_item_review";
export const getMenuUrl =
    "/omnicommerce_cms.omnicommerce_cms.home.get_b2c_menu";
export const getPromoSliderUrl = "/Promo Slider";
export const currentDemo = 4;

export const customHeader = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

const apiClient = axios.create({

    apiSearch,
    headers: customHeader,
});

// Add request interceptor to set the Authorization header
apiClient.interceptors.request.use(
    (config) => {
        const jwt = getStoreItem("auth")?.jwt; // Get JWT from local storage
        if (jwt) {
            config.headers.Authorization = `Bearer ${jwt}`;
        } else {
            // config.headers.Authorization = `token ${applicationToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
export { api };
