import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiService1, apiService2, apiService3 } from "../../app/apiService";
import { NUMBER_OF_LIMIT } from "../../app/config";
import { format } from "date-fns";

const initialState = {
  isLoading: false,
  error: null,
  movies: [],
  singleMovie: "",
  pagination: "",
  genres: [],
  countries: [],
  totalViewers: "",
  filteredCountryMovies: [],
  filteredGenreMovies: [],
  totalFilteredMovies: "",
  moviesUpdatedToday: "",
  Tim_Kiem_Phim: [],
  Phim_Chieu_Rap: [],
  Phim_Le: [],
  Phim_Bo: [],
  Phim_Hoat_Hinh: [],
  TV_Shows: [],
  allMoviesInformation: [],
};

const slice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAllMoviesSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.movies = action.payload.movies;
      state.pagination = action.payload.totalMovies;
      state.moviesUpdatedToday = action.payload.moviesUpdatedToday;
    },
    getSingleMovieSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.singleMovie = action.payload;
    },
    getPhimLeSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.Phim_Le = action.payload.Phim_Le;
      state.pagination = action.payload.totalMovies;
    },
    getPhimBoSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.Phim_Bo = action.payload.Phim_Bo;
      state.pagination = action.payload.totalMovies;
    },
    getPhimHoatHinhSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.Phim_Hoat_Hinh = action.payload.Phim_Hoat_Hinh;
      state.pagination = action.payload.totalMovies;
    },
    getTVShowsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.TV_Shows = action.payload.TV_Shows;
      state.pagination = action.payload.totalMovies;
    },
    getPhimChieuRapSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.Phim_Chieu_Rap = action.payload.Phim_Chieu_Rap;
      state.pagination = action.payload.totalMovies;
    },
    getSearchMovieSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.Tim_Kiem_Phim = action.payload.Tim_Kiem_Phim;
      state.pagination = action.payload.totalMovies;
    },
    getViewerCountSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.totalViewers = action.payload;
    },
    getCountriesSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.countries = action.payload;
    },
    getFilteredCountryMoviesSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.filteredCountryMovies = action.payload.items;
      state.totalFilteredMovies = action.payload.params.pagination;
    },
    getGenreSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.genres = action.payload;
    },
    getFilteredGenreMoviesSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.filteredGenreMovies = action.payload.items;
      state.totalFilteredMovies = action.payload.params.pagination;
    },
    getAllMoviesInformationByAdminSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.allMoviesInformation = action.payload;
    },
  },
});

