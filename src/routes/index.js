import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import SingleMovie from "../features/movies/SingleMovie";
import PhimLe from "../features/movies/PhimLe";
import PhimBo from "../features/movies/PhimBo";
import PhimHoatHinh from "../features/movies/PhimHoatHinh";
import TVShows from "../features/movies/TVShows";
import SearchResults from "../features/movies/SearchResults";
import BlankLayout from "../layouts/BlankLayout";
import MovieByGenre from "../features/movies/MovieByGenre";
import MovieByCountry from "../features/movies/MovieByCountry";
import LoginPage from "../pages/LoginPage";
import FavoriteMovieList from "../features/movies/FavoriteMovieList";
import AuthRequire from "./AuthRequire";
import PhimChieuRap from "../features/movies/PhimChieuRap";
import VideoPlayback from "../features/movies/VideoPlayBack";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import PrivacyPage from "../pages/PrivacyPage";
import CopyrightPage from "../pages/CopyrightPage";
import AboutUsPage from "../pages/AboutUsPage";
import UserGuidePage from "../pages/UserGuidePage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/phim/:slug" element={<SingleMovie />} />
        <Route path="/phim-le" element={<PhimLe />} />
        <Route path="/phim-bo" element={<PhimBo />} />
        <Route path="/chieu-rap" element={<PhimChieuRap />} />
        <Route path="/hoat-hinh" element={<PhimHoatHinh />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/tim-kiem" element={<SearchResults />} />
        <Route path="/the-loai/:slug" element={<MovieByGenre />} />
        <Route path="/quoc-gia/:slug" element={<MovieByCountry />} />
        <Route path="/video" element={<VideoPlayback />} />
        <Route path="/dieu-khoan-bao-mat" element={<PrivacyPolicyPage />} />
        <Route path="/chinh-sach-quyen-rieng-tu" element={<PrivacyPage />} />
        <Route path="/khieu-nai-ban-quyen" element={<CopyrightPage />} />
        <Route path="/gioi-thieu" element={<AboutUsPage />} />
        <Route path="/huong-dan-su-dung" element={<UserGuidePage />} />

        <Route
          path="/favorite"
          element={
            <AuthRequire>
              <FavoriteMovieList />
            </AuthRequire>
          }
        />
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* <Route path="/dang-nhap" element={<LoginPage />} /> */}
      <Route path="/dang-nhap" element={<LoginPage />} />
    </Routes>
  );
}

export default Router;
