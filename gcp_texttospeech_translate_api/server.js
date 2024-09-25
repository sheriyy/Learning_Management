const { TranslationServiceClient } = require("@google-cloud/translate");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const CREDENTIALS = JSON.parse(
  JSON.stringify({
    type: "service_account",
    project_id: "acsproject-386318",
    private_key_id: "5826846d67ce6c4a6def0da09f48ebf2d9852d57",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCjYlSQ1+aLRe6H\nUezXdnqLDrWcxGJjIbatZL4YjHJjaWyY91On6jJ5eO177xIaGAuIbSNCUsnRLZvb\nFWIFRcLFeOJc1Xa2+0xSFkGrTZZ8fQs3B1aQJ+nugNsolGbj0UqksjTLRXPSZ/Qe\nZ+KceHeR3GQ4couFDswL0iUq5icoarq4KMkJ2+wBcBwx2rde8/kLxOCi53NA1cxD\nLybyg2GePB/DhsLQkgHMhnnhvAfIY1qyClP9UeH22P0gvxa2n+4InWLHrYLDKPXj\nu8eYiEAwGcf28wY/vUOBPgScPbUXwb1Tp/jnRqMyXOLvznHzrZLY21GDxG8epD1k\nSK12eSfJAgMBAAECggEACNCMhu76+28XrhnLqRk1hcySnEVVGIuQVzz864aiQj5F\nE2CelQvT0s1lJJ9SjvFWp/LZaOHeDQjEpJZ7/hRULIK31bHXkIowxSn5u4P5VziI\n0xx0fV0F6C3wBPmyrl5ThFyv7/qMg+DDYSOSLIZsTwSArLHzWIeilw2snyqhGLNJ\nLm5rStVzNByzX3Vkkg/ywj+5WujHj05eiKEI/Y3iwsOrBSIeUxCN9ymUKOvJBuWl\nFkX/DsM10y9l6Bw+nSvY/oAEwN6aKnEnM1S3EdFS6fqAY6l6f/MY66JZqm9v976o\nrfGHdaiJ9laJg74FXs7caQZx7D0jMrHCVpZUy9o7jQKBgQDlaz07lhKzf6Y8Ouvr\ngzKD54SrwWhOT3W0uAvXYD6F261yQsBdxZ1oCQwH5j0p1ks2FZNwXX4ECceLtBNV\nyHIBKHvxsf40sQON10AtnaodBjOKkEgGs8F/dtZMgNE7MkfTrSbu3p/flvd7yBv8\nfXotCwA9Utx6aVlU4L9c0uWI5QKBgQC2UHFIis+SSFfuZcNViVv/Tx1kIehif2Gp\nBR1K7ltaYewTVaYWeNFyV6YCOlh6mFsnRyYwlqGO8Q1hv6JX0zGfvaXLc79EcCOD\nfaMfb1qwwzzTX2an6GY1Qz2BIeDV1d04JXK6fDULxAz0cq+uZrUzdLOaz8pwIbze\nY3MPNZNpFQKBgGrC5vHturIxewiYWuV0XnOnr8PF82ZN7/azlz8ZGL9uJV8A1UhO\nCBw76Y9bg6cOhF2c2Mn3mAcFDgljOYQ4DWWgk108eZHHtmGxg7o2ns1271FSJ1KH\nIErS4JMldzjXAznsYCvVCg0g0faWfv+W3N5NOkVPZC7LC7lGBYeK1SpJAoGBAI8S\nzAQY41KyMUdmVwe+dxMCHFejgIIj4xlIaTePnONuK1z0/xVtlTi9bgsbjKoQ/J/z\nZxYEcB8ELvNB934iwDPTGdRzLmvf8Q7UvvoBYlOLtCVRHfexGty7uv2m/5Hwdt4E\nDWgp51snbN89TX95HMSX1gctAHpFD7oao4YRDnENAoGAXZQQRUtCe/jSBMk3eQzG\nKYqWlXq45ai6mUVhNwryGgGq+aLNySgsLCoAwlVVkgmDuWkv2IHFZxHDxVNEYsCd\nCXGY8qQAdHhY+URn5VN/AdpfWzb8S+ygdCWsd41DEeThaDEzeZX/nEFx9T1Obb9U\nlaPOylBtt0gzmUS/2Il0G7A=\n-----END PRIVATE KEY-----\n",
    client_email: "translate@acsproject-386318.iam.gserviceaccount.com",
    client_id: "113836661603603833343",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/translate%40acsproject-386318.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  })
);

const translate = new TranslationServiceClient({
  credentials: CREDENTIALS,
  project_id: CREDENTIALS.project_id,
});

app.post("/synthesize", async (req, res) => {
  const text = req.body.description;
  console.log("calling gcp text to speech", text);
  const apiKey = "AIzaSyBUdA8nYf7rr58MPHr4arjPT-KT9U57HSw";

  const endpoint = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`;

  const payload = {
    audioConfig: {
      audioEncoding: "LINEAR16",
      effectsProfileId: ["small-bluetooth-speaker-class-device"],
      pitch: 0,
      speakingRate: 1.5,
    },
    input: {
      text: text,
    },
    voice: {
      languageCode: "en-US",
      name: "en-US-Wavenet-D",
    },
  };

  const response = await axios.post(endpoint, payload);
  res.json(response.data);
});

app.post("/translate", async (req, res) => {
  //  clea
  const text = req.body.description;
  const inputLanguage = req.body.language;

  console.log("hitting translate api", inputLanguage);

  const request = {
    parent: `projects/${CREDENTIALS.project_id}/locations/global`,
    contents: [text],
    mimeType: "text/plain",
    // targetLanguageCode: "de",
    targetLanguageCode: inputLanguage,
  };

  const [response] = await translate.translateText(request);
  const translation = response.translations[0].translatedText;
  console.log("Translation", translation);
  res.json({ translation });
});

const port = 5001;
app.listen(port, () => {
  console.log("server started on 5001");
});
