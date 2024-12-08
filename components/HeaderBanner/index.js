import Link from "next/link";

const HeaderBanner = ({
  title,
  hasBackButton = true,
  backButtonPath = "/",
}) => {
  return (
    <div className="container relative mx-auto h-80 flex justify-center items-center bg-gradient-to-r from-blue-800 to-indigo-600 rounded my-4">
      {hasBackButton && (
        <Link
          className="text-xl absolute top-8 left-8 text-white"
          href={backButtonPath}
        >{`Back`}</Link>
      )}
      <h1 className="text-6xl font-bold text-white">{title}</h1>
    </div>
  );
};

export default HeaderBanner;
