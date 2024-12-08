import Link from "next/link";

import HeaderBanner from "../components/HeaderBanner";

const optionsList = [
  {
    path: "props",
    title: "With Props",
  },
  {
    path: "context",
    title: "With Context",
  },
];

const Home = () => {
  return (
    <>
      <HeaderBanner title={"Home"} hasBackButton={false} />

      <ul className="container mx-auto grid grid-cols-2 gap-2">
        {optionsList &&
          optionsList.map((item, index) => {
            return (
              <li key={`${index}-page`}>
                <Link
                  className="border-2 border-indigo-700 block rounded p-2"
                  href={`${item.path}`}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Home;
