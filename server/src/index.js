import "../config/envConfig.js"
import connectDB from "./db/index.js";
import app from "./app.js";


const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is being listened on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed: ", error);
  });
