"use server";

export async function subscribeToNewsletter(email: string) {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: Connect to your email provider here (e.g., Resend, Mailchimp, Loops, etc.)
    // Example: await resend.contacts.create({ email, audienceId: "..." })

    return { success: true, message: "Thanks for subscribing!" };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
}
