"use client";
import Image from "next/image";
import { useId, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import icon1 from "@src/assets/dashboard/icon1.svg";
import icon2 from "@src/assets/dashboard/icon2.svg";
import icon3 from "@src/assets/dashboard/icon3.svg";
import icon4 from "@src/assets/dashboard/icon4.svg";
import icon5 from "@src/assets/dashboard/icon5.svg";
import icon6 from "@src/assets/dashboard/icon6.svg";

function BottomCardIcon({ cardIndex }: { cardIndex: number }) {
  const uid = useId().replace(/:/g, "");
  const docClipId = `${uid}-doc-clip`;

  const base = "pointer-events-none shrink-0";

  if (cardIndex === 0) {
    return (
      <svg
        className={`${base} h-5 w-5 lg:h-7 lg:w-7 dark:[&_path]:fill-[#5aab9e]`}
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M15.0755 10.6327C13.7508 10.6327 12.6731 11.7104 12.6731 13.035C12.6731 14.3597 13.7508 15.4374 15.0755 15.4374C16.4002 15.4374 17.4779 14.3597 17.4779 13.035C17.4779 11.7104 16.4002 10.6327 15.0755 10.6327ZM15.0755 14.1745C14.4471 14.1745 13.9359 13.6633 13.9359 13.035C13.9359 12.4067 14.4471 11.8954 15.0755 11.8954C15.7039 11.8954 16.2151 12.4067 16.2151 13.035C16.2151 13.6634 15.7039 14.1745 15.0755 14.1745ZM21.2709 14.2967L20.455 13.7056C20.4824 13.4836 20.4962 13.2595 20.4962 13.0355C20.4962 12.8148 20.4829 12.5942 20.4563 12.3759L21.2724 11.7846C21.481 11.6487 21.7655 11.3285 21.6292 10.6224C21.5639 10.2845 21.4077 9.88988 21.1892 9.51153C20.5837 8.46263 19.8501 8.00367 19.2643 8.30169L18.3458 8.7121C17.9881 8.44067 17.6012 8.21659 17.1892 8.04239L17.086 7.04814C17.0548 6.38917 16.2905 5.98184 15.0756 5.98184C13.8642 5.98184 13.0997 6.38805 13.0653 7.04485L12.9618 8.04247C12.5497 8.21673 12.1627 8.44088 11.8052 8.71224L10.8888 8.30281C10.6668 8.19021 10.2472 8.10399 9.70404 8.57495C9.44397 8.80043 9.18039 9.13311 8.962 9.51153C8.35655 10.56 8.32561 11.4248 8.87634 11.7833L9.69478 12.3762C9.66819 12.5948 9.65486 12.8154 9.65486 13.0356C9.65486 13.2595 9.66861 13.4835 9.69604 13.7055L8.87725 14.2987C8.32568 14.6568 8.3562 15.522 8.96193 16.571C9.18039 16.9495 9.44397 17.2821 9.70404 17.5076C10.2473 17.9786 10.6669 17.8923 10.8888 17.7796L11.8145 17.366C12.1693 17.634 12.5526 17.8556 12.9607 18.0282L13.0653 19.0375C13.0994 19.6945 13.8641 20.1007 15.0755 20.1007C16.2904 20.1007 17.0547 19.6934 17.0859 19.0344L17.1903 18.0282C17.5983 17.8556 17.9817 17.634 18.3364 17.3661L19.2642 17.7807C19.8501 18.079 20.5837 17.6197 21.1891 16.571C21.7966 15.5188 21.8261 14.6533 21.2709 14.2967ZM19.1526 12.216C19.2062 12.4836 19.2333 12.7593 19.2333 13.0355C19.2333 13.3141 19.2055 13.5929 19.1509 13.8641C19.102 14.1065 19.1991 14.3552 19.3994 14.5002L20.39 15.2179C20.3611 15.3658 20.2769 15.6252 20.0954 15.9396C19.9138 16.2539 19.7314 16.4566 19.6177 16.5555L18.4966 16.0545C18.271 15.9536 18.0071 15.9937 17.8217 16.1571C17.4037 16.5253 16.9257 16.8014 16.4012 16.9777C16.1667 17.0566 15.9999 17.265 15.9744 17.5111L15.8476 18.7323C15.7051 18.7811 15.4384 18.8378 15.0755 18.8378C14.7123 18.8378 14.4455 18.7811 14.3031 18.7322L14.1765 17.5111C14.1509 17.2651 13.9841 17.0566 13.7496 16.9777C13.2252 16.8014 12.7473 16.5253 12.329 16.1571C12.1436 15.9937 11.8801 15.9536 11.6542 16.0544L10.5329 16.5553C10.4194 16.4564 10.2369 16.2537 10.0554 15.9394C9.87389 15.625 9.78963 15.3656 9.76079 15.2177L10.7514 14.5C10.9516 14.3549 11.0487 14.1063 10.9999 13.8639C10.9453 13.5927 10.9175 13.314 10.9175 13.0355C10.9175 12.7602 10.9447 12.4844 10.9983 12.2158C11.0465 11.9737 10.9494 11.7257 10.7495 11.5809L9.76072 10.8647C9.78956 10.7169 9.87382 10.4574 10.0554 10.1429C10.2368 9.82863 10.4193 9.62595 10.5329 9.52703L11.6457 10.0242C11.872 10.1253 12.1362 10.0847 12.3216 9.92061C12.7416 9.54892 13.2224 9.27047 13.7506 9.09312C13.9851 9.01434 14.152 8.80583 14.1775 8.55972L14.303 7.35031C14.4455 7.30141 14.7123 7.24465 15.0754 7.24465C15.4383 7.24465 15.705 7.30134 15.8475 7.35024L15.973 8.55972C15.9986 8.80583 16.1655 9.01434 16.4001 9.09312C16.9281 9.27033 17.4088 9.54871 17.8291 9.92054C18.0146 10.0846 18.2788 10.1252 18.5051 10.0241L19.6177 9.52689C19.7312 9.62581 19.9138 9.82849 20.0953 10.1429C20.2768 10.4572 20.3611 10.7165 20.39 10.8644L19.4012 11.5808C19.2014 11.7258 19.1042 11.9739 19.1526 12.216ZM22.5163 3.22717H7.63479C5.23398 3.22717 3.2974 5.17428 3.2974 7.57516V19.8813L1.26288 21.6914V7.42327C1.26281 4.01257 4.0722 1.26281 7.48297 1.26281H19.2698C19.9324 1.26281 20.5654 1.45952 21.1002 1.85534C21.3804 2.06279 21.7758 1.99748 21.9834 1.71721C22.1908 1.43693 22.1317 1.05094 21.8515 0.843485C21.0976 0.285535 20.2048 0 19.2697 0H7.48297C3.37597 0 0 3.31627 0 7.42327V23.1225C0 23.3726 0.164937 23.5992 0.393855 23.7001C0.622704 23.801 0.906555 23.7575 1.09135 23.5888L3.2974 21.5909V26.3686C3.2974 26.6187 3.43673 26.8453 3.66565 26.9463C3.74752 26.9824 3.83009 27 3.91624 27C4.0708 27 4.22128 26.9432 4.33999 26.835L8.00893 23.4856C8.12307 23.3814 8.22003 23.2904 8.30513 23.2111C8.48073 23.0472 8.64637 22.8924 8.7013 22.8709C8.75286 22.8506 8.97056 22.8589 9.20095 22.8619C9.32562 22.8636 9.47021 22.8708 9.64055 22.8708H22.5163C24.9171 22.8708 26.8699 20.907 26.8699 18.5061V7.57516C26.8697 5.17428 24.917 3.22717 22.5163 3.22717ZM25.6069 18.5061C25.6069 20.2107 24.2207 21.608 22.5162 21.608H9.64048C9.47673 21.608 9.33761 21.6008 9.21772 21.5993C8.28703 21.5868 8.1376 21.6425 7.44305 22.2904C7.3609 22.3671 7.27496 22.4537 7.16474 22.5543L4.56021 24.9375V20.1605V20.1589V7.57516C4.56014 5.87058 5.93028 4.48998 7.63479 4.48998H22.5163C24.2208 4.48998 25.607 5.87058 25.607 7.57516L25.6069 18.5061Z"
          fill="#488981"
        />
      </svg>
    );
  }

  if (cardIndex === 1) {
    return (
      <svg
        className={`${base} h-5 w-5 lg:h-7 lg:w-7 dark:[&_path]:fill-[#5aab9e]`}
        viewBox="0 0 33 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M16.9023 13C23.7189 13 28.8751 10.42 28.8751 7C28.8751 3.58 23.7189 1 16.9023 1C10.756 1 4.12511 3.29 4.12511 7C4.12511 10.71 10.756 13 16.9023 13ZM16.9023 3C22.7392 3 26.8126 5.11 26.8126 7C26.8126 8.89 22.7392 11 16.9023 11C11.0654 11 6.18761 8.81 6.18761 7C6.18761 5.19 10.9726 3 16.9023 3ZM5.88854 24.29C5.83782 24.2448 5.78254 24.2046 5.72354 24.17C5.67101 24.1302 5.61167 24.0998 5.54823 24.08C5.48798 24.0429 5.42175 24.0159 5.35229 24C5.18662 23.9678 5.01533 23.9756 4.85349 24.0227C4.69165 24.0698 4.54422 24.1547 4.42417 24.27C4.33308 24.3672 4.25983 24.4788 4.20761 24.6C4.15206 24.7264 4.12397 24.8626 4.12511 25C4.12123 25.1312 4.14951 25.2614 4.20761 25.38C4.26001 25.5011 4.33324 25.6127 4.42417 25.71C4.52441 25.7983 4.63951 25.8694 4.76448 25.92C4.88792 25.9729 5.0214 26.0002 5.15636 26.0002C5.29132 26.0002 5.42479 25.9729 5.54823 25.92C5.67311 25.8692 5.78818 25.7982 5.88854 25.71C5.97947 25.6127 6.0527 25.5011 6.10511 25.38C6.15967 25.2603 6.18785 25.1309 6.18785 25C6.18785 24.8691 6.15967 24.7397 6.10511 24.62C6.05288 24.4988 5.97964 24.3872 5.88854 24.29ZM12.571 28.6C11.0267 28.3353 9.53418 27.8394 8.14698 27.13C7.90903 26.9974 7.6265 26.9619 7.36155 27.0313C7.0966 27.1007 6.87092 27.2693 6.73417 27.5C6.59742 27.7307 6.56079 28.0047 6.63235 28.2616C6.7039 28.5186 6.87778 28.7374 7.11573 28.87C8.69613 29.6835 10.3974 30.2536 12.1585 30.56H12.3545C12.628 30.5852 12.9006 30.504 13.1124 30.3343C13.3242 30.1646 13.4577 29.9202 13.4837 29.655C13.5097 29.3898 13.426 29.1254 13.2509 28.9201C13.0759 28.7147 12.8239 28.5852 12.5504 28.56L12.571 28.6ZM27.2148 23.08C26.9652 23.1855 26.7687 23.3824 26.6682 23.6278C26.5678 23.8732 26.5715 24.1472 26.6785 24.39C26.7665 24.5821 26.8122 24.7898 26.8126 25C26.8126 26.89 22.7392 29 16.9023 29H16.5001C16.2266 29 15.9643 29.1054 15.7709 29.2929C15.5775 29.4804 15.4689 29.7348 15.4689 30C15.4689 30.2652 15.5775 30.5196 15.7709 30.7071C15.9643 30.8946 16.2266 31 16.5001 31H16.9229C23.7189 31 28.8751 28.42 28.8751 25C28.8738 24.5218 28.7721 24.0488 28.576 23.61C28.5232 23.488 28.4459 23.3774 28.3487 23.2846C28.2514 23.1918 28.1362 23.1187 28.0095 23.0694C27.8829 23.0201 27.7475 22.9956 27.6111 22.9974C27.4746 22.9993 27.34 23.0273 27.2148 23.08Z"
          fill="#58A19A"
        />
        <path
          d="M27.2147 11.08C26.9651 11.1855 26.7686 11.3824 26.6681 11.6278C26.5676 11.8732 26.5714 12.1472 26.6784 12.39C26.7664 12.5821 26.8121 12.7898 26.8125 13C26.8125 14.89 22.7391 17 16.9022 17C11.0653 17 6.1875 14.81 6.1875 13C6.18913 12.8049 6.23862 12.6129 6.33187 12.44C6.39714 12.322 6.4373 12.1925 6.44996 12.0591C6.46263 11.9258 6.44754 11.7913 6.4056 11.6637C6.36366 11.5361 6.29572 11.418 6.2058 11.3163C6.11589 11.2147 6.00584 11.1316 5.88218 11.072C5.75852 11.0124 5.62377 10.9774 5.48593 10.9693C5.34809 10.9611 5.20995 10.9799 5.07973 11.0244C4.94951 11.069 4.82985 11.1385 4.72785 11.2288C4.62584 11.3191 4.54358 11.4283 4.48594 11.55C4.25096 11.9995 4.12738 12.496 4.125 13C4.125 16.71 10.7559 19 16.9022 19C23.7188 19 28.875 16.42 28.875 13C28.8737 12.5218 28.772 12.0488 28.5759 11.61C28.5231 11.488 28.4458 11.3774 28.3486 11.2846C28.2513 11.1918 28.1361 11.1187 28.0094 11.0694C27.8828 11.0201 27.7474 10.9956 27.611 10.9974C27.4745 10.9993 27.3398 11.0273 27.2147 11.08Z"
          fill="#58A19A"
        />
        <path
          d="M27.2147 17.08C26.9651 17.1855 26.7686 17.3824 26.6681 17.6278C26.5676 17.8732 26.5714 18.1472 26.6784 18.39C26.7664 18.5821 26.8121 18.7898 26.8125 19C26.8125 20.89 22.7391 23 16.9022 23C11.0653 23 6.1875 20.81 6.1875 19C6.18913 18.8049 6.23862 18.6129 6.33187 18.44C6.39714 18.322 6.4373 18.1925 6.44996 18.0591C6.46263 17.9257 6.44754 17.7913 6.4056 17.6637C6.36366 17.5361 6.29572 17.418 6.2058 17.3163C6.11589 17.2147 6.00584 17.1316 5.88218 17.072C5.75852 17.0124 5.62377 16.9774 5.48593 16.9693C5.34809 16.9611 5.20995 16.9799 5.07973 17.0244C4.94951 17.069 4.82985 17.1385 4.72785 17.2288C4.62584 17.3191 4.54358 17.4283 4.48594 17.55C4.25096 17.9995 4.12738 18.496 4.125 19C4.125 22.71 10.7559 25 16.9022 25C23.7188 25 28.875 22.42 28.875 19C28.8737 18.5218 28.772 18.0488 28.5759 17.61C28.5231 17.488 28.4458 17.3774 28.3486 17.2846C28.2513 17.1918 28.1361 17.1187 28.0094 17.0694C27.8828 17.0201 27.7474 16.9956 27.611 16.9974C27.4745 16.9993 27.3398 17.0273 27.2147 17.08Z"
          fill="#58A19A"
        />
      </svg>
    );
  }

  return (
    <svg
      className={`${base} h-5 w-5 lg:h-7 lg:w-7 dark:[&_path]:fill-[#5aab9e]`}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <clipPath id={docClipId}>
          <rect width="26" height="26" fill="white" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${docClipId})`}>
        <path
          d="M24.7 0H1.3C0.583267 0 0 0.583267 0 1.3V25.5667C0 25.8059 0.194133 26 0.433333 26H25.5667C25.8059 26 26 25.8059 26 25.5667V1.3C26 0.583267 25.4167 0 24.7 0ZM1.3 0.866667H24.7C24.9388 0.866667 25.1333 1.06123 25.1333 1.3V3.46667H0.866667V1.3C0.866667 1.06123 1.06123 0.866667 1.3 0.866667ZM8.23333 22.9667V25.1333H4.76667V22.9667H8.23333ZM9.1 22.9667H12.5667V25.1333H9.1V22.9667ZM13.4333 22.9667H16.9V25.1333H13.4333V22.9667ZM17.7667 22.9667H21.2333V25.1333H17.7667V22.9667ZM0.866667 22.1V7.36667H25.1333V22.1H0.866667ZM0.866667 6.5V4.33333H25.1333V6.5H0.866667ZM0.866667 22.9667H3.9V25.1333H0.866667V22.9667ZM22.1 25.1333V22.9667H25.1333V25.1333H22.1Z"
          fill="#58A19A"
        />
        <path
          d="M3.89984 1.73333H2.1665V2.6H3.89984V1.73333Z"
          fill="#58A19A"
        />
        <path
          d="M6.93353 1.73333H5.2002V2.6H6.93353V1.73333Z"
          fill="#58A19A"
        />
        <path
          d="M6.93343 10.4H6.06676V16.0333H3.46676V10.4H2.6001V16.4667C2.6001 16.7059 2.79423 16.9 3.03343 16.9H6.06676V19.5H6.93343V16.9H8.23343V16.0333H6.93343V10.4Z"
          fill="#58A19A"
        />
        <path
          d="M23.3999 16.0333H22.0999V10.4H21.2333V16.0333H18.6333V10.4H17.7666V16.4667C17.7666 16.7059 17.9607 16.9 18.1999 16.9H21.2333V19.5H22.0999V16.9H23.3999V16.0333Z"
          fill="#58A19A"
        />
        <path
          d="M13.0001 10.4C11.3275 10.4 9.9668 11.7607 9.9668 13.4333V16.4667C9.9668 18.1393 11.3275 19.5 13.0001 19.5C14.6728 19.5 16.0335 18.1393 16.0335 16.4667V13.4333C16.0335 11.7607 14.6728 10.4 13.0001 10.4ZM15.1668 16.4667C15.1668 17.6614 14.1948 18.6333 13.0001 18.6333C11.8054 18.6333 10.8335 17.6614 10.8335 16.4667V13.4333C10.8335 12.2386 11.8054 11.2667 13.0001 11.2667C14.1948 11.2667 15.1668 12.2386 15.1668 13.4333V16.4667Z"
          fill="#58A19A"
        />
      </g>
    </svg>
  );
}

const colors = [
  { color: "#614A44" },
  { color: "#757170" },
  { color: "#F6C701" },
  { color: "#FB7F00" },
  { color: "#00A82D" },
  { color: "#3286FB" },
  {
    color: "#F1EBE5",
    icon: (
      <svg width="15" height="20" viewBox="0 0 16 21" fill="none" className="text-[#453F3D] dark:text-zinc-400" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.65987 19.5056C9.49248 19.5056 11.25 18.7776 12.5459 17.4817C13.8417 16.1858 14.5697 14.4282 14.5697 12.5956C14.5697 10.6213 13.5826 8.74579 11.6084 7.16638C9.63412 5.58696 8.15343 3.21784 7.65987 0.75C7.16631 3.21784 5.68562 5.58696 3.71137 7.16638C1.73712 8.74579 0.75 10.6213 0.75 12.5956C0.74987 13.5031 0.928498 14.4017 1.27571 15.2401C1.62291 16.0785 2.1319 16.8403 2.77356 17.482C3.41523 18.1236 4.17704 18.6326 5.01544 18.9798C5.85384 19.327 6.75242 19.5057 7.65987 19.5056Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    color: "#F1EBE5",
    icon: (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none" className="text-[#453F3D] dark:text-zinc-400" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.2498 11.7921C16.8303 10.4812 15.9359 9.24627 14.5697 8.15351C12.5955 6.5741 11.1148 4.20497 10.6212 1.73713C10.4406 2.62161 10.1474 3.47943 9.74862 4.28986M0.75 0.75L20.4925 20.4927M7.45752 7.45956C7.20712 7.70322 6.94522 7.9348 6.67275 8.15351C4.6985 9.73293 3.71137 11.6085 3.71137 13.5828C3.71179 14.7398 4.00267 15.8783 4.55736 16.8938C5.11206 17.9093 5.9128 18.7692 6.88618 19.3948C7.85956 20.0204 8.97441 20.3917 10.1285 20.4745C11.2826 20.5573 12.4391 20.3491 13.4918 19.8688C14.9012 19.2253 16.0533 18.1267 16.7631 16.7495" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];
export default function HomeBuiltSection() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<"light" | "dark">("light");

  const bottomCards = [
    {
      title: t.home.built.bottom1Title,
      description: t.home.built.bottom1Body,
    },
    {
      title: t.home.built.bottom2Title,
      description: t.home.built.bottom2Body,
    },
    {
      title: t.home.built.bottom3Title,
      description: t.home.built.bottom3Body,
    },
  ] as const;

  return (
    <section className="layout-shell-x py-12 md:py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <p className="text-xs font-semibold text-[#656769] sm:text-sm md:text-base dark:text-[#9CA3AF]">
            {t.home.marketing.eyebrow}
          </p>
          <h3 className="mx-auto mt-2 max-w-xl px-1 text-base font-semibold leading-snug text-[#1A1615] sm:text-lg md:text-2xl dark:text-white">
            {t.home.marketing.governmentTendersTitle}
          </h3>
        </div>

        <div className="mt-5 grid min-w-0 grid-cols-2 gap-2 sm:mt-7 sm:gap-3 md:gap-5">

          {/* LEFT CARD */}
          <div className="flex min-w-0 flex-col justify-between rounded-2xl border border-transparent bg-[#58A19A]/16 p-3 sm:p-4 md:rounded-3xl md:p-6 dark:border-white/10 dark:bg-[#519A91]/15">
            
            <h4 className="max-w-none text-[11px] font-semibold leading-snug text-[#1A1615] sm:max-w-xs sm:text-sm md:text-lg dark:text-white">
              {t.home.built.leftCardTitle}
            </h4>

            {/* UI BOX */}
            <div className="mt-4 space-y-2 sm:mt-6 sm:space-y-4 md:mt-24">
              
              {/* Colors */}
              <div className="flex w-full items-center justify-center gap-0.5 rounded-xl border border-[#E4E2E2] bg-white p-2 sm:gap-2 sm:rounded-2xl sm:p-3.5 dark:border-white/15 dark:bg-[#141414]">
                {colors.map((item, i) => (
                  <div
                    key={i}
                    className="relative flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white -ms-2 first:ms-0 md:h-9 md:w-9 sm:-ms-4 md:h-10 md:w-10"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon && (
                      <span className="scale-[0.65] sm:scale-90 md:scale-100">{item.icon}</span>
                    )}
                  </div>
                ))}
              </div>

             <div className="grid min-w-0 grid-cols-[2fr_1fr] md:grid-cols-[2.5fr_0.8fr] gap-1 md:gap-3 lg:gap-5">
              {/* Toggle */}
              <div className="flex w-full min-w-0 items-center justify-between rounded-xl border border-[#E4E2E2] bg-white p-2 sm:rounded-2xl sm:p-3.5 dark:border-white/15 dark:bg-[#141414]">
                <div className="flex min-w-0 items-center gap-1 sm:gap-2">
                  <div className="relative h-3 w-6 md:h-4 md:w-8 shrink-0 rounded-full bg-[#00A82D]/15 border border-[#00A82D] sm:h-5 sm:w-10">
                    <div className="absolute right-0.5 top-[1.3px] md:top-0.5 h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-[#00A82D] sm:h-3.5 sm:w-3.5" />
                  </div>
                  <span className="truncate text-[9px] leading-tight text-[#1C1C1C] sm:text-xs md:text-sm dark:text-zinc-200">
                    {t.home.built.hideBranding}
                  </span>
                </div>
                </div>
                <div className="flex w-full min-w-0 items-center justify-between rounded-xl border border-[#E4E2E2] bg-white p-1 sm:rounded-2xl sm:p-1.5 dark:border-white/15 dark:bg-[#141414]">
                  
                  {/* SUN */}
                  <button
                    type="button"
                    onClick={() => setMode("dark")}
                    className={`flex h-6 w-7 md:h-8 md:w-9 items-center justify-center rounded-lg transition sm:h-10 sm:w-12 sm:rounded-xl
                      ${mode === "dark" ? "border-2 border-[#E4E2E2] bg-[#F1EBE5] dark:border-white/20 dark:bg-white/10" : "bg-transparent"}
                    `}
                  >
              
                    {/* Moon SVG */}
                    <svg
                      className="h-4 w-4 text-[#1A1615] sm:h-6 sm:w-6 dark:text-zinc-100"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M21 12.79A9 9 0 0111.21 3 
                              7 7 0 1021 12.79z" />
                    </svg>
                  </button>

                  {/* MOON */}
                  <button
                    type="button"
                    onClick={() => setMode("light")}
                    className={`flex h-6 w-7 md:h-8 md:w-9 items-center justify-center rounded-lg transition sm:h-10 sm:w-12 sm:rounded-xl
                      ${mode === "light" ? "border-2 border-[#E4E2E2] bg-[#F1EBE5] dark:border-white/20 dark:bg-white/10" : "bg-transparent"}
                    `}
                  >
                    {/* Sun SVG */}
                    <svg
                      className="h-4 w-4 text-[#1A1615] sm:h-6 sm:w-6 dark:text-zinc-100"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                    </svg>
                  </button>

                </div>
            </div>
              {/* Description */}
              <p className="mt-3 max-w-sm text-[10px] leading-snug text-[#656769] sm:mt-6 sm:text-sm md:leading-relaxed dark:text-[#9CA3AF]">
                {t.home.built.leftCardBody}
              </p>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="flex min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-transparent bg-[#58A19A]/16 p-3 sm:p-4 md:rounded-3xl md:p-6 dark:border-white/10 dark:bg-[#519A91]/15">
            <h4 className="max-w-none text-[11px] font-semibold leading-snug text-[#1A1615] sm:max-w-xs sm:text-sm md:text-lg dark:text-white">
              {t.home.built.rightCardTitle}
            </h4>

            {/* ICON ROWS CONTAINER — dir=ltr isolates marquee from document RTL so translateX animations stay seamless */}
            <div
              className="relative mt-4 space-y-2 sm:mt-8 sm:space-y-4 md:mt-24"
              dir="ltr"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                maskImage:
                  "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              }}
            >
                {/* EDGE FADES (physical L/R — correct for LTR marquee strip) */}
                <div className="pointer-events-none absolute start-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-[#EAF4F3] to-transparent dark:from-[#161616]" />

                <div className="pointer-events-none absolute end-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-[#EAF4F3] to-transparent dark:from-[#161616]" />

              {/* ROW 1: Slides Left */}
              <div className="relative flex overflow-hidden">
                <div className="flex w-max animate-infinite-scroll gap-2 whitespace-nowrap sm:gap-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-2 sm:gap-4">
                      {[icon1, icon2, icon3, icon4, icon5, icon6].map((icon, idx) => (
                        <Image key={idx} src={icon} alt="" className="h-8 w-8 shrink-0 sm:h-12 sm:w-12 md:h-14 md:w-14" />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* ROW 2: Slides Right (Reverse) */}
              <div className="relative flex overflow-hidden">
                <div className="flex w-max animate-infinite-scroll-reverse gap-2 whitespace-nowrap sm:gap-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-2 sm:gap-4">
                      {[icon6, icon5, icon4, icon3, icon2, icon1].map((icon, idx) => (
                        <Image key={idx} src={icon} alt="" className="h-8 w-8 shrink-0 sm:h-12 sm:w-12 md:h-14 md:w-14" />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              
            </div>

            {/* Description */}
            <p className="mt-3 max-w-sm text-[10px] leading-snug text-[#656769] sm:mt-6 sm:text-sm md:text-base md:leading-relaxed dark:text-[#9CA3AF]">
              {t.home.built.rightCardBody}
            </p>
          </div>

        </div>

        <div className="mt-4 grid min-w-0 grid-cols-3 gap-2 sm:mt-5 sm:gap-3 md:gap-5">
          {bottomCards.map((card, cardIndex) => (
            <article key={card.title} className="min-w-0 rounded-2xl border border-transparent bg-[#58A19A]/15 p-2 sm:rounded-3xl sm:p-4 md:p-5 lg:p-7 dark:border-white/10 dark:bg-[#519A91]/15">
              <div className="flex items-center justify-center rounded-full border border-transparent bg-white h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 dark:border-white/10 dark:bg-[#141414]">
                <BottomCardIcon cardIndex={cardIndex} />
              </div>
              <h5 className="mt-2 text-[10px] font-semibold leading-tight text-[#1A1615] sm:mt-3 sm:text-xs md:text-base dark:text-white">
                {card.title}
              </h5>
              <p className="mt-2 text-[9px] leading-snug text-[#656769] sm:mt-6 sm:text-sm md:text-base md:leading-5 dark:text-[#9CA3AF]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
