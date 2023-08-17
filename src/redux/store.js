// Store 是一个中央仓库，允许组件与应用程序的状态进行交互，并在状态更改时触发 UI 的更新。
// 在典型的 Redux 设置中，您会定义操作和 reducer 来指定在不同操作下状态应如何更改。这些操作被分发给 store，然后 reducer 处理它们以更新状态。
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Reducers/auth-reducer.js";

const store = configureStore({
    reducer: {
        user: authReducer,
        // ... other reducers
    },
});

export default store;