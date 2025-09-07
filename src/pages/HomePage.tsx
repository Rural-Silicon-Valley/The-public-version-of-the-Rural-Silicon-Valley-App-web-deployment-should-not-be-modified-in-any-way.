import React, { useState } from "react";
import { Box, Typography, Button, Fade } from "@mui/material";
import PageLayout from "../components/PageLayout";

const HomePage: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  return (
    <PageLayout>
      <Box sx={{ 
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "calc(100vh - 120px)",
        position: "relative",
        gap: 3
      }}>
        <Typography variant="h5" color="text.secondary" align="center">
          原展示页面删除，等待小宋开发~
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 8,
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
            },
            transition: "all 0.3s ease"
          }}
          onClick={() => setShowMessage(true)}
        >
          点击看看~
        </Button>

        <Fade in={showMessage} timeout={800}>
          <Typography
            variant="h6"
            color="primary"
            sx={{
              position: "absolute",
              bottom: "20%",
              opacity: showMessage ? 1 : 0,
              transform: showMessage ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s ease",
              fontStyle: "italic",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            生活乱七八糟，我要多点花招
          </Typography>
        </Fade>
      </Box>
    </PageLayout>
  );
};

export default HomePage;
