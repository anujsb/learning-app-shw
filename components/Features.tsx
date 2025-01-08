import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
// import {
//   IconArrowWaveRightUp,
//   IconBoxAlignRightFilled,
//   IconBoxAlignTopLeft,
//   IconClipboardCopy,
//   IconFileBroken,
//   IconSignature,
//   IconTableColumn,
// } from "@tabler/icons-react";
import Image from "next/image";

export function Features() {
  return (
    <div id="features" className="w-full mx-auto px-10 mt-20">
      <div className="max-w-7xl mx-auto py-6 px-4 md:px-8 lg:px-10">
        <h2 className="text-3xl md:text-4xl mb-10 text-text  max-w-4xl">
          Beyond just Form Editor
        </h2>
        <BentoGrid className="max-w-7xl mx-auto pb-10 h-fit">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full  rounded-xl"></div>
);
const items = [
  {
    title: "AI-Driven Form Creation",
    description:
      "Instantly generate customized forms by simply entering a prompt—no setup required.",
    header: <p> </p>,
    icon: <p> </p>,
  },
  {
    title: "Effortless Customization",
    description:
      "Personalize fields, design, and branding with real-time previews for a tailored look.",
    header: (
      <div className="flex flex-1  w-full h-full items-center justify-center  bg-cover rounded-lg shadow-md border border-secondary"></div>
    ),
    icon: <p> </p>,
  },
  {
    title: "Instant Sharing & Embedding",
    description:
      "Publish forms and share via link, QR code, or embed directly on your website with ease.",
    header: <p> </p>,
    icon: <p>1</p>,
  },
  {
    title: "AI-Powered Response Summarization",

    description:
      "Quickly analyze and summarize responses with AI to identify trends and key insights.",
    header: <p> </p>,
    icon: <p>1</p>,
  },
  {
    title: "Centralized Response Dashboard",
    description:
      "Track responses in one place with real-time updates and organized insights.",
    header: <p> </p>,
    icon: <p></p>,
  },
  //   {
  //     title: "The Joy of Creation",
  //     description: "Experience the thrill of bringing ideas to life.",
  //     header: <Skeleton />,
  //     icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  //   },
  //   {
  //     title: "The Spirit of Adventure",
  //     description: "Embark on exciting journeys and thrilling discoveries.",
  //     header: <Skeleton />,
  //     icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  //   },
];
