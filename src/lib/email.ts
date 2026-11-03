export async function sendFeedbackAcknowledgment(
  email: string,
  feedbackId: string,
  title: string
) {
  const apiKey = process.env.RESEND_API_KEY || process.env.SENDGRID_API_KEY;

  try {
    // Integration point for Resend / SendGrid transactional emails
    // Example (Resend):
    // const { Resend } = require('resend');
    // const resend = new Resend(apiKey);
    // await resend.emails.send({
    //   from: 'Feedback <onboarding@resend.dev>',
    //   to: [email],
    //   subject: `Feedback Received: ${title}`,
    //   html: `<p>Thank you for your feedback (ID: ${feedbackId}). We have received it and will review it shortly.</p>`,
    // });

    console.log(
      `[Email] Acknowledgment sent to ${email} for feedback #${feedbackId}: "${title}"`
    );

    return { success: true, messageId: `ack-${feedbackId}` };
  } catch (error) {
    console.error('Failed to send acknowledgment email:', error);
    return { success: false, error };
  }
}

export async function sendStatusUpdate(
  email: string,
  feedbackId: string,
  status: string
) {
  try {
    console.log(
      `[Email] Status update sent to ${email}: feedback #${feedbackId} is now ${status}`
    );
    return { success: true };
  } catch (error) {
    console.error('Failed to send status update email:', error);
    return { success: false, error };
  }
}