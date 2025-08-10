import "../config/envConfig.js"
import app from "./app.js";
import connectDB from "./db/index.js";


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
