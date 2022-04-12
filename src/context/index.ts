import axios from "axios";
import create from "zustand";
import { ProductType } from "../types/ProductType";

type Products = {
  products: ProductType[];
  setProducts: () => void;
};

export const useProducts = create<Products>((set) => ({
  products: [],

  setProducts: async () => {
    const data = await axios.get("http://localhost:3001/products");
    set(() => ({ products: data.data }));
  },
}));

type ProductsCart = {
  productsCart: ProductType[];
  incrementProductCart: (productAtua: ProductType) => void;
  decrementProductCart: (productAtua: ProductType) => void;
};

export const useProductsCart = create<ProductsCart>((set) => ({
  productsCart: [],

  incrementProductCart: (productAtual: ProductType) => {
    set(({ productsCart }) => {
      const isProductInCart = productsCart.find(
        (product) => product.id === productAtual.id
      );

      if (isProductInCart) {
        return {
          productsCart: productsCart.map((product) =>
            product.id === productAtual.id
              ? { ...product, amount: product.amount + 1 }
              : product
          ),
        };
      }

      return {
        productsCart: [...productsCart, { ...productAtual, amount: 1 }],
      };
    });
  },

  decrementProductCart: (productAtual: ProductType) => {
    set(({ productsCart }: any) => {
      return productsCart.reduce(
        (acc: ProductType[], product: ProductType) => {
          if (product.id === productAtual.id) {
            if (product.amount === 1) return { productsCart: acc };

            return {
              productsCart: [
                ...acc,
                { ...product, amount: product.amount - 1 },
              ],
            };
          } else {
            return {
              productsCart: [...acc, product],
            };
          }
        },
        [] as ProductType[],
      );
    });
  },
}));



