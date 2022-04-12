import { Dispatch, SetStateAction } from "react";
import { CloseOutline } from "@styled-icons/evaicons-outline";

import Button from "../Button";
import Typography from "../Typography";

import { Wrapper, Subtotal, Header } from "./styles";
import { priceFormat } from "../../utils/priceFormat";
import { useProductsCart } from "../../context";
import Product from "../Product";
import { ProductType } from "../../types/ProductType";

export type MenuPaymentProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

/**
 * Adicionar itens ao carrinho, design ao seu critério mas deve conter:
 * - Nome do produto
 * - Imagem
 * - Preço
 * - Incrementador
 */

const MenuPayment = ({ isOpen, setIsOpen }: MenuPaymentProps) => { 
  const {productsCart} = useProductsCart();

  const totalPrice = (products: ProductType[]) =>{
    return products.reduce((acc, product) => {
      return acc + product.price * product.amount;
    }, 0);
  }

  return(
    <Wrapper isOpen={isOpen}>
      <Header>
        <Typography level={5} size="large" fontWeight={600}>
          Produtos no carrinho
        </Typography>
        <CloseOutline onClick={() => setIsOpen(false)} />
      </Header>
      <>
        {productsCart?.map((product) => (
          <Product
            key={product.id}
            product={product}
          />
        ))}
      </>
      <Subtotal>
        <Typography level={5} size="large" fontWeight={600}>
          Total
        </Typography>
        <Typography>{priceFormat(totalPrice(productsCart))}</Typography>
      </Subtotal>

      <Button fullWidth>Finalizar compra</Button>
    </Wrapper>
  );
}
export default MenuPayment;
