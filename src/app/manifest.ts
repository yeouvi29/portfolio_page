import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Emily Kang - Front-End Developer",
    short_name: "Emily K.",
    description:
      "Emily Kang is a Front-End Engineer skilled in creating responsive web designs and passionate about building dynamic websites. Explore her portfolio to see her projects and skills in action.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      { src: "/favicon", sizes: "any", type: "image/x-icon" },
      {
        src: "icon/maskable_icon.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
    ],
  };
}
