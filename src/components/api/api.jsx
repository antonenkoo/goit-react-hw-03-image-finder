const APIKEY = '28108593-121c85f8532d16352eac042b7';

async function FetchFn(searchQuery, page) {
  console.log(searchQuery, page);

  return await fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => res.json());
}

export default FetchFn;
