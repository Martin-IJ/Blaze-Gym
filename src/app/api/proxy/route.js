export async function POST(req) {
  try {
    const body = await req.json();
    const apiUrl =
      "https://gym-api-d0yw.onrender.com/auth/auth/change_password/";
    const authToken = req.headers.get("Authorization");

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Proxy Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req) {
  try {
    const apiUrl = "https://gym-api-d0yw.onrender.com/auth/auth/me/";
    const authToken = req.headers.get("Authorization");

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Proxy Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PATCH(req) {
  try {
    const formData = await req.formData();
    const apiUrl = "https://gym-api-d0yw.onrender.com/auth/auth/update_user/";
    const authToken = req.headers.get("Authorization");

    const response = await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        Authorization: authToken,
      },
      body: formData,
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Proxy Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const apiUrl = "https://gym-api-d0yw.onrender.com/contact/";
    const authToken = req.headers.get("Authorization");

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Proxy Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
