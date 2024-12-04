import app from "./app";

const PORT = process.env.PORT || 5000;
//console.log("JWT_SECRET:", process.env.JWT_SECRET);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
