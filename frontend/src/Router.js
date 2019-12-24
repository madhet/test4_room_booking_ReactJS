import React from "react";
import { Route } from "react-router-dom";
import MainMenu from "../layouts/MainMenu";
import ImageLayout from "../layouts/ImageLayout";
import Main from "../pages/Main";
import Users from "../pages/users";
import PostImage from "../pages/PostImage";
import PostForm from "../pages/PostForm";
import Storage from "../storage";
import UsersRedux from "../pages/UsersRedux";

const router = [
  {
    path: "/",
    exact: true,
    layout: MainMenu,
    component: Main
  },
  {
    path: "/users",
    exact: true,
    layout: MainMenu,
    component: Users
  },
  {
    path: "/post-image",
    exact: true,
    layout: ImageLayout,
    component: PostImage
  },
  {
    path: "/add-post",
    exact: true,
    layout: ImageLayout,
    component: PostForm
  },
  {
    path: "/storage",
    exact: true,
    layout: MainMenu,
    component: Storage
  },
  {
    path: "/users-redux",
    exact: true,
    layout: MainMenu,
    component: UsersRedux
  }
];

export default () =>
  router.map((item, idx) => (
    <Route
      key={item.path + idx}
      exact={item.exact}
      path={item.path}
      render={props => (
        <item.layout {...props}>
          <item.component {...props} />
        </item.layout>
      )}
    />
  ));