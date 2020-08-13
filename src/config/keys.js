import { prod } from "./prod";
import { dev } from "./dev";

const keys = process.env.NODE_ENV === "production" ? prod : dev;

export default keys;
