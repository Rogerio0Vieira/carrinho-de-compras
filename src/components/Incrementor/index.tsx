import { Plus as PlusIcon } from "@styled-icons/boxicons-regular/Plus";
import { Subtract as SubtractIcon } from "@styled-icons/remix-fill/Subtract";

import { Wrapper, IconWrapper, Quantity } from "./styles";

type IncrementorProps = {
  id: number;
  amount: number;
  sum: () => void;
  sub: () => void;
};

const Incrementor = ({ id, amount, sub, sum }: IncrementorProps) => (
  <Wrapper>
    <IconWrapper>
      <SubtractIcon aria-label="Subtract item" onClick={sub}/>
    </IconWrapper>

    <Quantity>{amount}</Quantity>

    <IconWrapper>
      <PlusIcon aria-label="Add item" onClick={sum}/>
    </IconWrapper>
  </Wrapper>
);

export default Incrementor;
