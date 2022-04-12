import { useEffect } from "react";
import { useProductsCart } from "../../context";
import { ProductType } from "../../types/ProductType";
import { priceFormat } from "../../utils/priceFormat";
import Incrementor from "../Incrementor";
import { Wrapper, Info, Column, Text, WrapperIncrementor } from "./styles";

export type ProductProps = {
  product: ProductType;
}

const Product = ({product}:ProductProps) => {
  const {productsCart, incrementProductCart, decrementProductCart} = useProductsCart();

  const productAmount = (productsCart: ProductType[]) =>{
    let sum = 0;
    productsCart.forEach((iten) => {
      if(iten.id === product.id){
        sum = iten.amount;
      }
    });
    return sum;
  }

  const getProductAmount = productAmount(productsCart);

  useEffect(() => {}, [productsCart])

    return(
      <Wrapper>
        <img src={product.picture} alt={`Imagem de referência ${product.name}`} />

        <Info>
          <Column>
            <Text>{product.name}</Text>
            <Text>{priceFormat(product.price)}</Text>
          </Column>

          <WrapperIncrementor>
            <Incrementor 
            id={product.id} 
            amount={getProductAmount}
            sum={
              getProductAmount <= product.quantity
              ? () => incrementProductCart(product)
              : () => alert("Esgotado!")
            }
            sub={() => decrementProductCart(product)}
            />
          </WrapperIncrementor>
        </Info>
      </Wrapper>
   );
}
export default Product;
