import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

import { Await, useNavigate } from "react-router-dom";
import { loginUser } from "../actions/authActions";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser(form));

    if (loginUser.fulfilled.match(resultAction)) {
      const { access, refresh } = resultAction.payload;
      localStorage.setItem("token", access);
      localStorage.setItem("refresh", refresh);
      navigate("/dashboard"); // Redirect after login
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        p: 4,
        bgcolor: "background.paper",
        borderRadius: 4,
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: "primary.main",
          textAlign: "center",
        }}
      >
        Login
      </Typography>

      <TextField
        fullWidth
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        margin="normal"
        required
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&.Mui-focused fieldset": {
              borderWidth: 2,
            },
          },
        }}
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        margin="normal"
        required
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&.Mui-focused fieldset": {
              borderWidth: 2,
            },
          },
        }}
      />

      {error && (
        <Typography color="error" variant="body2" mt={1}>
          {typeof error === "object"
            ? error.non_field_errors?.join(", ")
            : error}
        </Typography>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{
          mt: 3,
          py: 1.5,
          borderRadius: 2,
          fontSize: "1rem",
          fontWeight: 600,
          background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(79,70,229,0.3)",
          },
          transition: "all 0.2s ease",
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </Button>
    </Box>
  );
}
