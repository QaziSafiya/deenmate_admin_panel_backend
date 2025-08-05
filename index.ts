// backend/index.ts
import  express from "express";
import cors from "cors";
import db from "./firebase";

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const now = new Date();

    const snapshot = await db
      .collection("challenges")
      .where("isLive", "==", true)
      .get();

    const updated: string[] = [];

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const endTime = data.endTime.toDate();

      if (endTime <= now) {
        await db.collection("challenges").doc(doc.id).update({
          isLive: false,
        });
        updated.push(data.name);
      }
    }

    res.json({
      message: "✅ Cron job executed successfully",
      updatedChallenges: updated,
    });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

//  index file 