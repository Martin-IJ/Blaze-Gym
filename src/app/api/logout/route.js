export async function POST(req) {
    try {
      const authToken = req.headers.get("authorization");
  
      if (!authToken || !authToken.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ message: "Unauthorized: No token provided" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      const response = await fetch("https://gym-api-d0yw.onrender.com/auth/auth/logout/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: authToken,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return new Response(JSON.stringify({ message: data.message || "Logout failed" }), {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      return new Response(JSON.stringify({ message: "Logged out successfully" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: "Server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  