import HomeLayout from "./(home)/layout";
import RecommendedPage from "@/app/recommended/page";

export default async function Home() {
  const recommendedCourses = await RecommendedPage();
  console.log("recommendedCourses", recommendedCourses);
  return (
    <HomeLayout recommendedCourses={recommendedCourses} children={undefined} />
  );
  {
    /* Other children components */
  }
  // </HomeLayout>
}
