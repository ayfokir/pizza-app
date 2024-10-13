// Utility function to read the data from the user's local storage
const getAuth = async () => {
  try {
    // Retrieve the 'customer' item from local storage
    const item = localStorage.getItem('customer');
    
    // If item is null or empty, return an empty object
    if (!item) {
      console.log("see the customer:", item)
      console.log("No customer data found in localStorage.");
      return {};
    }

    // Parse the JSON string from local storage
    const user = JSON.parse(item);

    // Decode the token payload
    const decodedToken = decodeTokenPayload(user.token);

    // Attach the original token to the decoded token object
    decodedToken.token = user.token;
    decodedToken.expiration = user.expiration;

    return decodedToken;

  } catch (error) {
    // Log any errors that occur during parsing or decoding
    console.error("Error retrieving or decoding customer data:", error);
    return {}; // Return an empty object in case of error
  }
};

// Function to decode the payload from the token
// The purpose of this code is to take a JWT token, extract its payload, decode it from Base64Url encoding, and then convert the decoded payload into a JavaScript object for further use and manipulation
const decodeTokenPayload = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );
  return JSON.parse(jsonPayload);
};

export default getAuth;
