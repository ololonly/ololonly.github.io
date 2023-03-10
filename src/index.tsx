import React from "react";
import { createRoot } from "react-dom/client";
import styles from "./index.less";
import "./variables.less";
import App from "./App";

const rootElement = document.createElement("div");
rootElement.className = styles.root;
document.body.append(rootElement);

const root = createRoot(rootElement);

root.render(<App />);
