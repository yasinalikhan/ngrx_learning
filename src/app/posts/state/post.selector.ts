import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostState } from "./post.state";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";

const getPostState = createFeatureSelector<PostState>('posts');

export const getPosts = createSelector (getPostState, (state)=>{
    return state.posts;
});

export const getPostById = createSelector(
    getPosts,
    getCurrentRoute,
    (posts, route: RouterStateUrl) => {
      return posts ? posts.find((post) => post.id === route.params['id']) : null;
    }
  );
