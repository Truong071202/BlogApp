// src/services/nprogressService.js
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import CSS for NProgress

const start = () => NProgress.start();
const done = () => NProgress.done();
const set = (progress) => NProgress.set(progress);

export { start, done, set };
