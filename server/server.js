import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import vision from "@google-cloud/vision";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post("/visionapi", async (req, res) => {
  const image = req.body.requests[0].image.content;
  const imageBuffer = Buffer.from(image, "base64");

  console.log(process.env.API_KEY);
  fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${process.env.API_KEY}`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        requests: [
          {
            features: [
              {
                type: "LABEL_DETECTION",
                //   type: "LABEL_DETECTION",
              },
            ],
            image: {
              content: image,
            },
          },
        ],
      }),
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status} ${res.statusText} `);
      }
      //   console.log(res);
      return res.json();
      //   res.json();
    })
    .catch((error) => {
      console.error("an error!", error);
    })
    .then((data) => {
      console.log(data);
      res.json(data);
     
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
});
app.post("/handwritten", async (req, res) => {
  const image = req.body.requests[0].image.content;
  const imageBuffer = Buffer.from(image, "base64");

  console.log(process.env.API_KEY);
  fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${process.env.API_KEY}`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        requests: [
          {
            features: [
              {
                type: "DOCUMENT_TEXT_DETECTION",
                //   type: "LABEL_DETECTION",
              },
            ],
            image: {
              content: image,
            },
          },
        ],
      }),
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status} ${res.statusText} `);
      }
      //   console.log(res);
      return res.json();
      //   res.json();
    })
    .catch((error) => {
      console.error("an error!", error);
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
});
app.post("/multipleObject_button", async (req, res) => {
  const image = req.body.requests[0].image.content;
  const imageBuffer = Buffer.from(image, "base64");

  console.log(process.env.API_KEY);
  fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${process.env.API_KEY}`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        requests: [
          {
            features: [
              {
                type: "OBJECT_LOCALIZATION",
                
              },
            ],
            image: {
              content: image,
            },
          },
        ],
      }),
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status} ${res.statusText} `);
      }
      //   console.log(res);
      return res.json();
      //   res.json();
    })
    .catch((error) => {
      console.error("an error!", error);
    })
    .then((data) => {
      console.log(data);
      res.json(data);
      
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
