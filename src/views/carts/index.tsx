import React from "react";

import type { Product } from "@/api/products";
import { CartProduct } from "@/components/carts";
import { useCartProductHandler } from "@/components/carts/CartProduct/hooks";
import { PriceDashBoard } from "@/components/common";
import { CONFIRM_MESSAGES } from "@/constants/messages";
import { withAsync } from "@/helpers";
import { CartOrderContentLayout } from "@/layouts";

import * as S from "./carts.style";

export interface CartGroup extends Omit<Product, "id"> {
  id: number;
  productId: Product["id"];
  count: number;
}

export default function Carts() {
  const {
    cartProducts,
    selectedCartProducts,
    onToggleAllItems,
    onToggleItem,
    checkedTotalPrice,
    isChecked,
    onIncreaseCartProductCount,
    onDecreaseCartProductCount,
    onDeleteCartProducts,
    onDeleteCartProduct,
  } = useCartProductHandler();

  const handleSubmitOrder = async () => {
    const isSubmitConfirm = confirm(CONFIRM_MESSAGES.COMPLETE_ORDER_MESSAGE);

    if (!isSubmitConfirm) return;

    const { error } = await withAsync(() => onDeleteCartProducts());

    if (!error) {
      // 주문하기 페이지로 이동
    }
  };

  return (
    <CartOrderContentLayout>
      <div>
        <S.CartProductDeleteButtonWrapper>
          <S.CartProductCheckBox width="20px" label="선택해제" onChange={onToggleAllItems} />
          <S.CartProductDeleteButton variant="outlined" onClick={onDeleteCartProducts}>
            상품삭제
          </S.CartProductDeleteButton>
        </S.CartProductDeleteButtonWrapper>

        <S.CartSubHeader textAlign="left">{`든든배송 상품 (${cartProducts.length}개)`}</S.CartSubHeader>

        {cartProducts.map((cartProduct) => (
          <CartProduct
            id={cartProduct.id.toString()}
            key={cartProduct.id}
            css={S.cartProductStyle}
            cartProductInfo={cartProduct}
            isChecked={isChecked(cartProduct.id)}
            onCheckItem={onToggleItem}
            onIncreaseProductQuantity={onIncreaseCartProductCount(cartProduct.id)}
            onDecreaseProductQuantity={onDecreaseCartProductCount(cartProduct.id)}
            onDeleteProduct={onDeleteCartProduct(cartProduct.productId)}
          />
        ))}
      </div>

      <div>
        <PriceDashBoard
          title="결제예상금액"
          priceTitle="결제예상금액"
          price={checkedTotalPrice}
          buttonLabel={`주문하기 ${selectedCartProducts.size ? `${selectedCartProducts.size}개` : ""}`}
          onSubmit={handleSubmitOrder}
        />
      </div>
    </CartOrderContentLayout>
  );
}
