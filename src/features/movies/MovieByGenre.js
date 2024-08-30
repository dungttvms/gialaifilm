import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { NUMBER_OF_LIMIT } from "../../app/config";
import {
  Box,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

import { Helmet } from "react-helmet";
import Logo from "../../components/Logo";
import { getFilteredGenreMovies } from "./movieSlice";
import { fNumber } from "../../utils/numberFormat";
import LoadingScreen from "../../components/LoadingScreen";
import MovieCardDetail from "./MovieCardDetail";

function MovieByGenre() {
  const { slug } = useParams();
  const location = useLocation();
  const genreName = location.state.genreName;
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const filteredGenreMovies = useSelector(
    (state) => state.movie.filteredGenreMovies
  );
  const totalMovies = useSelector(
    (state) => state.movie.totalFilteredMovies.totalItems
  );

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    setPage(0);
  }, [genreName]);

  useEffect(() => {
    dispatch(
      getFilteredGenreMovies({
        slug,
        page: page + 1,
        limit: NUMBER_OF_LIMIT,
        genreName,
      })
    );
    scrollToTop();
  }, [slug, page, genreName, dispatch]);

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  return (
    <Container sx={{ mt: 2 }} ref={scrollRef}>
      <Helmet>
        <title>Phim {genreName} | Phim Gia Lai</title>
      </Helmet>
      {filteredGenreMovies.length > 0 ? (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={2}
            sx={{ backgroundColor: "#000000", borderRadius: 1 }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "orange",
                textAlign: "center",
              }}
            >
              CÓ {fNumber(totalMovies)} PHIM {genreName.toUpperCase()} ĐƯỢC TÌM
              THẤY
            </Typography>{" "}
            <Pagination
              count={Math.ceil(totalMovies / NUMBER_OF_LIMIT)}
              page={page + 1}
              onChange={handlePageChange}
              shape="rounded"
              sx={{ color: "white" }}
            />
          </Box>
          <Grid container spacing={2}>
            {filteredGenreMovies.map((movie) => (
              <Grid
                key={movie._id}
                item
                xs={12}
                sm={6}
                md={3}
                lg={2.4}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <MovieCardDetail movie={movie} />
              </Grid>
            ))}
          </Grid>{" "}
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={Math.ceil(totalMovies / NUMBER_OF_LIMIT)}
              page={page + 1}
              onChange={handlePageChange}
              shape="rounded"
            />
          </Box>
        </>
      ) : (
        <Stack minHeight="100vh" justifyContent="center" alignItems="center">
          <Logo sx={{ width: 300, height: 200, mb: 15 }} />
          <LoadingScreen />
        </Stack>
      )}
    </Container>
  );
}

export default React.memo(MovieByGenre);
