export async function POST(req) {
  try {
    const authToken = req.headers.get("authorization");

    if (!authToken || !authToken.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ message: "Unauthorized: No token provided" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/auth/logout/`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      return new Response(
        JSON.stringify({ message: data.message || "Logout failed" }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Logged out successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}