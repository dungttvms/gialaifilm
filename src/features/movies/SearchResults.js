import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { NUMBER_OF_LIMIT } from "../../app/config";
import LoadingScreen from "../../components/LoadingScreen";
import { fNumber } from "../../utils/numberFormat";
import NotFoundPage from "../../pages/NotFoundPage";
import Logo from "../../components/Logo";
import { Helmet } from "react-helmet";
import SkipNextSharpIcon from "@mui/icons-material/SkipNextSharp";
import SkipPreviousSharpIcon from "@mui/icons-material/SkipPreviousSharp";
import MovieCardDetail from "./MovieCardDetail";

function SearchResults() {
  const { isLoading, error } = useSelector((state) => state.movie);
  const movies = useSelector((state) => state.movie.Tim_Kiem_Phim);
  const totalMovies = useSelector(
    (state) => state.movie.pagination || movies.length
  );
  const [page, setPage] = useState(0);

  const searchKeyword =
    new URLSearchParams(window.location.search).get("keyword") || "";
  const maxPage = Math.ceil(totalMovies / NUMBER_OF_LIMIT);
  const handleNextPage = () => {
    if (page < maxPage - 1) {
      setPage(page + 1);
    }
  };
  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    if (page >= maxPage && page > 0) {
      setPage(maxPage - 1);
    }
  }, [maxPage, page]);

  const startIndex = page * NUMBER_OF_LIMIT;
  const currentMovies = movies.slice(startIndex, startIndex + NUMBER_OF_LIMIT);

  const scrollRef = useRef(null);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [page]);

  if (isLoading) {
    return (
      <Stack minHeight="100vh" justifyContent="center" alignItems="center">
        <Logo sx={{ width: 300, height: 200, mb: 15 }} />
        <LoadingScreen />
      </Stack>
    );
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  if (movies.length === 0) {
    return (
      <Stack minHeight="100vh" justifyContent="center" alignItems="center">
        <Logo sx={{ width: 300, height: 200, mb: 15 }} />
        <NotFoundPage />
      </Stack>
    );
  }

  return (
    <Container sx={{ mt: 2 }} ref={scrollRef}>
      <Helmet>
        <title>Tìm kiếm | Phim Gia Lai</title>
      </Helmet>
      <>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          p={1}
          sx={{ backgroundColor: "#333333", borderRadius: 1 }}
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
            CÓ {fNumber(totalMovies)} PHIM CÓ TỪ KHÓA "
            {searchKeyword.toUpperCase()}" ĐƯỢC TÌM THẤY
          </Typography>
        </Box>
        {totalMovies > NUMBER_OF_LIMIT && (
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrevPage}
              disabled={page === 0}
              sx={{ minWidth: 40, minHeight: 40 }}
            >
              <SkipPreviousSharpIcon />
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextPage}
              disabled={page >= maxPage - 1}
              sx={{ minWidth: 40, minHeight: 40 }}
            >
              <SkipNextSharpIcon />
            </Button>
          </Stack>
        )}
        <Grid container spacing={2}>
          {currentMovies.map((movie) => (
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
        </Grid>

        {totalMovies > NUMBER_OF_LIMIT && (
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrevPage}
              disabled={page === 0}
              sx={{ minWidth: 40, minHeight: 40 }}
            >
              <SkipPreviousSharpIcon />
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextPage}
              disabled={page >= maxPage - 1}
              sx={{ minWidth: 40, minHeight: 40 }}
            >
              <SkipNextSharpIcon />
            </Button>
          </Stack>
        )}
      </>
    </Container>
  );
}

export default SearchResults;
