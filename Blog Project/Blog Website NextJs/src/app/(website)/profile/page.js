import MyProfile from "@/app/Components/MyProfile";
import Link from "next/link";

const articles = [
  {
    category: "React",
    date: "October 18, 2026",
    readTime: "12 min read",
    title: "Mastering React Hooks: A Practical Guide to useState and useEffect",
    description:
      "A practical guide to managing state and side effects with clear examples and patterns you can use in your next project.",
  },
  {
    category: "CSS",
    date: "October 12, 2026",
    readTime: "8 min read",
    title: "10 Tailwind CSS Tricks That Will Speed Up Your Workflow",
    description:
      "Small utility-first CSS techniques that make everyday interface work faster, more consistent, and easier to maintain.",
  },
  {
    category: "Career",
    date: "October 4, 2026",
    readTime: "6 min read",
    title: "Building a Better Routine as a Developer",
    description:
      "A few thoughtful habits for staying curious, focused, and connected to the developer community.",
  },
];

export const metadata = {
  title: "My Profile | Inkwell",
  description: "Meet Aarav Sharma, a frontend engineer and Inkwell author.",
};

export default function ProfilePage() {
  return (
    <MyProfile articles={articles}/>
  );
}
