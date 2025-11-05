import { useState } from "react";
import API from "../../../services/api";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function SkillForm() {
  const [skills, setSkills] = useState([
    { title: "", description: "", category: "tech" },
  ]);
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newSkills = [...skills];
    newSkills[index][name] = value;
    setSkills(newSkills);
  };

  // Add new skill row
  const handleAddSkill = () => {
    setSkills([...skills, { title: "", description: "", category: "tech" }]);
  };

  // Delete skill row
  const handleDeleteSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  // Preview before submit
  const handlePreview = () => {
    setPreview(true);
  };
  console.log("Token being used:", localStorage.getItem("token"));

  // Final submit — save all skills
  const handleSubmit = async () => {
    try {
      for (const skill of skills) {
        await API.post("/skills/", skill);
      }
      alert("✅ Skills saved successfully!");
      navigate("/private-profile"); // adjust path if your PublicProfile route differs
    } catch (error) {
      console.error("Error saving skills:", error);
      alert("❌ Failed to save skills. Try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom align="center">
        Add Your Skills
      </Typography>
      {!preview ? (
        <>
          {skills.map((skill, index) => (
            <Card
              key={index}
              sx={{
                mb: 2,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#fafafa",
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Skill Title"
                    name="title"
                    value={skill.title}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Description"
                    name="description"
                    value={skill.description}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <TextField
                    select
                    label="Category"
                    name="category"
                    value={skill.category}
                    onChange={(e) => handleChange(index, e)}
                    SelectProps={{ native: true }}
                  >
                    <option value="tech">Technology</option>
                    <option value="art">Art</option>
                    <option value="cooking">Cooking</option>
                    <option value="music">Music</option>
                    <option value="other">Other</option>
                  </TextField>

                  <IconButton
                    color="error"
                    onClick={() => handleDeleteSkill(index)}
                    disabled={skills.length === 1}
                  >
                    <Delete />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          ))}

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={handleAddSkill}
            >
              Add Another Skill
            </Button>
            <Button variant="contained" color="primary" onClick={handlePreview}>
              Preview
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Typography variant="h6" mb={2}>
            Preview Skills
          </Typography>
          {skills.map((skill, i) => (
            <Card key={i} sx={{ mb: 2, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="subtitle1">
                  {i + 1}. {skill.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {skill.description}
                </Typography>
                <Typography variant="caption" color="primary">
                  Category: {skill.category}
                </Typography>
              </CardContent>
            </Card>
          ))}

          <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
            <Button variant="outlined" onClick={() => setPreview(false)}>
              Back to Edit
            </Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Save All Skills
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
}
