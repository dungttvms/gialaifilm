import React, { useRef, useState } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Pagination,
  Button,
} from "@mui/material";
import useAuth from "../../hooks/useAuth.js";
import { makeStyles } from "@mui/styles";
import MovieCard from "./MovieCard.js";
import Logo from "../../components/Logo.js";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#333",
    color: "white",
  },
  noMovie: {
    backgroundColor: "#000000",
    color: "white",
  },
  button: {
    width: "100%",
    color: "orange",
  },
  typography: {
    fontWeight: "bold",
    color: "orange",
    textAlign: "center",
    marginBottom: "8px",
  },
});

function FavoriteMovieList() {
  const [page, setPage] = useState(1);
  const { user, removeMovieFromFavoriteList } = useAuth();
  const scrollRef = useRef(null);
  const classes = useStyles();
  const movieList = user?.movieFavoriteList || [];
  const totalMovies = movieList.length;
  const moviesPerPage = 10;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  const currentMovies = movieList.slice(
    (page - 1) * moviesPerPage,
    page * moviesPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (totalMovies === 0) {
    return (
      <Container ref={scrollRef} className={classes.noMovie}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt={5}
          sx={{ backgroundColor: "transparent" }}
        >
          <Logo sx={{ width: 300, height: 200, mb: "100px" }} />
          <Typography
            variant="h6"
            component="div"
            className={classes.typography}
            sx={{ fontFamily: "Montserrat, sans-serif" }}
          >
            BẠN CHƯA YÊU THÍCH PHIM NÀO
          </Typography>
          <Typography
            variant="h6"
            component="div"
            className={classes.typography}
           
          >
            HÃY CÙNG CHÚNG TÔI TRẢI NGHIỆM NHÉ
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container ref={scrollRef} className={classes.root}>
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
          BẠN ĐÃ YÊU THÍCH {totalMovies} PHIM
        </Typography>
      </Box>

      {totalMovies > moviesPerPage && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
            color="primary"
          />
        </Box>
      )}

      <Grid container spacing={2}>
        {currentMovies.map((movie) => (
          <Grid
            key={movie.movie._id}
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
            <MovieCard movie={movie.movie} />
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                removeMovieFromFavoriteList({ movieId: movie.movie._id })
              }
              className={classes.button}
              sx={{ my: 1, fontFamily: "Montserrat, sans-serif" }}
            >
              XOÁ KHỎI DANH SÁCH
            </Button>
          </Grid>
        ))}
      </Grid>

      {totalMovies > moviesPerPage && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}

export default FavoriteMovieList;
