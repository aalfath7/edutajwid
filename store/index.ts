import { defineStore } from "pinia";

const SECRETKEY = "JHUGuygfgINRHgyfUBTgftJI87sn679";

interface DataUser {
  email: string;
  password: string;
}

function base64Encode(input: any) {
  return btoa(JSON.stringify(input))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64Decode(input: any) {
  input = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = input.length % 4;
  if (pad) {
    input += "=".repeat(4 - pad);
  }
  return JSON.parse(atob(input));
}

async function generateHMAC(message: any, secretKey: any) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secretKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(message)
  );
  return btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    BASEAPIURL: "https://api.qti.biz.id",
    authenticated: false,
    loading: false,
    token: "",
    changeRole: false,
    user: {} as {
      id_user: string;
      name: string;
      email: string;
      password: string;
      image: string;
      role: string;
      last_lesson: number;
      xp: number;
    },
    XP: 0,
    hello: true,
    examQuestions: [],
    grade: [0, 0, 0],
  }),
  actions: {
    setHello(value: any) {
      this.hello = value;
    },
    setExamQuestions(exam: []) {
      this.examQuestions = exam;
    },
    setGrade(value: number, i: number) {
      this.grade[i] = value;
    },
    async generateToken(payload: any, secretKey: any, expiresInSeconds: any) {
      const header = {
        alg: "HS256",
        typ: "JWT",
      };

      // Tambahkan waktu kedaluwarsa ke payload
      const currentTime = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik
      payload.exp = currentTime + expiresInSeconds;

      // Encode header dan payload
      const encodedHeader = base64Encode(header);
      const encodedPayload = base64Encode(payload);

      // Buat signature
      const signature = await generateHMAC(
        `${encodedHeader}.${encodedPayload}`,
        secretKey
      );

      // Set user berdasarkan payload (contoh)
      this.user = payload;

      // Gabungkan semuanya menjadi token
      const token = `${encodedHeader}.${encodedPayload}.${signature}`;
      return token;
    },

    async verifyToken(token: any, secretKey: any) {
      const [encodedHeader, encodedPayload, signature] = token.split(".");

      // Verify token
      const dataToVerify = `${encodedHeader}.${encodedPayload}`;
      const validSignature = await generateHMAC(dataToVerify, secretKey);

      if (signature === validSignature) {
        // Decode payload jika valid
        const payload = base64Decode(encodedPayload);

        // Periksa apakah token telah kedaluwarsa
        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.exp < currentTime) {
          console.warn("Token has expired");
          this.token = "";
          this.user.email = "";
          this.user.password = "";
          this.user.image = "";
          this.user.name = "";
          this.user.id_user = "";
          this.user.role = "";
          this.user.last_lesson = 0;
          this.user.xp = 0;
          localStorage.removeItem("authToken");
          return false;
        }

        this.user = payload;
        return true;
      } else {
        // Jika tidak valid, hapus token dan user
        this.token = "";
        this.user.email = "";
        this.user.password = "";
        this.user.image = "";
        this.user.name = "";
        this.user.id_user = "";
        this.user.role = "";
        this.user.last_lesson = 0;
        this.user.xp = 0;
        localStorage.removeItem("authToken");
        return false;
      }
    },

    async authenticatedUser({ email, password }: DataUser) {
      if (email && password) {
        try {
          const results: any = await $fetch(this.BASEAPIURL + "/api/login", {
            method: "POST",
            body: {
              email: email,
              password: password,
            },
          });

          if (results) {
            const payload = {
              id_user: results[0].id_user,
              name: results[0].name,
              email: results[0].email,
              password: results[0].password,
              image: results[0].image,
              role: results[0].role,
              last_lesson: results[0].last_lesson,
              xp: results[0].xp,
            };

            const token = await this.generateToken(payload, SECRETKEY, 10800);
            this.token = token;

            this.authenticated = true;

            if (process.client) {
              localStorage.setItem("authToken", this.token);
            }

            return true;
          }
        } catch (err) {
          // console.log(err);
        }
      }
    },

    async loadTokenFromLocalStorage() {
      const token = localStorage.getItem("authToken");
      if (token) {
        this.token = token;

        const isValid = await this.verifyToken(token, SECRETKEY);

        if (!isValid) {
          console.warn("Loaded token is not valid");
          this.logUserOut();
        } else {
          const [encodedHeader, encodedPayload, signature] = token.split(".");
          const result = base64Decode(encodedPayload);
          const user = {
            id_user: result.id_user,
            name: result.name,
            email: result.email,
            password: result.password,
            image: result.image,
            role: result.role,
            last_lesson: result.last_lesson,
            xp: result.xp,
          };

          this.changeRole = result.role === "teacher";
          this.XP = result.xp;
          this.user = user;
          this.authenticated = true;
        }
      }
    },
    logUserOut() {
      this.authenticated = false;
      this.token = "";
      this.user.email = "";
      this.user.password = "";
      this.user.image = "";
      this.user.name = "";
      this.user.id_user = "";
      this.user.role = "";
      this.user.last_lesson = 0;
      this.user.xp = 0;
      this.XP = 0;
      localStorage.removeItem("authToken");
    },
    setRequestChangeRole() {
      this.changeRole = true;
    },
  },
});
