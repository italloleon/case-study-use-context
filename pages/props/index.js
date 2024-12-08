import HeaderBanner from "../../components/HeaderBanner";
import { FilterComponent } from "../../components/FilterComponent";
import { famousMovies } from "../../data/famousMovies";

const WithProps = () => {
  return (
    <>
      <HeaderBanner title={"With Props"} />
      <FilterComponent
        items={famousMovies}
        filterAttributes={["category", "year"]}
      />
    </>
  );
};

export default WithProps;
