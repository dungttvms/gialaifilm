import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  Box,
  Container,
  Stack,
  Pagination,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPhimLe } from "./movieSlice.js";
import LoadingScreen from "../../components/LoadingScreen.js";
import { fNumber } from "../../utils/numberFormat.js";
import { Helmet } from "react-helmet";
import Logo from "../../components/Logo.js";
import { NUMBER_OF_LIMIT } from "../../app/config.js";
import MovieCardDetail from "./MovieCardDetail.js";

function PhimLe() {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const { pagination: totalMovies, isLoading: loading, error } = useSelector(
    (state) => state.movie
  );
  const movies = useSelector((state) => state.movie.Phim_Le);

  useEffect(() => {
    dispatch(getPhimLe({ page: page + 1, limit: NUMBER_OF_LIMIT }));
  }, [page, dispatch]);

  useEffect(() => {
    scrollToTop();
  }, [movies]);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container sx={{ mt: 2 }} ref={scrollRef}>
      <Helmet>
        <title>Phim Lẻ | Phim Gia Lai</title>
      </Helmet>
      {movies.length > 0 ? (
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
              CÓ {fNumber(totalMovies)} PHIM LẺ ĐƯỢC TÌM THẤY
            </Typography>{" "}
            <Pagination
              count={Math.ceil(totalMovies / NUMBER_OF_LIMIT)}
              page={page + 1}
              onChange={(event, value) => setPage(value - 1)}
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
                <MovieCardDetail movie={movie} />
              </Grid>
            ))}
          </Grid>{" "}
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={Math.ceil(totalMovies / NUMBER_OF_LIMIT)}
              page={page + 1}
              onChange={(event, value) => setPage(value - 1)}
              shape="rounded"
              sx={{ color: "white" }}
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

export default PhimLe;
