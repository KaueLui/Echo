// import React from 'react'

// const ExplodeDetails = () => {
//   return (
//     <div>ExplodeDetails</div>
//   )
// }

// export default ExplodeDetails

import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import SearchResults from "@/components/shared/SearchResults";
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queriesAndMutations";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const ExploreDetails = () => {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedSearch);


  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);


  if (!posts)
  return (
    <div className="flex-center w-full h-full">
      <Loader />
    </div>
  );

  const shouldShowSearchResults = searchValue !== '';
  const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item) => item.documents.length === 0);
  
  
  return (
    <div className="explore-container">
      <div className="flex-between w-full max-w-5x1 mt-16 mb-7 m-0">
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5x1">
      {shouldShowSearchResults ? (
          <SearchResults  isSearchFetching={isSearchFetching} searchedPosts={searchedPosts}/>
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      ) }
    </div>
  )
}

export default ExploreDetails