export const getAllMovies = ({ pages }) => async (dispatch, getState) => {
  dispatch(slice.actions.startLoading());
  try {
    const requests = pages.map((page) => {
      const queryParams = new URLSearchParams({ page });
      return apiService1.get(
        `danh-sach/phim-moi-cap-nhat?${queryParams.toString()}`
      );
    });

    const responses = await Promise.all(requests);
    const combinedMovies = responses.reduce((acc, response) => {
      return acc.concat(response.items);
    }, []);

    const totalMovies = responses[0].pagination.totalItems;
    const today = format(new Date(), "yyyy-MM-dd");
    const moviesUpdatedToday = combinedMovies.filter((movie) => {
      const movieDate = format(new Date(movie.modified.time), "yyyy-MM-dd");
      return movieDate === today;
    }).length;

    dispatch(
      slice.actions.getAllMoviesSuccess({
        moviesUpdatedToday,
        movies: combinedMovies,
        totalMovies,
      })
    );
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getPhimLe = ({ page, limit }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const queryParams = new URLSearchParams({
      page: page,
      limit: limit,
    });
    const response = await apiService1.get(
      `v1/api/danh-sach/phim-le?${queryParams.toString()}`
    );
    const Phim_Le = response.data.items;
    const totalMovies = response.data.params.pagination.totalItems;
    dispatch(slice.actions.getPhimLeSuccess({ Phim_Le, totalMovies }));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getPhimBo = ({ page, limit }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const queryParams = new URLSearchParams({
      page: page,
      limit: limit,
    });
    const response = await apiService1.get(
      `v1/api/danh-sach/phim-bo?${queryParams.toString()}`
    );
    const Phim_Bo = response.data.items;
    const totalMovies = response.data.params.pagination.totalItems;
    dispatch(slice.actions.getPhimBoSuccess({ Phim_Bo, totalMovies }));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getPhimHoatHinh = ({ page, limit }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const queryParams = new URLSearchParams({
      page: page,
      limit: limit,
    });
    const response = await apiService1.get(
      `v1/api/danh-sach/hoat-hinh?${queryParams.toString()}`
    );
    const Phim_Hoat_Hinh = response.data.items;
    const totalMovies = response.data.params.pagination.totalItems;
    dispatch(
      slice.actions.getPhimHoatHinhSuccess({ Phim_Hoat_Hinh, totalMovies })
    );
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getTVShows = ({ page, limit }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const queryParams = new URLSearchParams({
      page: page,
      limit: limit,
    });
    const response = await apiService1.get(
      `v1/api/danh-sach/tv-shows?${queryParams.toString()}`
    );
    const TV_Shows = response.data.items;
    const totalMovies = response.data.params.pagination.totalItems;
    dispatch(slice.actions.getTVShowsSuccess({ TV_Shows, totalMovies }));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
export const getPhimChieuRap = ({ page, limit }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const queryParams = new URLSearchParams({
      page: page,
      limit: limit,
    });
    const response = await apiService3.get(
      `phim/phim-chieu-rap?${queryParams.toString()}`
    );
    const Phim_Chieu_Rap = response.data.filteredMovies;

    const totalMovies = response.data.count;
    dispatch(
      slice.actions.getPhimChieuRapSuccess({ Phim_Chieu_Rap, totalMovies })
    );
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getSingleMovie = ({ slug }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService1.get(`phim/${slug}`);
    dispatch(slice.actions.getSingleMovieSuccess(response));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getSearchMovie = ({ keyword }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService1.get(
      `v1/api/tim-kiem?keyword=${keyword}&limit=1`
    );
    await apiService2.post("/keywordMovie", { keyword });
    const totalMovies = response.data.params.pagination.totalItems;
    const responseWithLimit = await apiService1.get(
      `v1/api/tim-kiem?keyword=${keyword}&limit=${totalMovies}`
    );

    const Tim_Kiem_Phim = responseWithLimit.data.items;
    dispatch(
      slice.actions.getSearchMovieSuccess({ Tim_Kiem_Phim, totalMovies })
    );
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getViewerCount = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService2.get(`/viewerCounts`);
    dispatch(slice.actions.getViewerCountSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
export const getCountries = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService1.get("quoc-gia");
    dispatch(slice.actions.getCountriesSuccess(response));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
export const getFilteredCountryMovies = ({
  slug,
  countryName,
  page,
  limit,
}) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const queryParams = new URLSearchParams({
      page: page,
      limit: NUMBER_OF_LIMIT,
    });
    const response = await apiService1.get(
      `v1/api/quoc-gia/${slug}?${queryParams.toString()}`
    );

    dispatch(slice.actions.getFilteredCountryMoviesSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getGenres = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService1.get("the-loai");
    dispatch(slice.actions.getGenreSuccess(response));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
export const getFilteredGenreMovies = ({
  slug,
  page,
  limit,
  genreName,
}) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const queryParams = new URLSearchParams({
      page: page,
      limit: NUMBER_OF_LIMIT,
    });
    const response = await apiService1.get(
      `v1/api/the-loai/${slug}?${queryParams.toString()}`
    );

    dispatch(slice.actions.getFilteredGenreMoviesSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
export const getChatBot = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService2.post(`/chatBots`);
    console.log(response);
    dispatch(slice.actions.getChatBotSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;
