import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Link,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../actions/authActions";
import { motion } from "framer-motion";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(registerUser(form));

    if (registerUser.fulfilled.match(resultAction)) {
      navigate("/login");
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
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
          Create Account
        </Typography>

        <TextField
          fullWidth
          label="Username"
          name="username"
          value={form.username}
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
          label="Email"
          name="email"
          type="email"
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
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="primary" variant="body2" mt={1}>
            Registration successful! Redirecting to login...
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
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Create Account"
          )}
        </Button>

        <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
          Already have an account? <Link href="/login">login</Link>
        </Typography>
      </Box>
    </Box>
  );
}
