export default async function (req, res) {
    try {
      if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        res.setHeader("Content-Type", "application/json");
        return res
          .status(405)
          .json({ error: "Method not allowed. Use POST." });
      }
  
      const { name, email, message } = req.body;
  
      if (!name || !email || !message) {
        res.setHeader("Content-Type", "application/json");
        return res.status(400).json({ error: "All fields are required." });
      }
  
      console.log("Received form data:", { name, email, message });
  
      const simulateProcessing = async () =>
        new Promise((resolve) => setTimeout(resolve, 1000));
      await simulateProcessing();
  
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json({
        success: true,
        message: "Message sent successfully! We'll get back to you soon.",
      });
    } catch (error) {
      console.error("Server error:", error);
      res.setHeader("Content-Type", "application/json");
      return res
        .status(500)
        .json({ error: error.message || "An unexpected error occurred." });
    }
  };
  