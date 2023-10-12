import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { http } from '@/utils/http'
// 新增用户
export const addCount = createAsyncThunk('addCount', async (params) => {
  // const res = await http.post('/users', params)
  const res = await setTimeout(() => {
    return 3;
  }, 1000);
  return res;
});

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
    users: [],
  },
  reducers: {
    incremented: (state) => {
      state.count += 1;
    },
    decremented: (state) => {
      state.count -= 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addCount.pending, (state, action) => {
        // state.status = 'loading';
      })
      .addCase(addCount.fulfilled, (state, action) => {
        // state.status = 'succeeded';
        // state.count += action.payload;
      });
  },
});

// 提供给useSelector使用，用于获取users列表
// export const selectCount = (state) => state.usersStore.users;
export const { incremented, decremented } = counterSlice.actions;
export default counterSlice.reducer;
