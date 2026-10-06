import reducer, {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
} from '../features/cart/cartSlice';

const product = {
  id: '1',
  name: 'Áo',
  price: 100,
  category: 'A',
};

describe('cartSlice', () => {
  test('TC01 - thêm sản phẩm mới', () => {
    const state = reducer(undefined, addItem(product));

    expect(state.items[0]).toMatchObject({
      id: '1',
      quantity: 1,
    });
  });

  test('TC02 - thêm sản phẩm đã có thì tăng quantity', () => {
    let state = reducer(undefined, addItem(product));
    state = reducer(state, addItem(product));

    expect(state.items[0].quantity).toBe(2);
  });

  test('TC03 - xóa sản phẩm', () => {
    const state = reducer(
      { items: [{ ...product, quantity: 1 }] },
      removeItem('1')
    );

    expect(state.items).toEqual([]);
  });

  test('TC04 - cập nhật quantity', () => {
    const state = reducer(
      { items: [{ ...product, quantity: 1 }] },
      updateQuantity({ id: '1', quantity: 5 })
    );

    expect(state.items[0].quantity).toBe(5);
  });

  test('TC05 - quantity bằng 0 thì xóa sản phẩm', () => {
    const state = reducer(
      { items: [{ ...product, quantity: 2 }] },
      updateQuantity({ id: '1', quantity: 0 })
    );

    expect(state.items).toEqual([]);
  });

  test('TC06 - xóa sản phẩm không tồn tại không làm thay đổi giỏ', () => {
    const state = reducer(
      { items: [{ ...product, quantity: 1 }] },
      removeItem('404')
    );

    expect(state.items).toHaveLength(1);
  });

  test('TC07 - clearCart xóa toàn bộ giỏ hàng', () => {
    const state = reducer(
      { items: [{ ...product, quantity: 1 }] },
      clearCart()
    );

    expect(state.items).toEqual([]);
  });
});
