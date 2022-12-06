import { myAxios } from "./axios";

/**
 * 向后端请求搜索结果的API
 */ 
export function getSearchResultAPI(paramsList: any) {
  return myAxios({
    url: `/search/${paramsList.word}`,
    method: "get",
  });
}
