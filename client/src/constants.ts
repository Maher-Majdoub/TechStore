export const userAccountEndPoints = {
  account_dashboard: "/account_dashboard",
  account_information: "/account_information",
  address_book: "/address_book",
  orders: "/orders",
  wishlist: "/wishlist",
};

export const endpoints = {
  home: "/",
  categories: "/categories",
  sub_categories: (parent_category: string) => `/categories/${parent_category}`,
  products: "/products",
  search_products: (search?: string) => `/products?search=${search}`,
  category_products: (parent_category: string, sub_category: string) =>
    `/categories/${parent_category}/${sub_category}`,
  product_details: (
    parent_category: string,
    sub_category: string,
    productSlug: string
  ) => `/categories/${parent_category}/${sub_category}/${productSlug}`,
  login: "/login",
  signup: "/signup",
  cart: "/cart",
  checkout: "/cart/checkout",
  payment: "/cart/checkout/payment",
  contact_us: "/contact_us",
  product_support: "/product-support",
  faq: "/faq",
  buyer_guide: "/buyer-guide",
  error: "/error",
};

export const screenWidths = {
  tablets: 768,
};
