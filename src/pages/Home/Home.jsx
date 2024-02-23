import SearchBar from '../../components/SearchBar'
import LocationBtn from '../../components/LocationBtn'
import LocationIcon from "../../assets/carbon_location.svg";


const Home = () => {
  return (
    <>
    <section className="flex flex-col w-full h-fit px-4 md:px-8 md:px-35 justify-center items-center align-middle pt-40 space-y-4">
          <SearchBar></SearchBar>
          <LocationBtn iconImg={LocationIcon} btnName="Location"></LocationBtn>
        </section>
    <section className=""></section>
    </>
  )
}

export default Home