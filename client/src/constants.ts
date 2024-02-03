export const endpoints = {
  homePage: "/",
  categories: "/categories",
  subCategories: (parent_category: string) => `/categories/${parent_category}`,
  products: "/products",
  searchProducts: (search?: string) => `/products?search=${search}`,
  categoryProducts: (parent_category: string, sub_category: string) =>
    `/categories/${parent_category}/${sub_category}`,
  productDetails: (
    parent_category: string,
    sub_category: string,
    productSlug: string
  ) => `/categories/${parent_category}/${sub_category}/${productSlug}`,
  login: "/login",
  signup: "/signup",
  accountDashboard: "/customer/account_dashboard",
  accountInformation: "/customer/account_information",
  addressBook: "/customer/address_book",
  orders: "/customer/orders",
  wishlist: "/customer/wishlist",
  compareProducts: "/customer/compare_products",
  cart: "/cart",
  checkout: "/cart/checkout",
  payment: "/cart/checkout/payment",
  productSupport: "/product-support",
  faq: "/faq",
  buyerGuide: "/buyerd-guide",
  error: "/error",
};
