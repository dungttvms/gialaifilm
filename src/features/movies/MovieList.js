import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies, getPhimChieuRap } from "./movieSlice.js";
import MovieCard from "./MovieCard.js";
import { Box, Container, Grid, Typography, Pagination } from "@mui/material";
import LoadingScreen from "../../components/LoadingScreen.js";
import { fNumber } from "../../utils/numberFormat.js";
import { NUMBER_OF_LIMIT } from "../../app/config.js";

function MovieList() {
  const [page, setPage] = useState(1);
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const {
    movies,
    pagination: totalMovies,
    moviesUpdatedToday,
    isLoading: loading,
    error,
  } = useSelector((state) => state.movie);

  useEffect(() => {
    const startPage = (page - 1) * 3 + 1;
    const pagesToFetch = [startPage, startPage + 1, startPage + 2];
    dispatch(getAllMovies({ pages: pagesToFetch }));
    dispatch(getPhimChieuRap({ page, limit: NUMBER_OF_LIMIT }));
  }, [page, dispatch]);
  useEffect(() => {
    scrollToTop();
  }, [movies]);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container ref={scrollRef}>
      {loading && <LoadingScreen />}
      {error && <p>Error: {error}</p>}
      {movies && (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={2}
            sx={{ backgroundColor: "#333333", borderRadius: 1 }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "orange",
                textAlign: "left",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              HÔM NAY CÓ {moviesUpdatedToday} / {fNumber(totalMovies)} PHIM MỚI
              CẬP NHẬT
            </Typography>
            <Pagination
              count={Math.ceil(totalMovies / 30)}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
              sx={{ color: "white" }}
            />
          </Box>
          <Grid container spacing={2}>
            {movies.map((movie) => (
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
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={Math.ceil(totalMovies / 30)}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
            />
          </Box>
        </>
      )}
    </Container>
  );
}

export default MovieList;
