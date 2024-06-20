import { animateScroll } from "react-scroll";

export const scrollToFooter = () => {
  animateScroll.scrollToBottom({ duration: 1000, smooth: true });
};
