import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

import GoodsService from "../../services/GoodsService";

const goodsAdapter = createEntityAdapter();

const initialState = goodsAdapter.getInitialState({
  goodsLoadingStatus: "idle",
  item: {},
  byPrice: 99999,
  byName: "",
});

export const fetchGoods = createAsyncThunk("goods/fetchGoods", () => {
  const { getAllGoods } = GoodsService();
  return getAllGoods();
});
export const fetchOne = createAsyncThunk("goods/fetchOne", (id) => {
  const { getOne } = GoodsService();
  return getOne(id);
});

export const fetchCategory = createAsyncThunk("goods/fetchCategory", (name) => {
  const { getCategory } = GoodsService();
  return getCategory(name);
});

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    setFilterByPrice: (state, action) => {
      state.byPrice = action.payload;
    },
    setFilterByName: (state, action) => {
      state.byName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.goodsLoadingStatus = "loading";
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.goodsLoadingStatus = "idle";
        goodsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchGoods.rejected, (state) => {
        state.goodsLoadingStatus = "error";
      })
      .addCase(fetchOne.pending, (state) => {
        state.goodsLoadingStatus = "loading";
      })
      .addCase(fetchOne.fulfilled, (state, action) => {
        state.goodsLoadingStatus = "idle";
        state.item = action.payload;
      })
      .addCase(fetchOne.rejected, (state) => {
        state.goodsLoadingStatus = "error";
      })
      .addCase(fetchCategory.pending, (state) => {
        state.goodsLoadingStatus = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.goodsLoadingStatus = "idle";
        goodsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.goodsLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = goodsSlice;

export const { selectAll } = goodsAdapter.getSelectors((state) => state.goods);

export const goodsSelector = createSelector(
  (state) => state.goods.byPrice,
  (state) => state.goods.byName,
  selectAll,
  (filterbyPrice, filterbyName, goods) => {
    console.log(filterbyPrice);
    console.log(filterbyName);
    if (
      (filterbyPrice === 0 || filterbyPrice === 99999) &&
      (filterbyName === null || filterbyName === "")
    ) {
      return goods;
    } else {
      goods = goods.filter((item) => item.price <= filterbyPrice);
      return goods.filter((item) => {
        if (item.title.includes(filterbyName)) {
          return item;
        }
      });
    }
  }
);
export const { setFilterByPrice, setFilterByName } = actions;

export default reducer;
