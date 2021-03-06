import React, { useState } from "react";
import PropTypes from "prop-types";

import { trash } from "../utils/icon";

import { Wrapp, Title, Description } from "../utils/styledComponents";
import styled from "styled-components";
import EmptyBasket from "./EmptyBasket";
import { device } from "../utils/device";
const WrappCard = styled(Wrapp)`
  width: 100%;

  display: flex;
  flex-direction: column;
`;
const Con = styled.div`
  width: 100%;
  height: 60px;
  display: flex;

  justify-content: stretch;
  align-items: center;
`;
const Total = styled(Con)`
  width: 100%;
`;
const ProductPrice = styled.div`
  display: flex;
  justify-content: space-between;

  width: 50%;
`;
const QuantityWorth = styled(ProductPrice)`
  width: 40%;
`;
const ImgStyled = styled.div`
  width: 15%;
  padding: 2%;
`;
const ItemTitle = styled(Title)`
  letter-spacing: 1px;
  font-weight: 100;

  @media ${device.mobileS} {
    font-size: 10px;
  }
  @media ${device.mobileM} {
    font-size: 12px;
  }
  @media ${device.mobileL} {
    font-size: 14px;
  }
  @media ${device.tablet} {
    font-size: 16px;
  }
  @media ${device.laptop} {
    font-size: 18px;
  }
  @media ${device.laptopL} {
    font-size: 20px;
  }
`;

const ProductTitle = styled(ItemTitle)`
  margin-left: 2%;
  @media ${device.mobileS} {
    font-size: 12px;
  }
  @media ${device.mobileM} {
    font-size: 14px;
  }
  @media ${device.mobileL} {
    font-size: 18px;
  }
  @media ${device.tablet} {
    font-size: 20px;
  }
  @media ${device.laptop} {
    font-size: 22px;
  }
  @media ${device.laptopL} {
    font-size: 24px;
  }
`;
const PriceTitle = styled(ProductTitle)`
  margin-left: 0;

  text-align: end;
`;
const QuantityTitle = styled(ProductTitle)`
  font-weight: 100;
`;
const WorthTitle = styled(PriceTitle)`
  font-weight: 100;
`;
const SmallImg = styled.img`
  width: 50%;
`;
const ButtonStyled = styled.button`
  width: 20%;
  margin: 0 auto;

  cursor: pointer;
  border: none;
`;
const PriceStyled = styled(Description)`
  width: 15%;
  text-align: end;
  @media ${device.mobileS} {
    font-size: 8px;
  }
  @media ${device.mobileM} {
    font-size: 10px;
  }
  @media ${device.mobileL} {
    font-size: 12px;
  }
  @media ${device.tablet} {
    font-size: 14px;
  }
  @media ${device.laptop} {
    font-size: 16px;
  }
  @media ${device.laptopL} {
    font-size: 18px;
  }
`;

const DescriptionItem = styled(Description)`
  text-align: end;

  @media ${device.mobileS} {
    font-size: 12px;
  }
  @media ${device.mobileM} {
    font-size: 14px;
  }
  @media ${device.mobileL} {
    font-size: 16px;
  }
  @media ${device.tablet} {
    font-size: 18px;
  }
  @media ${device.laptop} {
    font-size: 20px;
  }
  @media ${device.laptopL} {
    font-size: 22px;
  }
`;
const IconBox = styled.div`
  width: 10%;
  padding: 1%;
  display: flex;
  justify-content: center;
`;
const QuantityInput = styled.input`
  display: flex;
  align-items: stretch;
  margin-left: 2%;
  width: 5%;
  @media ${device.mobileS} {
    font-size: 12px;
  }
  @media ${device.mobileM} {
    font-size: 14px;
  }
  @media ${device.mobileL} {
    font-size: 16px;
  }
  @media ${device.tablet} {
    font-size: 18px;
  }
  @media ${device.laptop} {
    font-size: 20px;
  }
  @media ${device.laptopL} {
    font-size: 22px;
  }
`;
const FirstPart = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SecondPart = styled(FirstPart)`
  width: 40%;

  align-items: center;
`;
const MainCard = ({ basket, removeItem }) => {
  const [state, setState] = useState(
    basket.map((e) => ({ ...e, worth: e.price * e.quantity }))
  );

  console.log("Basket", state);
  const setQuantity = (id) => (event) => {
    const newState = [...state].map((e) => {
      if (e.id === id) {
        e.quantity = +event.target.value;
        e.worth = e.price * e.quantity;
      }
      return e;
    });

    setState(newState);
  };
  const totalWorth = () => {
    let total = 0;
    state.forEach((element) => {
      total += element.worth;
    });
    return total;
  };

  const cardItems = state.map((item) => (
    <Con key={item.id}>
      <FirstPart>
        <ImgStyled>
          <SmallImg src={item.image}></SmallImg>
        </ImgStyled>
        <ItemTitle>{item.title}</ItemTitle>
        <PriceStyled> {item.price} z??</PriceStyled>
      </FirstPart>
      <SecondPart>
        <QuantityInput
          type="number"
          value={item.quantity}
          onChange={setQuantity(item.id)}
          min="0"
          max="100"
        ></QuantityInput>
        <DescriptionItem>Warto????: {item.worth}z??</DescriptionItem>
      </SecondPart>
      <IconBox>
        <ButtonStyled onClick={() => removeItem(item.id)}>{trash}</ButtonStyled>
      </IconBox>
    </Con>
  ));
  return basket.length > 0 ? (
    <WrappCard>
      <Total>
        <ProductPrice>
          <ProductTitle>Product</ProductTitle>
          <PriceTitle>Cena</PriceTitle>
        </ProductPrice>
        <QuantityWorth>
          <QuantityTitle>Ilo????</QuantityTitle>
          <WorthTitle>Warto????</WorthTitle>
        </QuantityWorth>
      </Total>
      {cardItems}
      <p
        style={{
          fontSize: "20px",
          width: "80%",
          margin: "0 auto",
          textAlign: "end",
        }}
      >
        suma: {totalWorth()}
      </p>
    </WrappCard>
  ) : (
    <EmptyBasket />
  );
};
MainCard.propTypes = {
  basket: PropTypes.array,
  removeItem: PropTypes.func,
};
export default MainCard;
